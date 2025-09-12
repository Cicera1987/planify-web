"use client";

import {
  useSearchSchedulingsByContactNameQuery,
  useUpdateSchedulingStatusMutation,
  SchedulingPopupStatus,
  SchedulingStatus,
} from "@/app/services/schedulingService";
import { toast } from "react-toastify";
import { useSchedulingContext } from "../context";

export function useScheduling() {
  const [updateStatus, { isLoading }] = useUpdateSchedulingStatusMutation();
  const { search, setOpenPopupId } = useSchedulingContext();

  const { data: schedulings } = useSearchSchedulingsByContactNameQuery(search, {
    skip: !search.trim().length,
  });

  function getStatusStyle(
    status: SchedulingPopupStatus,
    schedulingStatus: SchedulingStatus,
  ) {
    if (status === "CONFIRMADO")
      return schedulingStatus === "CONFIRMADO" ? "btn-blue" : "btn-gray";
    if (status === "CONCLUIDO") return "btn-green";
    if (status === "CANCELADO") return "btn-red";
    return "";
  }

  async function handleStatusChange(id: number, status: SchedulingPopupStatus) {
    try {
      const payload = { newStatus: status };
      await updateStatus({ id, status: payload }).unwrap();
      toast.success("Status atualizado com sucesso");
      setOpenPopupId(null);
    } catch (error) {
      toast.error("Erro ao atualizar status");
      console.error("Erro ao atualizar status", error);
    }
  }

  function handleTogglePopup(id: number) {
    setOpenPopupId((prev) => (prev === id ? null : id));
  }

  function isStatusEnabled(status: SchedulingPopupStatus) {
    return status === "CONCLUIDO" || status === "CANCELADO";
  }

  return {
    schedulings,
    handleStatusChange,
    handleTogglePopup,
    isLoading,
    isStatusEnabled,
    getStatusStyle,
  };
}
