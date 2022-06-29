import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const offerApi = createApi({
  reducerPath: "offerApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  // keepUnusedDataFor: 10,
  // tagTypes: ["offer"],
  endpoints: (builder) => ({
    getOffersByJobId: builder.query({
      keepUnusedDataFor: 5,
      query: (jobId) => ({
        url: `${Endpoints.OFFER}/${jobId}`,
        method: "GET",
        params: {},
      }),
    }),
    getOfferByJobIdAndFreelancerId: builder.query({
      query: ({ jobId, freelancerId }) => ({
        url: `${Endpoints.OFFER_FREELANCER_JOB}/${freelancerId}/${jobId}`,
        method: "GET",
        params: {},
      }),
      providesTags: ["offer"],
    }),
    getOffersByFreelancerId: builder.query({
      query: ({ freelancerId }) => ({
        url: `${Endpoints.OFFERS_FREELANCER}/${freelancerId}`,
        method: "GET",
        params: {},
      }),
    }),
    createOfferByJobId: builder.mutation({
      query: ({ jobId, offer }) => ({
        url: `${Endpoints.OFFER}/${jobId}`,
        method: "POST",
        data: offer,
      }),
      invalidatesTags: ["offer"],
    }),
    updateOfferByJobId: builder.mutation({
      query: ({ offerId, offer }) => ({
        url: `${Endpoints.OFFER}/${offerId}`,
        method: "PUT",
        data: offer,
      }),
      invalidatesTags: ["offer"],
    }),
  }),
});

export const {
  useGetOffersByJobIdQuery,
  useCreateOfferByJobIdMutation,
  useGetOfferByJobIdAndFreelancerIdQuery,
  useGetOffersByFreelancerIdQuery,
  useUpdateOfferByJobIdMutation,
} = offerApi;
