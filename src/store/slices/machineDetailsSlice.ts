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
  station: {
    stationId: null,
    mainSpeed: null,
  },
  data: undefined,
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
interface Station {
  mainSpeed: number | null;
  stationId: string | null;
}
export interface MachineDetails {
  data: any;
  stationId: string | null;
  station: Station;
  assignedJobDetails: AssignedOrderDetails;
  process: Process;
}

export interface MachineDetailsState {
  status: FetchingStatus;
  error: string | null;
  data: MachineDetails;
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

      state.data = action.payload;
    },

    StartNewOrder: (state) => {
      state.data = initialData;
    },
  },
});

const { reducer, actions } = machineDetailsSlice;

export const { updateMachineDetails, StartNewOrder } = actions;
export const machineDetailsReducer = reducer;
