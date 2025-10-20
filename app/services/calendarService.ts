import { api } from "./api";

export interface CalendarTime {
  id: number;
  time: string;
}

export interface CalendarTimeWithDayId {
  id?: number;
  name?: string;
  dayId: number;
  timeId: number;
}


export interface CalendarDay {
  id: number;
  userId: number;
  localDate: string;
  times: CalendarTime[];
}

export interface CalendarRequestDay {
  id?: number;
  userId?: number;
  localDate: string;
  times: { time: string }[];
}

export interface CalendarTimeRequest {
  time: string;
}

export const getCalendar = async (): Promise<CalendarDay[]> => {
  const res = await api.get<CalendarDay[]>("/calendar");
  return res.data;
};

export const createCalendarDay = async (
  days: CalendarRequestDay[]
): Promise<CalendarDay[]> => {
  const res = await api.post<CalendarDay[]>("/calendar", days);
  return res.data;
};

export const updateCalendarDay = async (
  id: number,
  day: CalendarRequestDay,
): Promise<CalendarDay> => {
  const res = await api.put<CalendarDay>(`/calendar/${id}`, day);
  return res.data;
};

export const deleteCalendarDay = async (id: number): Promise<void> => {
  await api.delete(`/calendar/${id}`);
};

export const addTimeToDay = async (
  idDay: number,
  time: CalendarTimeRequest,
): Promise<CalendarTime> => {
  const res = await api.post<CalendarTime>(`/calendar/${idDay}/times`, time);
  return res.data;
};

export const deleteTimeFromDay = async (
  idDay: number,
  idTime: number,
): Promise<void> => {
  await api.delete(`/calendar/${idDay}/times/${idTime}`);
};
