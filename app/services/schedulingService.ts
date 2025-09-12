import { BASE_API } from "./api";
export type SchedulingStatus =
  | "AGENDADO"
  | "CONFIRMADO"
  | "REJEITADO"
  | "CANCELADO"
  | "EM_ANDAMENTO"
  | "CONCLUIDO"
  | "NAO_COMPARECEU"
  | "REMARCADO";

export const SchedulingStatusLabels: Record<SchedulingStatus, string> = {
  AGENDADO: "Agendado",
  CONFIRMADO: "Confirmado",
  REJEITADO: "Rejeitado",
  CANCELADO: "Cancelado",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Concluído",
  NAO_COMPARECEU: "Não compareceu",
  REMARCADO: "Remarcado",
};

export type SchedulingPopupStatus = Extract<
  SchedulingStatus,
  "CONFIRMADO" | "CONCLUIDO" | "CANCELADO"
>;

export const SchedulingPopupStatusLabels: Record<
  SchedulingPopupStatus,
  string
> = {
  CONFIRMADO: "Confirmado",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado",
};

interface CalendarDay {
  id: number;
  userId: number;
  localDate: string;
  times: string[] | null;
}

interface CalendarTime {
  id: number;
  time: string;
}

export interface Scheduling {
  id: number;
  calendarDay: CalendarDay;
  calendarTime: CalendarTime;
  contact: Contact;
  observation: string | null;
  createdAt: string | null;
  packageId: number | null;
  serviceId: number[];
  status: SchedulingStatus;
}
export interface SchedulingRequest {
  contactId: number;
  serviceId: number[];
  packageId?: number;
  calendarDayId: number;
  calendarTimeId: number;
}

export interface SchedulingStatusRequest {
  newStatus: SchedulingStatus;
}

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "./contactService";

export const schedulingApi = createApi({
  reducerPath: "schedulingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("@planify/token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Scheduling"],
  endpoints: (builder) => ({
    getActiveSchedulings: builder.query<Scheduling[], void>({
      query: () => "/scheduling/active",
      providesTags: ["Scheduling"],
    }),
    getSchedulingHistory: builder.query<Scheduling[], void>({
      query: () => "/scheduling/history",
      providesTags: ["Scheduling"],
    }),
    searchSchedulingsByContactName: builder.query<Scheduling[], string>({
      query: (name) => `/scheduling/search?name=${encodeURIComponent(name)}`,
      providesTags: ["Scheduling"],
    }),
    createScheduling: builder.mutation<Scheduling, SchedulingRequest>({
      query: (data) => ({
        url: "/scheduling",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Scheduling"],
    }),
    updateSchedulingStatus: builder.mutation<
      Scheduling,
      { id: number; status: SchedulingStatusRequest }
    >({
      query: ({ id, status }) => ({
        url: `/scheduling/${id}/status`,
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ newStatus: status.newStatus }),
      }),
      invalidatesTags: ["Scheduling"],
    }),
    deleteScheduling: builder.mutation<void, number>({
      query: (id) => ({
        url: `/scheduling/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Scheduling"],
    }),
  }),
});

export const {
  useGetActiveSchedulingsQuery,
  useGetSchedulingHistoryQuery,
  useSearchSchedulingsByContactNameQuery,
  useCreateSchedulingMutation,
  useUpdateSchedulingStatusMutation,
  useDeleteSchedulingMutation,
} = schedulingApi;
