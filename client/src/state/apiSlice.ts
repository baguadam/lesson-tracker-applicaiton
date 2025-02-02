import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginCredentials, Token } from "../utils/types";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    login: builder.mutation<Token, LoginCredentials>({
      query: ({ email, password }) => ({
        url: `auth/login`,
        method: "POST",
        body: {
          strategy: "local",
          email,
          password,
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = apiSlice;
