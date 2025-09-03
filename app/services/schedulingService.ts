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

export interface Scheduling {
  id: number;
  contact: Contact;
  serviceId: number[];
  packageId?: number;
  calendarTimeId: number;
  status: SchedulingStatus;
  createdAt: string;
}

export interface SchedulingRequest {
  contactId: number;
  serviceId: number[];
  packageId?: number;
  calendarDayId: number;
  calendarTimeId: number;
}

export interface SchedulingStatusRequest {
  status: SchedulingStatus;
}

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "./contactService";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

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
  endpoints: (builder) => ({
    getActiveSchedulings: builder.query<Scheduling[], void>({
      query: () => "/scheduling/active",
    }),
    getSchedulingHistory: builder.query<Scheduling[], void>({
      query: () => "/scheduling/history",
    }),
    createScheduling: builder.mutation<Scheduling, SchedulingRequest>({
      query: (data) => ({
        url: "/scheduling",
        method: "POST",
        body: data,
      }),
    }),
    updateSchedulingStatus: builder.mutation<
      Scheduling,
      { id: number; status: SchedulingStatusRequest }
    >({
      query: ({ id, status }) => ({
        url: `/scheduling/${id}/status`,
        method: "PUT",
        body: status,
      }),
    }),
    deleteScheduling: builder.mutation<void, number>({
      query: (id) => ({
        url: `/scheduling/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetActiveSchedulingsQuery,
  useGetSchedulingHistoryQuery,
  useCreateSchedulingMutation,
  useUpdateSchedulingStatusMutation,
  useDeleteSchedulingMutation,
} = schedulingApi;
