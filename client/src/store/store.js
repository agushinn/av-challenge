import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@store/api/baseApi'

const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export default store
