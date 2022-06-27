import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const freelancersApi = createApi({
  reducerPath: "freelancersApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  // keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getFreelancers: builder.query({
      query: (
        skills,
        name,
        isAscending = true,
        pageSize = 10,
        limit = 10,
        pageNo = 1
      ) => ({
        url: Endpoints.FREELANCERS,
        method: "GET",
        params: { isAscending, pageSize, limit, pageNo },
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

export const { useGetFreelancersQuery, useGetFreelancersByNameQuery, useGetFreelancerByIdQuery } =
  freelancersApi;
