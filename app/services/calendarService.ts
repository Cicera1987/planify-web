import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API } from "./api";

export interface CalendarTime {
  id: number;
  time: string;
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

export const calendarApi = createApi({
  reducerPath: "calendarApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("@planify/token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCalendar: builder.query<CalendarDay[], void>({
      query: () => "/calendar",
    }),
    createCalendarDay: builder.mutation<CalendarDay, CalendarRequestDay>({
      query: (day) => ({
        url: "/calendar",
        method: "POST",
        body: day,
      }),
    }),
    updateCalendarDay: builder.mutation<
      CalendarDay,
      { id: number; day: CalendarRequestDay }
    >({
      query: ({ id, day }) => ({
        url: `/calendar/${id}`,
        method: "PUT",
        body: day,
      }),
    }),
    deleteCalendarDay: builder.mutation<void, number>({
      query: (id) => ({
        url: `/calendar/${id}`,
        method: "DELETE",
      }),
    }),
    addTimeToDay: builder.mutation<
      CalendarTime,
      { idDay: number; time: CalendarTimeRequest }
    >({
      query: ({ idDay, time }) => ({
        url: `/calendar/${idDay}/times`,
        method: "POST",
        body: time,
      }),
    }),
    deleteTimeFromDay: builder.mutation<
      void,
      { idDay: number; idTime: number }
    >({
      query: ({ idDay, idTime }) => ({
        url: `/calendar/${idDay}/times/${idTime}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCalendarQuery,
  useCreateCalendarDayMutation,
  useUpdateCalendarDayMutation,
  useDeleteCalendarDayMutation,
  useAddTimeToDayMutation,
  useDeleteTimeFromDayMutation,
} = calendarApi;
