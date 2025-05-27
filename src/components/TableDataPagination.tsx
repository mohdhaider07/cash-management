import React, { Dispatch, SetStateAction } from "react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalRows: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  isOptionForSelect?: boolean;
}

const DataTablePagination: React.FC<DataTablePaginationProps<any>> = ({
  table,
  totalRows,
  page,
  setPage,
  pageSize,
  setPageSize,
  isOptionForSelect = true,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  // Generate visible page numbers with ellipsis logic
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (page > 2) {
        pages.push("...");
      }

      // Show current page and neighbors
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (page < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between w-full px-2">
      {/* Left side - Rows per page */}
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Show</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            setPage(1);
            table.setPageSize(Number(value));
            setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px] text-foreground">
            <SelectValue className="" placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent className="">
            {[1, 10, 20, 30, 40, 50].map((size) => (
              <SelectItem key={size} value={`${size}`} className="">
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm font-medium">Rows</p>
      </div>
      {/* Center - Pagination controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden w-8 h-8 p-0 lg:flex"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          <span className="sr-only">First page</span>
          <ChevronsLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="w-8 h-8 p-0 "
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          <span className="sr-only">Previous page</span>
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum, index) =>
            pageNum === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2">
                ...
              </span>
            ) : (
              <Button
                key={pageNum}
                variant={page === pageNum ? "secondary" : "outline"}
                className={`h-8 w-8 p-0  ${page === pageNum ? "" : ""}`}
                onClick={() => setPage(pageNum as number)}
              >
                {pageNum}
              </Button>
            )
          )}
        </div>

        <Button
          variant="outline"
          className="w-8 h-8 p-0 "
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          <span className="sr-only">Next page</span>
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden w-8 h-8 p-0 lg:flex"
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          <span className="sr-only">Last page</span>
          <ChevronsRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <div></div>
    </div>
  );
};

export default DataTablePagination;
