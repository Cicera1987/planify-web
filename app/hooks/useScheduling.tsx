"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSchedulingContext } from "../context/schedulingProvaider";
import Icon from "@/app/components/assets/icons";
import { api } from "@/app/services/api";

export type SchedulingStatus =
  | "AGENDADO"
  | "CONFIRMADO"
  | "REJEITADO"
  | "CANCELADO"
  | "EM_ANDAMENTO"
  | "CONCLUIDO"
  | "NAO_COMPARECEU"
  | "REMARCADO";

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

export interface Contact {
  id: number;
  name: string;
  phone: string;
}

export interface Scheduling {
  id: number;
  contact: Contact;
  status: SchedulingStatus;
  // outros campos que precisar
}

export function useScheduling() {
  const { search, setOpenPopupId } = useSchedulingContext();
  const [schedulings, setSchedulings] = useState < Scheduling[] > ([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!search || !search.trim()) return;
    setIsLoading(true);

    api
      .get < Scheduling[] > (`/scheduling/search?name=${encodeURIComponent(search)}`)
        .then((res) => setSchedulings(res.data))
        .catch((err) => {
          console.error("Erro ao buscar agendamentos", err);
          toast.error("Erro ao buscar agendamentos");
        })
        .finally(() => setIsLoading(false));
  }, [search]);

  async function handleStatusChange(id: number, status: SchedulingPopupStatus) {
    try {
      await api.put(`/scheduling/${id}/status`, new URLSearchParams({ newStatus: status }));
      setSchedulings((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      );
      toast.success("Status atualizado com sucesso");
      setOpenPopupId(null);
    } catch (err) {
      console.error("Erro ao atualizar status", err);
      toast.error("Erro ao atualizar status");
    }
  }

  function handleTogglePopup(id: number) {
    setOpenPopupId((prev: number | null) => (prev === id ? null : id));
  }

  function isStatusEnabled(status: SchedulingPopupStatus) {
    return status === "CONCLUIDO" || status === "CANCELADO";
  }

  const popupItems = Object.entries(SchedulingPopupStatusLabels).map(
    ([value, label]) => {
      let icon = null;
      switch (value) {
        case "CONFIRMADO":
          icon = <Icon.Checked />;
          break;
        case "CONCLUIDO":
          icon = <Icon.NotePad />;
          break;
        case "CANCELADO":
          icon = <Icon.Full />;
          break;
      }
      return {
        value: value as SchedulingPopupStatus,
        label,
        icon,
        isDisabled: !isStatusEnabled(value as SchedulingPopupStatus),
      };
    }
  );

  return {
    schedulings,
    handleStatusChange,
    handleTogglePopup,
    isLoading,
    isStatusEnabled,
    popupItems,
  };
}