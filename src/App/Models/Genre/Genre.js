import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const genreApi = createApi({
    reducerPath: "genreApi",
    baseQuery: axiosBaseQuery({baseUrl: ""}),
    keepUnusedDataFor: 10,
    endpoints: (builder) => ({
        getGenres: builder.query({
            query: () => ({
                url: Endpoints.GENRE,
                method: "GET",
            })
        }),
    }),
});

export const {useGetGenresQuery} = genreApi;