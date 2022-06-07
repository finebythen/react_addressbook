import { configureStore } from '@reduxjs/toolkit'
import addressSlice from '../features/address/addressSlice'

export const store = configureStore({
    reducer: {
        address: addressSlice,
    },
})