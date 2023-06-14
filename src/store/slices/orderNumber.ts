import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../types/common';
import { fetchOrderNumber } from '../../integration/orderNumber';

export const ORDER_Number = 'OrderNumberSlice';

export interface NUmberDetailsState {
  status: FetchingStatus;
  error: string | null;
  data: number | string | null;
}

const initialState: NUmberDetailsState = {
  status: FetchingStatus.IDLE,
  error: null,
  data: null,
};

export const getnumberDetails = createAsyncThunk<
  number | string | null,
  number | string
>('getnumberDetails', (value: number | string | null) => {
  return fetchOrderNumber(value);
});

const orderNumberSlice = createSlice({
  name: ORDER_Number,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getnumberDetails.pending, (state) => {
        state.status = FetchingStatus.PENDING;
      })
      .addCase(getnumberDetails.fulfilled, (state, action) => {
        state.status = FetchingStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(getnumberDetails.rejected, (state, action) => {
        const requestCancelled = action.meta.aborted;
        if (requestCancelled) {
          return;
        }
        state.status = FetchingStatus.ERROR;
        state.error = action.error.message || 'Something went wrong.';
      });
  },
});

const { reducer } = orderNumberSlice;

export const orderNumberReducer = reducer;
