import { configureStore } from '@reduxjs/toolkit';
import { TEST_SLICE_KEY, testDataReducer } from './slices/OrderInfoSlice';
import {
  MACHINE_DETAILS_KEY,
  machineDetailsReducer,
} from './slices/machineDetailsSlice';

const reducers = {
  [TEST_SLICE_KEY]: testDataReducer,
  [MACHINE_DETAILS_KEY]: machineDetailsReducer,
};

export const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface AppThunkConfig {
  dispatch: AppDispatch;
  state: RootState;
}

// This is going to be used to provide a store for integration tests.
export const createAppStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    preloadedState,
    reducer: reducers,
  });
};
