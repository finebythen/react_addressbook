import { configureStore } from '@reduxjs/toolkit'
import addressSlice from '../features/addressSlice'

export const store = configureStore({
    reducer: {
        address: addressSlice,
    },
})