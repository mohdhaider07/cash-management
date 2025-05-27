import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SummaryCards } from "@/components/SummaryCards";
import DataTable from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useGetPaymentReportQuery } from "@/redux/features/apis/adminApi";
import { format } from "date-fns";

interface TableDataType {
  location: string | null;
  empName: string | null;
  collectionAmount: number | null;
  collectionDate: string | null;
  depositAmount: number | null;
  depositDate: string | null;
  difference: number | null;
}

const columns: ColumnDef<TableDataType>[] = [
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => row.original.location ?? "",
  },
  {
    accessorKey: "empName",
    header: "Emp. Name",
    cell: ({ row }) => row.original.empName ?? "",
  },
  {
    accessorKey: "collectionAmount",
    header: () => <div className="text-left">Collections (MM)</div>,
    cell: ({ row }) => {
      const value = row.original.collectionAmount;
      return (
        <div className="text-left">
          {value == null || value === 0 ? "" : value.toLocaleString("en-IN")}
        </div>
      );
    },
  },
  {
    accessorKey: "collectionDate",
    header: "Date",
    cell: ({ row }) => row.original.collectionDate ?? "",
  },
  {
    accessorKey: "depositAmount",
    header: () => <div className="text-left">Cash Deposit</div>,
    cell: ({ row }) => {
      const value = row.original.depositAmount;
      return (
        <div className="text-left ">
          {value == null || value === 0 ? "" : value.toLocaleString("en-IN")}
        </div>
      );
    },
  },
  {
    accessorKey: "depositDate",
    header: "Deposit Date",
    cell: ({ row }) => row.original.depositDate ?? "",
  },
  {
    accessorKey: "difference",
    header: () => <div className="text-left">Difference</div>,
    cell: ({ row }) => {
      const value = row.original.difference;
      const className =
        value == null
          ? "text-left text-warning"
          : value > 0
          ? "text-left text-success"
          : "text-left text-warning";
      return (
        <div className={className}>
          {value == null ? "-" : value.toLocaleString("en-IN")}
        </div>
      );
    },
  },
];

function PaymentFragment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const { data: reportData, isLoading } = useGetPaymentReportQuery({
    page: currentPage,
    limit: pageSize,
    search,
  });

  const tableData: TableDataType[] =
    reportData?.report.map((item) => ({
      location: item.employeeDetails?.location ?? null,
      empName: item.employeeDetails?.name ?? null,
      collectionAmount: item.collectionAmount ?? null,
      collectionDate: item.collectionDate
        ? format(new Date(item.collectionDate), "dd MMM yyyy")
        : null,
      depositAmount: item.depositAmount ?? null,
      depositDate: item.depositDate
        ? format(new Date(item.depositDate), "dd MMM yyyy")
        : null,
      difference: item.difference ?? null,
    })) || [];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/admin/dashboard" },
          { label: "Payment Report", active: true },
        ]}
      />

      <SummaryCards />

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
    </>
  );
}

export default PaymentFragment;
