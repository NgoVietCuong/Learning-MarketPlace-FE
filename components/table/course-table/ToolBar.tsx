import { Table } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from './FacetedFilter';
import { CourseStatuses, CourseTypes } from '@/constants/filterField';
import useCategories from '@/hooks/useCategories';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TData[];
  filter: {
    search: string | null;
    status: string | null;
    type: string | null;
    categoryId: string | null;
  };
}

export function CourseToolbar<TData>({ table, data, filter }: DataTableToolbarProps<TData>) {
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
          <DataTableFacetedFilter queryField={'status'} filter={filter} column={table.getColumn('isPublished')} title="Status" options={CourseStatuses} />
        )}
        {table.getColumn('price') && (
          <DataTableFacetedFilter queryField={'type'} filter={filter} column={table.getColumn('price')} title="Type" options={CourseTypes} />
        )}
        {(!categoryLoading && table.getColumn('categories')) && (
          <DataTableFacetedFilter queryField={'categoryId'} filter={filter} column={table.getColumn('categories')} title="Categories" options={categoryList!.data!.map(category => ({
            label: category.name,
            value: category.id.toString(),
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
