import http from "../services/httpService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";
import config from "../config";

// Images endpoint blueprint
export type Images = {
  id: number;
  title: string;
  imgSrc: string;
}[];

// Images State blueprint
export type ImagesState = {
  list: Images;
  status: string;
  error: string;
};

// Images Slice
export const initialState: ImagesState = {
  list: [],
  status: config.statusCodes.idle,
  error: "",
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = config.statusCodes.loading;
      })
      .addCase(
        fetchImages.fulfilled,
        (state, action: PayloadAction<Images>) => {
          state.list = action.payload;
          state.status = config.statusCodes.succeeded;
        }
      )
      .addCase(fetchImages.rejected, (state, action) => {
        state.error = action.error.message!;
        state.status = config.statusCodes.failed;
      });
  },
});

const imagesReducer = imagesSlice.reducer;
export default imagesReducer;

// Action Creator
export const fetchImages = createAsyncThunk("images/fetchImages", async () => {
  const response = await http.get(config.api.endpoints.images);
  return response.data;
});

// Selector
export const selectImages = (state: RootState) => state.images.list;
export const selectImagesStatus = (state: RootState) => state.images.status;
