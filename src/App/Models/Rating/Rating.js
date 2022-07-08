import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const ratingApi = createApi({
  reducerPath: "ratingApi",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    rateJob: builder.mutation({
      query: ({ jobId, accountId, rating }) => ({
        url: `${Endpoints.RATING}/job/${jobId}`,
        method: "PUT",
        data: { accountId, rating },
      }),
    //   invalidatesTags: ["offer_freelancer", "offer"]
    }),
  }),
});

export const {
    useRateJobMutation,
} = ratingApi;