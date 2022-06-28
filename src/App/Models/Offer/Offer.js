import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const offerApi = createApi({
  reducerPath: "offerApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  // keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    getOffersByJobId: builder.query({
      keepUnusedDataFor: 5,
      query: (jobId) => ({
        url: `${Endpoints.OFFER}/${jobId}`,
        method: "GET",
        params: { },
      }),
    }),
  }),
});

export const { useGetOffersByJobIdQuery } = offerApi;
