import { useRouter } from 'next/router';
import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { CourseToolbar } from './ToolBar';
import { Meta } from '@/types/schema';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: Meta;
}

export default function CourseTable<TData, Tavlue>({ columns, data, meta }: DataTableProps<TData, Tavlue>) {
  const router = useRouter();
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
        <CourseToolbar table={table} data={data}/>
        <Button size="base" className="text-white-primary bg-teal-secondary active:scale-[98%]" onClick={() => router.push("/instructor/courses/create")}>
          <Plus className="mr-1 w-4 h-4 text-white-primary" />
          Add Course
        </Button>
      </div>
      <div className="rounded-md border border-gray-300">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const className = header.column.columnDef.meta?.className;
                  console.log('className', className)
                  return (
                    <TableHead key={header.id} className={className ? className : ''}>
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
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-end gap-8 py-4">
          <Text size="sm" className="font-medium !text-gray-600">
            Page {meta.currentPage} of {meta.totalPages}
          </Text>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-1"
              onClick={() => table.previousPage()}
              disabled={meta.currentPage === 1}
            >
              <ChevronsLeft className="w-5 h-5 text-gray-700" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-1"
              onClick={() => table.previousPage()}
              disabled={meta.currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-1"
              onClick={() => table.nextPage()}
              disabled={meta.currentPage === meta.totalPages}
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-1"
              onClick={() => table.nextPage()}
              disabled={meta.currentPage === meta.totalPages}
            >
              <ChevronsRight className="w-5 h-5 text-gray-700" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
