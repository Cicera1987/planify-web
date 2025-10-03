import { api } from "./api";
import { Contact } from "./contactService";

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

export const getActiveSchedulings = async (): Promise<Scheduling[]> => {
  const res = await api.get<Scheduling[]>("/scheduling/active");
  return res.data;
};

export const getSchedulingHistory = async (): Promise<Scheduling[]> => {
  const res = await api.get<Scheduling[]>("/scheduling/history");
  return res.data;
};

export const searchSchedulingsByContactName = async (
  name: string
): Promise<Scheduling[]> => {
  const res = await api.get<Scheduling[]>(
    `/scheduling/search?name=${encodeURIComponent(name)}`
  );
  return res.data;
};

export const createScheduling = async (
  data: SchedulingRequest
): Promise<Scheduling> => {
  const res = await api.post<Scheduling>("/scheduling", data);
  return res.data;
};

export const updateSchedulingStatus = async (
  id: number,
  status: SchedulingStatusRequest
): Promise<Scheduling> => {
  const params = new URLSearchParams({ newStatus: status.newStatus });
  const res = await api.put<Scheduling>(`/scheduling/${id}/status`, params.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res.data;
};

export const deleteScheduling = async (id: number): Promise<void> => {
  await api.delete(`/scheduling/${id}`);
};
