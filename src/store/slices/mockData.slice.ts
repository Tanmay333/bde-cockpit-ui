import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const MOCK_DATA_KEY = 'mockData';
export interface MockState {
  data: boolean;
}
const initialState: MockState = {
  data: false,
};

export const toggleMockData = createAsyncThunk<boolean, boolean>(
  'getMockToggle',
  (value: boolean) => {
    return value;
  },
);

const mockSlice = createSlice({
  name: MOCK_DATA_KEY,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(toggleMockData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

const { reducer } = mockSlice;

export const mockReducer = reducer;
