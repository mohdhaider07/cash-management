import { apiSlice } from "../apiSlice";

interface SummaryStats {
  totalCollection: number;
  totalDeposit: number;
  difference: number;
}

interface OutstandingReportItem {
  employeeId: string;
  employeeName: string;
  employeeLocation: string;
  employeeAddedDate: string;
  totalCollection: number;
  totalDeposits: number;
  recentDeposit: string;
  outstandingAmount: number;
}

interface OutstandingReportResponse {
  data: OutstandingReportItem[];
  total: number;
  page: number;
  limit: number;
}

interface EmployeeDetails {
  _id: string;
  name: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentReportItem {
  collectionAmount: number | null;
  collectionDate: string | null;
  employeeDetails: EmployeeDetails | null;
  depositAmount: number | null;
  depositDate: string | null;
  collectionId: string | null;
  difference: number | null;
}

interface PaymentReportResponse {
  report: PaymentReportItem[];
}

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSummaryStats: build.query<SummaryStats, void>({
      query: () => ({
        url: "/api/admin/summary-stats",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getOutstandingReport: build.query<
      OutstandingReportResponse,
      { page: number; limit: number; search?: string }
    >({
      query: (params) => ({
        url: "/api/admin/outstanding-report",
        method: "GET",
        params,
      }),
      providesTags: ["Admin"],
    }),
    getPaymentReport: build.query<
      PaymentReportResponse,
      { page: number; limit: number; search?: string }
    >({
      query: (params) => ({
        url: "/api/admin/employee-payment-report",
        method: "GET",
        params,
      }),
      providesTags: ["Admin"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSummaryStatsQuery,
  useGetOutstandingReportQuery,
  useGetPaymentReportQuery,
} = adminApi;
