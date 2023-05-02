import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../types/common';
import { webSocket } from '../../integration/webScokets';

export const MACHINE_DETAILS_KEY = 'machineDetailsSlice';

interface AssignedOrderDetails {
  orderId: string | null;
  customer: string | null;
  itemId: string | null;
  quantity: number | null;
  description: string | null;
  productionTeamSize: number | null;
}
interface Downtimes {
  startTime: string | null;
  endTime: string | null;
  reason: string | null;
}
interface CurrentPhaseDetails {
  phaseName: string | null;
  startTime: string | null;
  endTime: string | null;
  downtimes: Downtimes[] | null;
  state: string;
}
interface PreviousPhases {
  phaseName: string | null;
  startTime: string | null;
  endTime: string | null;
  downtimes: Downtimes[] | null;
}
interface ProducedItems {
  startTime: string | null;
  endTime: string | null;
  quantity: number | null;
  result: string | null;
}
interface Process {
  processId: string | null;
  currentPhaseDetails: CurrentPhaseDetails | null;
  previousPhases: PreviousPhases[] | null;
  producedItems: ProducedItems[] | null;
}
export interface MachineDetails {
  stationId: string | null;
  assignedOrderDetails: AssignedOrderDetails | null;
  process: Process | null;
}

export interface MachineDetailsState {
  status: FetchingStatus;
  error: string | null;
  data: MachineDetails | null;
}

const initialState: MachineDetailsState = {
  status: FetchingStatus.IDLE,
  error: null,
  data: null,
};

export const getMachineDetails = createAsyncThunk<MachineDetails, void>(
  'getMachineDetails',
  async (_, { dispatch }) => {
    return new Promise(() => {
      const WebSocket = webSocket();
      const ws = WebSocket.init();

      ws.onmessage = (event) => {
        const parsedData: MachineDetails = JSON.parse(event.data);
        if (event.type === 'message') {
          dispatch(updateMachineDetails(parsedData));
        }
      };
      ws.onerror = () => {
        ws.close();
      };
    });
  },
);

const machineDetailsSlice = createSlice({
  name: MACHINE_DETAILS_KEY,
  initialState,
  reducers: {
    updateMachineDetails: (state, action: PayloadAction<MachineDetails>) => {
      state.status = FetchingStatus.SUCCESS;
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMachineDetails.pending, (state) => {
        state.status = FetchingStatus.PENDING;
      })
      .addCase(getMachineDetails.rejected, (state, action) => {
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

const { reducer, actions } = machineDetailsSlice;

const { updateMachineDetails } = actions;
export const machineDetailsReducer = reducer;
