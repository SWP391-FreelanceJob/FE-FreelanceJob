import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (
        skills,
        name,
        isAscending = true,
        pageSize = 10,
        limit = 10,
        pageNo = 1
      ) => ({
        url: Endpoints.JOBS,
        method: "GET",
        params: { isAscending, pageSize, limit, pageNo },
      }),
    }),
    getJobById: builder.query({
      query: (id) => ({
        url: Endpoints.JOB,
        method: "GET",
        params: { isAscending, pageSize, limit, pageNo },
      }),
    }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery } =
  jobApi;
