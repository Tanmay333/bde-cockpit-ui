import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../types/common';
import { fetchOrderQuantity } from '../../integration/orderQuantity';

export const ORDER_QUANTITY = 'OrderQuantitySlice';

export interface QuantityDetailsState {
  status: FetchingStatus;
  error: string | null;
  data: number | null;
}

const initialState: QuantityDetailsState = {
  status: FetchingStatus.IDLE,
  error: null,
  data: null,
};

export const getquantityDetails = createAsyncThunk<number | null, number>(
  'getquantityDetails',
  (value: number | null) => {
    return fetchOrderQuantity(value);
  },
);

const orderQuantitySlice = createSlice({
  name: ORDER_QUANTITY,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getquantityDetails.pending, (state) => {
        state.status = FetchingStatus.PENDING;
      })
      .addCase(getquantityDetails.fulfilled, (state, action) => {
        state.status = FetchingStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(getquantityDetails.rejected, (state, action) => {
        const requestCancelled = action.meta.aborted;
        if (requestCancelled) {
          return;
        }
        state.status = FetchingStatus.ERROR;
        state.error = action.error.message || 'Something went wrong.';
      });
  },
});

const { reducer } = orderQuantitySlice;

export const orderQuantityReducer = reducer;
