import { CalendarDay } from "@/app/services/calendarService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  currentDay: CalendarDay | null;
  list: CalendarDay[];
}

const initialState: CalendarState = {
  currentDay: null,
  list: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCurrentDay: (state, action: PayloadAction<CalendarDay | null>) => {
      state.currentDay = action.payload;
    },
    setCalendarList: (state, action: PayloadAction<CalendarDay[]>) => {
      state.list = action.payload;
    },
    clearCalendar: (state) => {
      state.currentDay = null;
      state.list = [];
    },
  },
});

export const { setCurrentDay, setCalendarList, clearCalendar } =
  calendarSlice.actions;
export default calendarSlice.reducer;
