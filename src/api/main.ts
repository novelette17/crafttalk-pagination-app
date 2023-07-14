import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { BASE_API_URL } from "@src/envs";
import { createEncodedForm } from "./utils";
import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryError } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

export type BaseQueryWrapperFn = BaseQueryFn<
  string | FetchArgs,
  unknown,
  BaseQueryError | undefined
>;

const onQueryStartedSignInCallback = async (
  { username, password }: any,
  {
    queryFulfilled,
    dispatch,
  }: MutationLifecycleApi<any, BaseQueryWrapperFn, any, "mainApi">,
) => {
  try {
    const { data } = await queryFulfilled;

    console.log(">>>", data);
  } catch {
  } finally {
    console.log("signed");
  }
};

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  tagTypes: [],
  endpoints: (builder) => ({
    signIn: builder.mutation<any, any>({
      query: ({ username, password }) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: createEncodedForm({
          username,
          password,
        }),
      }),
      onQueryStarted: onQueryStartedSignInCallback,
    }),
  }),
});

export const { useSignInMutation } = mainApi;

export const { signIn } = mainApi.endpoints;
