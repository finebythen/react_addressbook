import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api/address/';

const initialState = {
    address: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

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
                state.address = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.address = [];
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(postAddress.fulfilled, (state, action) => {
                state.address.push(action.payload);
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
                let { pk } = action.payload;
                state.address = state.address.splice(pk, 1);
                state.status = 'succeeded';
            })
    }
});

export const addressStatus = (state) => state.address.status;
export const addressError = (state) => state.address.error;
export const selectAllAddress = (state) => state.address;
export const getAddressByPk = (state, pk) => state.address.address.find(address => address.id === pk);

export default addressSlice.reducer