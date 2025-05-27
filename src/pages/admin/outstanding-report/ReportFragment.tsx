import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SummaryCards } from "@/components/SummaryCards";
import DataTable from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useGetOutstandingReportQuery } from "@/redux/features/apis/adminApi";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import InsertEmployeeDataModal from "@/components/InsertEmployeeDataModal";

interface TableDataType {
  location: string;
  empId: string;
  empName: string;
  collections: number;
  date: string;
  difference: number;
}

const columns: ColumnDef<TableDataType>[] = [
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "empId",
    header: "Emp. ID",
  },
  {
    accessorKey: "empName",
    header: "Emp. Name",
  },
  {
    accessorKey: "collections",
    header: () => <div className="text-left">Collections (MM)</div>,
    cell: ({ row }) => {
      const value = row.original.collections;
      return (
        <div className="text-left">
          {value === 0 ? "-" : value.toLocaleString("en-IN")}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Recent Deposit",
  },
  {
    accessorKey: "difference",
    header: () => <div className="text-left">Outstanding Amount</div>,
    cell: ({ row }) => {
      const value = row.original.difference;
      const isPositive = value > 0;
      const valueClass = !isPositive ? "text-success" : "text-destructive";

      return (
        <div className={`text-left ${valueClass}`}>
          {value.toLocaleString("en-IN")}
        </div>
      );
    },
  },
];

export default function ReportFragment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { data: reportData, isLoading } = useGetOutstandingReportQuery({
    page: currentPage,
    limit: pageSize,
    search,
  });

  const tableData: TableDataType[] =
    reportData?.data.map((item) => ({
      location: item.employeeLocation,
      empId: item.employeeId,
      empName: item.employeeName,
      collections: item.totalCollection,
      date: item.recentDeposit
        ? format(new Date(item.recentDeposit), "dd MMM yyyy")
        : "-",
      difference: item.outstandingAmount,
    })) || [];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/admin/dashboard" },
          { label: "Outstanding Report", active: true },
        ]}
      />

      <div className="flex items-center justify-between gap-4">
        <SummaryCards />
        <Button
          variant={"secondary"}
          onClick={() => setOpenModal(true)}
          className="-mt-12"
        >
          Insert Employee Data
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={tableData}
        totalRows={reportData?.total || 0}
        page={currentPage}
        setPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isLoading={isLoading}
      />
      {openModal && (
        <InsertEmployeeDataModal open={openModal} setOpen={setOpenModal} />
      )}
    </>
  );
}
