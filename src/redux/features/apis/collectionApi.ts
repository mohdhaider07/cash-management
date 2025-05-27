import { apiSlice } from "../apiSlice";

export const collectionApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCollection: build.mutation<
      any,
      { employeeId: string; mmCollection: number; collectionDate: string }
    >({
      query: (data) => ({
        url: "/api/collections",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateCollectionMutation } = collectionApi;
