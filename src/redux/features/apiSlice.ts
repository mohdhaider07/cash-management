// apiSlice.ts

import { RootState } from "../store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./slices/userSlice";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
      prepareHeaders: (headers, { getState }) => {
        const user = (getState() as RootState).user.user;
        const token = user?.token;

        if (token && !headers.get("authorization")) {
          headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
      },
    });

    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 403) {
      api.dispatch(logout());
    }

    return result;
  },
  tagTypes: ["Admin"], // Added tag type for admin-related data
  endpoints: () => ({}),
});
