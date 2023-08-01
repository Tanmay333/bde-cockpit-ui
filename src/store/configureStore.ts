import { configureStore } from '@reduxjs/toolkit';
import { TEST_SLICE_KEY, testDataReducer } from './slices/OrderInfoSlice';
import {
  MACHINE_DETAILS_KEY,
  machineDetailsReducer,
} from './slices/machineDetailsSlice';
import {
  SELECT_WORKERS,
  selectTeamSizeReducer,
} from './slices/selectTeamSizeSlice';
import {
  ORDER_QUANTITY,
  orderQuantityReducer,
} from './slices/orderQuantitySlice';
import { ORDER_Number, orderNumberReducer } from './slices/orderNumber';
import {
  DataReducer,
  START_NEW_ORDER_SLICE,
} from './slices/startNewOrderSlice';
import {
  TRANSLATION_KEY,
  translationReducer,
} from './slices/translation.slice';
import { MOCK_DATA_KEY, mockReducer } from './slices/mockData.slice';
import { STATION_IDS, stationIdsReducer } from './slices/stationIdSlice';
const reducers = {
  [TEST_SLICE_KEY]: testDataReducer,
  [MACHINE_DETAILS_KEY]: machineDetailsReducer,
  [SELECT_WORKERS]: selectTeamSizeReducer,
  [ORDER_QUANTITY]: orderQuantityReducer,
  [ORDER_Number]: orderNumberReducer,
  [START_NEW_ORDER_SLICE]: DataReducer,
  [TRANSLATION_KEY]: translationReducer,
  [MOCK_DATA_KEY]: mockReducer,
  [STATION_IDS]: stationIdsReducer,
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
