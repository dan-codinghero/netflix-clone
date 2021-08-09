import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = `${process.env.REACT_APP_CINEPLEX_API}`;

export const plansApi = createApi({
    reducerPath: 'plans',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => ({
        getPlans: builder.query({
            query: () => `/plans`,
        }),
    }),
});

export const { useGetPlansQuery } = plansApi;
