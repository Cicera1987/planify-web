import { Job } from "@/app/services/jobService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JobState {
  currentJob: Job | null;
  list: Job[];
}

const initialState: JobState = {
  currentJob: null,
  list: [],
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setCurrentJob: (state, action: PayloadAction<Job | null>) => {
      state.currentJob = action.payload;
    },
    setJobList: (state, action: PayloadAction<Job[]>) => {
      state.list = action.payload;
    },
    clearJobs: (state) => {
      state.currentJob = null;
      state.list = [];
    },
  },
});

export const { setCurrentJob, setJobList, clearJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
