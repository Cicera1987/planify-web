import { Scheduling } from "@/app/services/schedulingService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SchedulingState {
  currentScheduling: Scheduling | null;
  list: Scheduling[];
}

const initialState: SchedulingState = {
  currentScheduling: null,
  list: [],
};

const schedulingSlice = createSlice({
  name: "scheduling",
  initialState,
  reducers: {
    setCurrentScheduling: (state, action: PayloadAction<Scheduling | null>) => {
      state.currentScheduling = action.payload;
    },
    setSchedulingList: (state, action: PayloadAction<Scheduling[]>) => {
      state.list = action.payload;
    },
    clearScheduling: (state) => {
      state.currentScheduling = null;
      state.list = [];
    },
  },
});

export const { setCurrentScheduling, setSchedulingList, clearScheduling } =
  schedulingSlice.actions;
export default schedulingSlice.reducer;
