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
        genreId,
      }) => ({
        url: Endpoints.JOBS,
        method: "GET",
        params: { isAscending, pageSize, pageNo, skill: skills, name, genreId },
      }),
      providesTags: ["jobs"],
    }),
    getJobByRecruiterId: builder.query({
      query: (recruiterId) => ({
        url: `/job-from-recruiter/${recruiterId}`,
        method: "GET",
      }),
      providesTags: ["jobsById"],
    }),
    getJobById: builder.query({
      query: (id) => ({
        url: `${Endpoints.JOB}/${id}`,
        method: "GET",
        // params: { isAscending, pageSize, limit, pageNo },
      }),
      keepUnusedDataFor: 4,
      providesTags: ["job"],
    }),
    createNewJob: builder.mutation({
      query: (job) => ({
        url: Endpoints.JOB,
        method: "POST",
        data: job,
      }),
    }),
    updateJob: builder.mutation({
      query: ({ jobId, job }) => ({
        url: `${Endpoints.JOB}/${jobId}`,
        method: "PUT",
        data: job,
      }),
    }),
    requestToCompleteJob: builder.mutation({
      query: ({ jobId, data }) => ({
        url: `${Endpoints.JOB}/${jobId}/status/request-to-complete`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["job"],
    }),
    completeJob: builder.mutation({
      query: ({ jobId, data }) => ({
        url: `${Endpoints.JOB}/${jobId}/status/complete`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["job"],
    }),
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `${Endpoints.JOB}/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobsById"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useGetJobByRecruiterIdQuery,
  useRequestToCompleteJobMutation,
  useCompleteJobMutation,
  useCreateNewJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;
