import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import imagesReducer from "./imagesSlice";

export function createStore() {
  const store = configureStore({
    reducer: {
      images: imagesReducer,
    },
  });

  return store;
}

const appStore: ReturnType<typeof createStore> = createStore();

export default appStore;

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
