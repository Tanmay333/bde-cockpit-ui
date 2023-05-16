import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../types/common';
import { fetchTestData } from '../../integration/test.api';

export const TEST_SLICE_KEY = 'testslice';

export interface TestData {
  name: string | null;
  age: number | null;
}

export interface TestState {
  status: FetchingStatus;
  error: string | null;
  data: TestData | null;
}

const initialState: TestState = {
  status: FetchingStatus.IDLE,
  error: null,
  data: null,
};

export const getTestData = createAsyncThunk<TestData, void>(
  'getTestData',
  async () => {
    return fetchTestData();
  },
);

const testDataSlice = createSlice({
  name: TEST_SLICE_KEY,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTestData.pending, (state) => {
        state.status = FetchingStatus.PENDING;
      })
      .addCase(getTestData.fulfilled, (state, action) => {
        state.status = FetchingStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(getTestData.rejected, (state, action) => {
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

const { reducer } = testDataSlice;

export const testDataReducer = reducer;
