import { useState } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Meta } from '@/types/schema';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: Meta;
}

export default function CourseTable<TData, Tavlue>({ columns, data, meta }: DataTableProps<TData, Tavlue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2">
          <Input
            size="sm"
            type="text"
            placeholder="Filter courses..."
            prefix={<Search size={16} className='text-gray-400' />}
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(value: string) => table.getColumn('email')?.setFilterValue(value)}
            className="max-w-sm"
          />
        </div>

        <Button size="base" className="text-white-primary bg-teal-secondary active:scale-[98%]"><Plus className='mr-1 w-4 h-4 text-white-primary'/>Add Course</Button>
      </div>
      <div className="rounded-md border border-gray-300">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <>
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    </>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Text size='sm' className='font-medium !text-gray-600'>Page {meta.currentPage} of {meta.totalPages}</Text>
        <Button
          variant="outline"
          size="sm"
          className='w-9'
          onClick={() => table.previousPage()}
          // disabled={meta.currentPage === 1}
        >
          <ChevronLeft className='w-10 h-10 text-gray-700'/>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          // disabled={meta.currentPage === meta.totalPages}
        >
          <ChevronRight className='w-6 h-6 text-gray-700'/>
        </Button>
      </div>
    </div>
  );
}
