import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getProfiles: builder.query({
      query: (userId) => ({
        url: `${Endpoints.PORTFOLIO}/${userId}`,
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ userId, updProfile }) => ({
        url: `${Endpoints.PORTFOLIO}/${userId}`,
        method: "PUT",
        data: updProfile,
      }),
    }),
  }),
});

export const { useGetProfilesQuery, useUpdateProfileMutation } = profileApi;
