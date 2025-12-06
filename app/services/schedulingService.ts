import { api } from "./api";
import { Contact } from "./contactService";
import { Job } from "./jobService";
import { Package } from "./packagesService";

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
  CONCLUIDO: "Finalizar atendimento",
  CANCELADO: "Cancelar atendimento",
};

export interface PaginatedResponse<T> {
  content: T[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  apiVersion?: string
}
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
  packageInfo: Package | null; 
  clientPackageInfo?: Package | null;
  services: Job[];
  status: SchedulingStatus;
}

export interface SchedulingRequest {
  contactId: number;
  serviceId: number[];
  packageId?: number;
  clientPackageId?: number;
  calendarDayId: number;
  calendarTimeId: number;
}
export interface SchedulingStatusRequest {
  newStatus: SchedulingStatus;
}

export const getActiveSchedulings = async (
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<Scheduling>> => {
  const res = await api.get<PaginatedResponse<Scheduling>>(
    `/scheduling/active?page=${page}&size=${size}`
  );
  return res.data;
};

export const getSchedulingHistory = async (
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<Scheduling>> => {
  const res = await api.get<PaginatedResponse<Scheduling>>(
    `/scheduling/history?page=${page}&size=${size}`
  );
  return res.data;
};

export const searchSchedulingsByContactName = async (
  name: string,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<Scheduling>> => {
  const res = await api.get<PaginatedResponse<Scheduling>>(
    `/scheduling/search?name=${encodeURIComponent(name)}&page=${page}&size=${size}`
  );
  return res.data;
};

export const createScheduling = async (
  data: SchedulingRequest,
): Promise<Scheduling> => {
  const res = await api.post<Scheduling>("/scheduling", data);
  return res.data;
};

export const updateSchedulingStatus = async (
  id: number,
  status: SchedulingStatusRequest,
): Promise<Scheduling> => {
  const params = new URLSearchParams({ newStatus: status.newStatus });
  const res = await api.put<Scheduling>(
    `/scheduling/${id}/status`,
    params.toString(),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );
  return res.data;
};

export const deleteScheduling = async (id: number): Promise<void> => {
  await api.delete(`/scheduling/${id}`);
};
