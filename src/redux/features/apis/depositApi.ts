import { apiSlice } from "../apiSlice";

export const depositApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createDeposit: build.mutation<
      any,
      { employeeId: string; amount: number; depositDate: string }
    >({
      query: (data) => ({
        url: "/api/deposits",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateDepositMutation } = depositApi;
