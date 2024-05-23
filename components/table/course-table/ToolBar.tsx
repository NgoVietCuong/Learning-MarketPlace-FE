import { Table } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from './FacetedFilter';
import { Statuses, Types } from '@/constants/filterField';
import useCategories from '@/hooks/useCategories';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TData[];
}

export function CourseToolbar<TData>({ table, data }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { categoryList, categoryLoading } = useCategories();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          size="sm"
          type="text"
          placeholder="Filter courses..."
          prefix={<Search size={16} className="text-gray-400" />}
          // value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          // onChange={(value: string) => table.getColumn('email')?.setFilterValue(value)}
          className="max-w-sm !text-xs"
        />
        {table.getColumn('isPublished') && (
          <DataTableFacetedFilter column={table.getColumn('status')} title="Status" options={Statuses} />
        )}
        {table.getColumn('price') && (
          <DataTableFacetedFilter column={table.getColumn('type')} title="Type" options={Types} />
        )}
        {(!categoryLoading && table.getColumn('categories')) && (
          <DataTableFacetedFilter column={table.getColumn('categories')} title="Categories" options={categoryList!.data!.map(category => ({
            label: category.name,
            value: category.name,
            icon: category.icon
          }))} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
