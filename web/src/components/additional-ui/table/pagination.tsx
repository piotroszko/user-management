import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export interface PaginationProps {
  page: number;
  pageCount: number;
  previousPage: () => void;
  nextPage: () => void;
  toFirstPage: () => void;
  toLastPage: () => void;
}

export function DataTablePagination({
  page,
  pageCount,
  nextPage,
  previousPage,
  toFirstPage,
  toLastPage,
}: PaginationProps) {
  return (
    <div className="items-center justify-between px-2 mt-2">
      <div className="flex items-center space-x-6 lg:space-x-8 w-full justify-end">
        <div className="flex w-max items-center justify-center text-sm font-medium ">
          Strona {page} z {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => toFirstPage()}
            disabled={page === 1}>
            <span className="sr-only">Do pierwszej</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => previousPage()}
            disabled={page === 1}>
            <span className="sr-only">Do poprzedniej</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => nextPage()}
            disabled={page === pageCount}>
            <span className="sr-only">Do następnej</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => toLastPage()}
            disabled={page === pageCount}>
            <span className="sr-only">Do ostatniej</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
