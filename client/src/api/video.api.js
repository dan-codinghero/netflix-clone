import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const api_key = `${process.env.REACT_APP_THEMOVIEDB_API_KEY}`;
const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&primary_release_year=2017&sort_by=revenue.desc';

export const videosApi = createApi({
    reducerPath: 'videos',
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => `${url}`,
        }),
    }),
});

export const { useGetVideosQuery } = videosApi;
