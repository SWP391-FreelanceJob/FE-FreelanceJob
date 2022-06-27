import { axiosBaseQuery } from "@/Api/Client/AxiosBase";
import { Endpoints } from "@/Api/Endpoints";
import { createApi } from "@reduxjs/toolkit/query/react";

export const skillApi = createApi({
    reducerPath: "skillApi",
    baseQuery: axiosBaseQuery({baseUrl: ""}),
    keepUnusedDataFor: 10,
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => ({
                url: Endpoints.SKILL,
                method: "GET",
            })
        }),
    }),
});

export const {useGetSkillsQuery} = skillApi;