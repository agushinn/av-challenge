import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL } from '@configs/configs'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
    }),
    prepareHeaders: (headers) => {
        headers.set('Accept', 'application/json')
        headers.set('Content-Type', 'application/json')
        return headers
    },
    tagTypes: ['Jobs', 'Job', 'Skills', 'UpdatedJob'],
    endpoints: () => ({}),
})
