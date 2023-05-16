import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../types/common';
import { webSocket } from '../../integration/webScokets';

export const MACHINE_DETAILS_KEY = 'machineDetailsSlice';

interface AssignedOrderDetails {
  jobId: string | null;
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
  startTime: string;
  endTime: string | null;
  downtimes: Downtimes[] | null;
  state: string;
}
interface PreviousPhases {
  phaseName: string | null;
  startTime: string;
  endTime: string;
  downtimes: Downtimes[] | null;
}
interface ProducedItems {
  startTime: string | null;
  endTime: string | null;
  quantity: number | null;
  result: string | null;
}
interface Process {
  currentPhaseDetails: CurrentPhaseDetails;
  previousPhases: PreviousPhases[];
  producedItems: ProducedItems[] | null;
}
export interface MachineDetails {
  stationId: string;
  assignedJobDetails: AssignedOrderDetails;
  process: Process;
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
const socket = webSocket();
const ws = socket.init();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMachineDetails = createAsyncThunk<MachineDetails, any>(
  'getMachineDetails',
  async (message, { dispatch }) => {
    // Send the message to the opened WebSocket connection
    ws.send(JSON.stringify(message));

    await new Promise<void>((resolve, reject) => {
      ws.onmessage = (event) => {
        const parsedData: MachineDetails = JSON.parse(event.data);
        if (event.type === 'message') {
          dispatch(updateMachineDetails(parsedData));
        }
      };

      ws.onerror = (error) => {
        reject(error);
      };

      // Resolve the promise once the WebSocket connection is open
      if (ws.readyState === WebSocket.OPEN) {
        resolve();
      } else {
        ws.onopen = () => {
          resolve();
        };
      }
    });

    return message;
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
