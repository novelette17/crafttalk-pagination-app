import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { BASE_API_URL } from "@src/envs";
import { buildQueryString, createEncodedForm } from "./utils";
import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryError } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  TGetProductsArgs,
  TGetProductsReponseEntry,
  TResponseWithPagination,
  TSignInResponse,
} from "@src/types";
import { appTokensManager } from "./appTokensManager";
import { login } from "@src/store/reducers/auth";

export type BaseQueryWrapperFn = BaseQueryFn<
  string | FetchArgs,
  unknown,
  BaseQueryError<any> | undefined
>;

const onQueryStartedSignInCallback = async (
  _: any,
  {
    queryFulfilled,
    dispatch,
  }: MutationLifecycleApi<any, BaseQueryWrapperFn, TSignInResponse, "mainApi">,
) => {
  try {
    const { data } = await queryFulfilled;
    appTokensManager.setAccessToken(data.token);

    dispatch(login());
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

    getProducts: builder.query<
      TResponseWithPagination<"products", TGetProductsReponseEntry>,
      TGetProductsArgs
    >({
      query: ({ limit = 20, skip = 0, search }) => {
        const accessToken = appTokensManager.getAccessToken();
        let url = buildQueryString({
          baseUrl: "/products",
          params: {
            limit,
            skip,
            select: "title,price",
          },
        });

        if (search) {
          url = buildQueryString({
            baseUrl: "/products/search",
            params: {
              limit,
              skip,
              select: "title,price",
              q: search,
            },
          });
        }

        return {
          url,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { useSignInMutation, useLazyGetProductsQuery } = mainApi;

export const { signIn, getProducts } = mainApi.endpoints;
