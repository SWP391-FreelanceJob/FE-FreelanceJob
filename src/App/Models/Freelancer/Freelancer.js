import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const freelancersApi = createApi({
  reducerPath: "freelancersApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  // keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getFreelancers: builder.query({
      query: ({pageNo = 1, pageSize = 10, isAscending = true, skills, name}) => ({
        url: Endpoints.FREELANCERS,
        method: "GET",
        params: { isAscending, pageSize, pageNo, skill: skills, name },
      }),
    }),
    getFreelancersByName: builder.query({
      query: (id) => ({
        url: "",
        method: "GET",
        params: { isAscending, pageSize, limit, pageNo },
      }),
    }),
    getFreelancerById: builder.query({
      query: (id) => ({
        url: `${Endpoints.FREELANCER}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetFreelancersQuery,
  useGetFreelancersByNameQuery,
  useGetFreelancerByIdQuery,
} = freelancersApi;
