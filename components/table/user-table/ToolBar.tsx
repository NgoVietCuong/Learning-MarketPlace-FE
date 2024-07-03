import { useState } from 'react';
import { useRouter } from 'next/router';
import { Table } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from './FacetedFilter';
import { UserStatues, UserRoles } from '@/constants/filterField';
import useDebounce from '@/hooks/useDebounce';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TData[];
  filter: {
    search: string | null;
    isActive: string | null;
    role: string | null;
  };
}

export function UserToolbar<TData>({ table, data, filter }: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const isFiltered = filter.search || filter.isActive || filter.role;
  const [search, setSearch] = useState(filter.search ? filter.search : '');

  useDebounce(
    () => {
      const query: { search?: string } = {};
      if (search) query.search = search;
      router.push({ pathname: '/admin', query: query });
    },
    [search],
    600,
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          size="sm"
          type="text"
          placeholder="Filter users..."
          prefix={<Search size={16} className="text-gray-400" />}
          value={search}
          onChange={(value: string) => setSearch(value)}
          className="max-w-sm !text-xs"
        />
        {table.getColumn('isActive') && (
          <DataTableFacetedFilter
            queryField={'isActive'}
            filter={filter}
            column={table.getColumn('isActive')}
            title="Status"
            options={UserStatues}
          />
        )}
        {table.getColumn('roles') && (
          <DataTableFacetedFilter
            queryField={'role'}
            filter={filter}
            column={table.getColumn('roles')}
            title="Role"
            options={UserRoles}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearch('');
              router.push('/admin');
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
