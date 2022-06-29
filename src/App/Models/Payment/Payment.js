import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  // keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getBalanceById: builder.query({
      query: (accountId) => ({
        url: Endpoints.BALANCE,
        method: "GET",
        params: { accountId },
      }),
    }),
    getPaymentHistoryById: builder.query({
      keepUnusedDataFor: 4,
      query: (userId) => ({
        url: Endpoints.PAYMENTHISTORY,
        method: "GET",
        params: { userId },
      }),
    }),
  }),
});

export const { useGetBalanceByIdQuery, useGetPaymentHistoryByIdQuery } = paymentApi;
