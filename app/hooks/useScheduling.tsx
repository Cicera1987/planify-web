"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useCallback, useMemo } from "react";
import {
  fetchSchedulings,
  updateSchedulingStatus,
  setOpenPopupId,
} from "@/app/store/features/schedulingSlice";
import { SchedulingPopupStatus, SchedulingPopupStatusLabels } from "@/app/services/schedulingService";
import Icon from "@/app/components/assets/icons";
import { toast } from "react-toastify";

export function useScheduling() {
  const dispatch = useDispatch < AppDispatch > ();
  const { schedulings, search, openPopupId, isLoading } = useSelector(
    (state: RootState) => state.scheduling
  );

  const handleFetch = useCallback(() => {
    if (!search.trim()) return;
    dispatch(fetchSchedulings(search));
  }, [dispatch, search]);

  const handleStatusChange = useCallback(
    async (id: number, status: SchedulingPopupStatus) => {
      try {
        await dispatch(updateSchedulingStatus({ id, newStatus: status })).unwrap();
        toast.success("Status atualizado com sucesso");
        dispatch(setOpenPopupId(null));
      } catch {
        toast.error("Erro ao atualizar status");
      }
    },
    [dispatch]
  );

  const handleTogglePopup = useCallback(
    (id: number) => {
      dispatch(setOpenPopupId(openPopupId === id ? null : id));
    },
    [dispatch, openPopupId]
  );

  const popupItems = useMemo(
    () =>
      Object.entries(SchedulingPopupStatusLabels).map(([value, label]) => {
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
        };
      }),
    []
  );

  return {
    schedulings,
    isLoading,
    handleFetch,
    handleStatusChange,
    handleTogglePopup,
    popupItems,
    openPopupId,
  };
}
