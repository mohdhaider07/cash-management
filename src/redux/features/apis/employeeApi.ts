import { Employee } from "@/types/types";
import { apiSlice } from "../apiSlice";

interface GetAllEmployeesResponse {
  employees: Employee[];
}

export const employeeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllEmployees: build.query<GetAllEmployeesResponse, void>({
      query: () => ({
        url: "/api/employees",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllEmployeesQuery } = employeeApi;
