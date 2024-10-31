import { Skeleton } from "@/components/ui/skeleton";
import {
  Table as ShTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<T extends RowData> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
}

export const Table = <T extends RowData>({
  data,
  columns,
  isLoading,
}: DataTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel<T>(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel<T>(),
    state: {
      sorting,
    },
  });

  return (
    <ShTable key={isLoading ? "loadingTable" : "table"}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      {isLoading ? (
        <TableBody>
          {[1, 2, 3].map((i) => (
            <TableRow key={i + "-loading"}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <Skeleton
                    className={cn(
                      "rounded-full h-6 w-1/2",
                      "duration-" + i * 100
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Brak wyników.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </ShTable>
  );
};
