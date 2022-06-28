import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({
        pageNo = 1,
        pageSize = 10,
        isAscending = true,
        skills,
        name,
      }) => ({
        url: Endpoints.JOBS,
        method: "GET",
        params: { isAscending, pageSize, pageNo },
      }),
    }),
    getJobById: builder.query({
      query: (id) => ({
        url: `${Endpoints.JOB}/${id}`,
        method: "GET",
        // params: { isAscending, pageSize, limit, pageNo },
      }),
    }),
    createNewJob: builder.mutation({
      query: (job) => ({
        url: Endpoints.JOB,
        method: "POST",
        data: job,
      }),
    }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery, useCreateNewJobMutation } =
  jobApi;
