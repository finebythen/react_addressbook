import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api/address/';

const initialState = {
    address: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchAddress = createAsyncThunk('api/address', async (address, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAddress.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.address = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

    }
});

export const selectAllAddress = (state) => state.address;

export default addressSlice.reducer