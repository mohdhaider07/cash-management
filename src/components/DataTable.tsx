import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTablePagination from "./TableDataPagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalRows: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setSelectedRows?: React.Dispatch<React.SetStateAction<{}>>;
  selectedRows?: {};
  onRowClick?: (rowData: TData) => void;
  isLoading?: boolean;
}

const DataTable: React.FC<DataTableProps<any, any>> = <TData, TValue>({
  columns,
  data,
  totalRows,
  page,
  setPage,
  pageSize,
  setPageSize,
  setSelectedRows,
  selectedRows,
  onRowClick,
  isLoading = false,
}: DataTableProps<TData, TValue>) => {
  const { t } = useTranslation();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel<TData>(),
    getPaginationRowModel: getPaginationRowModel<TData>(),
    onRowSelectionChange: setSelectedRows || (() => {}),
    state: {
      rowSelection: selectedRows || {},
    },
    manualPagination: true,
  });

  return (
    <div className="w-full">
      <div className="w-full p-6 bg-background">
        <Table className="w-full">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-b-slate-400 "
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-sm font-semibold text-slate-400 h-11"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Render skeleton rows
              [...Array(4)].map((_, idx) => (
                <TableRow key={idx} className="border-b border-slate-200">
                  {columns.map((col, colIdx) => (
                    <TableCell key={colIdx}>
                      <Skeleton className="w-full h-10 bg-muted animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-slate-200 hover:bg-accent/50"
                  onClick={() => onRowClick && onRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-b border-slate-200">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-sm text-center"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <DataTablePagination
          isOptionForSelect={false}
          table={table}
          totalRows={totalRows}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default DataTable;
