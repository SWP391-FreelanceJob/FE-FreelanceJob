import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  // keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getAccountInfo: builder.query({
      // keepUnusedDataFor: 5,
      query: (accountId) => ({
        url: `${Endpoints.ACCOUNT}/${accountId}`,
        method: "GET",
        params: {},
      }),
    }),
  }),
});

export const { useGetAccountInfoQuery } = accountApi;
