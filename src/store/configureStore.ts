import { configureStore } from '@reduxjs/toolkit';
import { TEST_SLICE_KEY, testDataReducer } from './slices/OrderInfoSlice';
import {
  MACHINE_DETAILS_KEY,
  machineDetailsReducer,
} from './slices/machineDetailsSlice';
import {
  SELECT_WORKERS,
  selectWorkersReducer,
} from './slices/SelectworkersSlice';
import {
  ORDER_QUANTITY,
  orderQuantityReducer,
} from './slices/orderQuantitySlice';
import { ORDER_Number, orderNumberReducer } from './slices/orderNumber';
const reducers = {
  [TEST_SLICE_KEY]: testDataReducer,
  [MACHINE_DETAILS_KEY]: machineDetailsReducer,
  [SELECT_WORKERS]: selectWorkersReducer,
  [ORDER_QUANTITY]: orderQuantityReducer,
  [ORDER_Number]: orderNumberReducer,
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
