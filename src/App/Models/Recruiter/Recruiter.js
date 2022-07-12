import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const recruiterApi = createApi({
  reducerPath: "recruiterApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getRecruiter: builder.query({
      query: (userId) => ({
        url: `${Endpoints.RECRUITER}`,
        method: "GET",
        params: { recruiterId: userId },
      }),
    }),
  }),
});

export const { useGetRecruiterQuery } = recruiterApi;
