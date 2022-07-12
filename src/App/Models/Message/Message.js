import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  // keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getMessageById: builder.query({
      keepUnusedDataFor: 15,
      query: (userId) => ({
        url: `${Endpoints.MESSAGE}/${userId}`,
        method: "GET",
        params: {},
      }),
    }),
    getMessageByJobId: builder.query({
      keepUnusedDataFor: 15,
      query: (jobId) => ({
        url: `${Endpoints.MESSAGEJOBID}/${jobId}`,
        method: "GET",
        params: {},
      }),
    }),
    getMessageByAccountIdJobId: builder.query({
      keepUnusedDataFor: 15,
      query: ({ accountId, jobId }) => ({
        url: `${Endpoints.MESSAGE}/${accountId}/${jobId}`,
        method: "GET",
        params: {},
      }),
      providesTags: ["messageByAccountIdJobId"],
    }),
    getMessageByTarget: builder.query({
      keepUnusedDataFor: 15,
      query: ({ targetAccountId, sourceAccountId, jobId }) => ({
        url: `${Endpoints.MESSAGEBYTARGET}/${jobId}/account/${sourceAccountId}/with/${targetAccountId}`,
        method: "GET",
        params: {},
      }),
      providesTags: ["messageByTarget"],
    }),
    sentMessage: builder.mutation({
      // keepUnusedDataFor: ,
      query: (newMsg) => ({
        url: `${Endpoints.MESSAGE}`,
        method: "POST",
        data: newMsg,
      }),
      invalidatesTags: ["messageByAccountIdJobId"],
    }),
  }),
});

export const {
  useGetMessageByIdQuery,
  useGetMessageByJobIdQuery,
  useGetMessageByAccountIdJobIdQuery,
  useGetMessageByTargetQuery,
  useSentMessageMutation,
} = messageApi;
