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
import { UserToolbar } from './ToolBar';
import { Meta } from '@/types/schema';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: Meta;
  filter: {
    search: string | null;
    isActive: string | null;
    role: string | null;
  }
}

export default function UserTable<TData, Tavlue>({ columns, data, meta, filter }: DataTableProps<TData, Tavlue>) {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleChangePage = (page: number) => {
    const currentQuery = router.query;
    currentQuery.page = page.toString();
    router.push({ query: currentQuery })
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <UserToolbar table={table} data={data} filter={filter}/>
      </div>
      <div className="rounded-md border border-gray-300">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const className = header.column.columnDef.meta?.className;
                  return (
                    <TableHead key={header.id} className={className ? className: ''}>
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
              onClick={() => handleChangePage(1)}
              disabled={meta.currentPage === 1}
            >
              <ChevronsLeft className="w-5 h-5 text-gray-700" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-1"
              onClick={() => handleChangePage(meta.currentPage - 1)}
              disabled={meta.currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-1"
              onClick={() => handleChangePage(meta.currentPage + 1)}
              disabled={meta.currentPage === meta.totalPages}
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-1"
              onClick={() => handleChangePage(meta.totalPages)}
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
