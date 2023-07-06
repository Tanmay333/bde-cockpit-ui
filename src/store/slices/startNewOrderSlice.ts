import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../types/common';
import { fetchData } from '../../integration/startneworder';

export const START_NEW_ORDER_SLICE = 'startneworderslice';

export interface State {
  status: FetchingStatus;
  error: string | null;
  data: boolean | null;
}

const initialState: State = {
  status: FetchingStatus.IDLE,
  error: null,
  data: null,
};

export const getData = createAsyncThunk<boolean | null, boolean>(
  'getData',
  (value: boolean | null) => {
    return fetchData(value);
  },
);

const DataSlice = createSlice({
  name: START_NEW_ORDER_SLICE,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getData.pending, (state) => {
        state.status = FetchingStatus.PENDING;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = FetchingStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        const requestCancelled = action.meta.aborted;
        if (requestCancelled) {
          return;
        }
        state.status = FetchingStatus.ERROR;
        state.data = null;
        state.error = action.error.message || 'Something went wrong.';
      });
  },
});

const { reducer } = DataSlice;

export const DataReducer = reducer;
