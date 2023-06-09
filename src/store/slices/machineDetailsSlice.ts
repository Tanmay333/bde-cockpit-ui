import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../types/common';

export const MACHINE_DETAILS_KEY = 'machineDetailsSlice';
const initialData: MachineDetails = {
  stationId: null,
  assignedJobDetails: {
    jobId: null,
    orderId: null,
    customer: null,
    itemId: null,
    quantity: null,
    description: null,
    productionTeamSize: null,
  },
  process: {
    currentPhaseDetails: {
      phaseName: null,
      startTime: null,
      endTime: null,
      downtimes: [],
      state: null,
    },
    previousPhases: [],
    producedItems: [
      {
        startTime: null,
        endTime: null,
        quantity: null,
        result: null,
      },
    ],
  },
};
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
  startTime: string | null;
  endTime: string | null;
  downtimes: Downtimes[];
  state: string | null;
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
  stationId: string | null;
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
  data: initialData,
};

const machineDetailsSlice = createSlice({
  name: MACHINE_DETAILS_KEY,
  initialState,
  reducers: {
    updateMachineDetails: (state, action: PayloadAction<MachineDetails>) => {
      state.status = FetchingStatus.SUCCESS;
      if (
        action.payload &&
        action.payload.process &&
        action.payload.process.currentPhaseDetails.state === 'FINISHED'
      ) {
        state.data = initialData;
      } else {
        state.data = action.payload;
      }
    },
  },
});

const { reducer, actions } = machineDetailsSlice;

export const { updateMachineDetails } = actions;
export const machineDetailsReducer = reducer;
