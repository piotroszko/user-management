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
  OnChangeFn,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination, PaginationProps } from "./pagination";

interface DataTableProps<T extends RowData> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  pagination: PaginationProps;
  setSorting?: OnChangeFn<SortingState>;
  sorting?: SortingState;
}

export const Table = <T extends RowData>({
  data,
  columns,
  isLoading,
  pagination,
  setSorting,
  sorting,
}: DataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel<T>(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="min-h-[40rem] min-w-[25rem] flex flex-col justify-between">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  Brak wyników.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </ShTable>
      <DataTablePagination {...pagination} />
    </div>
  );
};
