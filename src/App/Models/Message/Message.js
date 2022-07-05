import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  // keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getMessageById: builder.query({
      keepUnusedDataFor: 5,
      query: (userId) => ({
        url: `${Endpoints.MESSAGE}/${userId}`,
        method: "GET",
        params: {},
      }),
    }),
    getMessageByJobId: builder.query({
      keepUnusedDataFor: 5,
      query: (jobId) => ({
        url: `${Endpoints.MESSAGEJOBID}/${jobId}`,
        method: "GET",
        params: {},
      }),
    }),
  }),
});

export const { useGetMessageByIdQuery, useGetMessageByJobIdQuery } = messageApi;
