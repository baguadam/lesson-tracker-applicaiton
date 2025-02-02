import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginCredentials } from "../utils/types";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginCredentials>({
      query: (LoginData) => ({
        url: `auth/login`,
        method: "POST",
        body: {
          strategy: "local",
          LoginData,
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = apiSlice;
