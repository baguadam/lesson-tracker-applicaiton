import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginData } from "../utils/types";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginData>({
      query: (LoginData) => ({
        url: `auth/lohgin`,
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
