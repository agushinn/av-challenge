import { baseApi } from '@store/api/baseApi'

export const skillsSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => 'get_skills.php',
            providesTags: ['Skills'],
        }),
    }),
})

export const { useGetSkillsQuery } = skillsSlice
