import { baseApi } from '@store/api/baseApi'

export const jobsSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: ({
                include_external = true,
                title,
                location,
                salary_max,
                salary_min,
            } = {}) => {
                let queryParams = new URLSearchParams()
                if (include_external)
                    queryParams.append('include_external', include_external)
                if (title) queryParams.append('title', title)
                if (location) queryParams.append('location', location)
                if (salary_max) queryParams.append('salary_max', salary_max)
                if (salary_min) queryParams.append('salary_min', salary_min)

                return `get_all_job_posts.php?${queryParams.toString()}`
            },
            providesTags: ['Jobs'],
            transformResponse: (response) => {
                return response.data
            },
        }),
        getJob: builder.query({
            query: (id) => `get_job_post.php?id=${id}`,
            providesTags: ['Job'],
            transformResponse: (response) => {
                return response.data
            },
        }),
        createJob: builder.mutation({
            query: (body) => ({
                url: 'create_job_post.php',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Jobs'],
        }),
        updateJob: builder.mutation({
            query: (body) => ({
                url: `update_job_post.php`,
                method: 'PUT',
                body: body,
            }),
            providesTags: ['UpdatedJob'],
            invalidatesTags: ['Jobs', 'Job'],
        }),
        deleteJob: builder.mutation({
            query: (body) => ({
                url: `delete_job_post.php`,
                method: 'DELETE',
                body: body,
            }),
            invalidatesTags: ['Jobs', 'Job'],
        }),
    }),
})

export const {
    useGetJobsQuery,
    useGetJobQuery,
    useCreateJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
} = jobsSlice
