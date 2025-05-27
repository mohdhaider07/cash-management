import { apiSlice } from "../apiSlice";
import { User } from "../slices/userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<
      { message: string },
      {
        name: string;
        email: string;
        password: string;
      }
    >({
      query: (data) => ({
        url: "/api/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: build.mutation<
      { user: User },
      {
        email: string;
        password: string;
      }
    >({
      query: (data) => ({
        url: "api/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignUpMutation, useLoginMutation } = userApi;
