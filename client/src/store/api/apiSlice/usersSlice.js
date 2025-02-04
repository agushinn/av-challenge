import { baseApi } from '@store/api/baseApi'

export const usersSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (body) => ({
                url: 'create_user.php',
                method: 'POST',
                body: body,
            }),
        }),
    }),
})

export const { useCreateUserMutation } = usersSlice
