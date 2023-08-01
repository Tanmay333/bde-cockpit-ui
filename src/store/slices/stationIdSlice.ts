import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const STATION_IDS = 'StationIdsSlice';
interface StationIdState {
  value: string | null;
}
const initialState: StationIdState = {
  value: null,
};
export const StationIdsData = createAsyncThunk<string, string>(
  'getStationIds',
  async (value: string) => {
    return value;
  },
);
const stationIdSlice = createSlice({
  name: STATION_IDS,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(StationIdsData.fulfilled, (state, action) => {
      state.value = action.payload; // You should use 'state.value' instead of 'state.data'
    });
  },
});
const { reducer } = stationIdSlice;
export const stationIdsReducer = reducer;
