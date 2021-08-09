import request, { getAuthHeaders } from './request-config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = `${process.env.REACT_APP_CINEPLEX_API}`;

export const profilesApi = createApi({
    reducerPath: 'profiles',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => ({
        getProfiles: builder.query({
            query: () => `/profile`,
        }),
    }),
});

export const { useGetProfilesQuery } = profilesApi;

export async function addBulk(requestBody) {
    const response = await request.post('/profile/bulk', { body: JSON.stringify(requestBody), ...getAuthHeaders() });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.description || 'Unable to add profiles. Please try again later.');
    }

    return data;
}

// switch to rtk query
export async function getProfiles() {
    const response = await request.get('/profile', { ...getAuthHeaders() });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.description || 'Unable to load profiles. Please try again later.');
    }

    return data;
}
