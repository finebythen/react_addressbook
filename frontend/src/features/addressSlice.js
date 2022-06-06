import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api/address/';

const addressAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.last_name.localeCompare(b.last_name),
});

const initialState = addressAdapter.getInitialState({
    address: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
});

export const fetchAddress = createAsyncThunk('api/address/get', async (address, { rejectWithValue }) => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const postAddress = createAsyncThunk('api/address/post', async (address, { rejectWithValue }) => {
    try {
        const response = await axios.post(BASE_URL, address);
        return response.data;
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const updateAddress = createAsyncThunk('api/address/update', async (address, { rejectWithValue }) => {
    try {
        const { id } = address;
        const response = await axios.put(`${BASE_URL}${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
        rejectWithValue(err.response.data);
    }
});

export const deleteAddress = createAsyncThunk('api/address/delete', async (address, { rejectWithValue }) => {
    try {
        const { id } = address;
        const response = await axios.delete(`${BASE_URL}${id}`);
        if (response?.status === 200) return address;
        return `${response.status === 200}: ${response?.statusText}`;
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
                // add any fetched posts to array (with adapter)
                addressAdapter.upsertMany(state, action.payload);
                state.status = 'succeeded';
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.address = [];
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(postAddress.fulfilled, (state, action) => {
                // add new created object to array (with adapter)
                addressAdapter.addOne(state, action.payload);
                state.status = 'succeeded';
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    state.status = 'failed';
                    console.log('Update could not complete!');
                    console.log(action.payload);
                    return;
                }
                state.address.upsertOne(state, action.payload);
                state.status = 'succeeded';
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                if (!action.meta.arg?.id) {
                    state.status = 'failed';
                    console.log('Delete could not complete!');
                    console.log(action.payload);
                    return;
                }
                const { id } = action.meta.arg;
                addressAdapter.removeOne(state, id);
                state.status = 'succeeded';
            })
    }
});

export const {
    selectAll: selectAllAddress,
    selectById: selectAddressById,
} = addressAdapter.getSelectors(state => state.address);

export const addressStatus = (state) => state.address.status;
export const addressError = (state) => state.address.error;

export default addressSlice.reducer