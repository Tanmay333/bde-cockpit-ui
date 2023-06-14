import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../types/common';
import { fetchData } from '../../integration/teamsize';

export const SELECT_WORKERS = 'SelectteamsizeSlice';

export interface WorkersDetailsState {
  status: FetchingStatus;
  error: string | null;
  data: number | null;
}

const initialState: WorkersDetailsState = {
  status: FetchingStatus.IDLE,
  error: null,
  data: null,
};

export const getworkersDetails = createAsyncThunk<number | null, number>(
  'getworkersDetails',
  (value: number | null) => {
    return fetchData(value);
  },
);

const selectTeamSizeSlice = createSlice({
  name: SELECT_WORKERS,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getworkersDetails.pending, (state) => {
        state.status = FetchingStatus.PENDING;
      })
      .addCase(getworkersDetails.fulfilled, (state, action) => {
        state.status = FetchingStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(getworkersDetails.rejected, (state, action) => {
        const requestCancelled = action.meta.aborted;
        if (requestCancelled) {
          return;
        }
        state.status = FetchingStatus.ERROR;
        state.error = action.error.message || 'Something went wrong.';
      });
  },
});

const { reducer } = selectTeamSizeSlice;

export const selectTeamSizeReducer = reducer;
