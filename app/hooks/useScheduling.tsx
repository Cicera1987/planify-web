"use client";

import {
  useSearchSchedulingsByContactNameQuery,
  useUpdateSchedulingStatusMutation,
  SchedulingPopupStatus,
  SchedulingStatus,
  SchedulingPopupStatusLabels,
} from "@/app/services/schedulingService";
import { toast } from "react-toastify";
import { useSchedulingContext } from "../context";
import { ReactNode } from "react";
import Icon from "@/app/components/assets/icons";

export function useScheduling() {
  const [updateStatus, { isLoading }] = useUpdateSchedulingStatusMutation();
  const { search, setOpenPopupId } = useSchedulingContext();

  const { data: schedulings } = useSearchSchedulingsByContactNameQuery(search, {
    skip: !search.trim().length,
  });

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

  const popupItems = Object.entries(SchedulingPopupStatusLabels).map(
    ([value, label]) => {
      let icon: ReactNode;

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
        default:
          icon = null;
      }

      return {
        value: value as SchedulingPopupStatus,
        label: label,
        icon: icon,
        isDisabled: !isStatusEnabled(value as SchedulingPopupStatus),
      };
    },
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
