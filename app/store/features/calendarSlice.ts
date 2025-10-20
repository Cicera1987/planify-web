import { CalendarDay, CalendarTime, CalendarTimeWithDayId } from "@/app/services/calendarService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  currentDay: CalendarDay | null;
  list: (CalendarDay & { isSelected?: boolean })[];
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
      state.list = action.payload.map(d => ({ ...d, isSelected: false }));
    },
    clearCalendar: (state) => {
      state.currentDay = null;
      state.list = [];
    },
    upsertCalendarDay: (state, action: PayloadAction<CalendarDay>) => {
      const index = state.list.findIndex(d => d.id === action.payload.id);
      if (index >= 0) {
        state.list[index] = { ...action.payload, isSelected: state.list[index].isSelected };
      } else {
        state.list.push({ ...action.payload, isSelected: false });
      }
    },
    addTimeToDayState: (state, action: PayloadAction<{ dayId: number, time: CalendarTime }>) => {
      const day = state.list.find(d => d.id === action.payload.dayId);
      if (day) {
        day.times.push(action.payload.time);
      }
    },
    removeTimeFromDayState: (state, action: PayloadAction<CalendarTimeWithDayId>) => {
      const day = state.list.find(d => d.id === action.payload.dayId);
      if (day) {
        day.times = day.times.filter(t => t.id !== action.payload.timeId);
      }
    },
  },
});

export const {
  setCurrentDay,
  setCalendarList,
  clearCalendar,
  upsertCalendarDay,
  addTimeToDayState,
  removeTimeFromDayState,
} = calendarSlice.actions;

export default calendarSlice.reducer;
