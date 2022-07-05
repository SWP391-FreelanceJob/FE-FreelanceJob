import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ pageNo = 1, pageSize = 10, isAscending = true, name }) => ({
        url: Endpoints.PROJECTS,
        method: "GET",
        params: { isAscending, pageSize, pageNo, name },
      }),
    }),
    getProjectsByFreelancerId: builder.query({
      query: ({
        pageNo = 1,
        pageSize = 10,
        isAscending = true,
        freelancerId,
        name,
      }) => ({
        url: `${Endpoints.FREELANCER}/${freelancerId}${Endpoints.PROJECT}`,
        method: "GET",
        params: { isAscending, pageSize, pageNo, name },
      }),
      providesTags: ["projects"]
    }),
    createProject: builder.mutation({
      query: (project) => ({
        url: Endpoints.PROJECT,
        method: "POST",
        // params: {freelancerId},
        data: project,
      }),
      invalidatesTags: ["projects"]
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectsByFreelancerIdQuery, useCreateProjectMutation } =
  projectApi;
