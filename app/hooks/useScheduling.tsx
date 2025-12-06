"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useCallback, useMemo, useRef } from "react";
import {
  updateSchedulingStatus,
  setOpenPopupId,
} from "@/app/store/features/schedulingSlice";
import {
  SchedulingPopupStatus,
  SchedulingPopupStatusLabels,
  deleteScheduling,
  searchSchedulingsByContactName,
  getActiveSchedulings,
  getSchedulingHistory,
  Scheduling
} from "@/app/services/schedulingService";
import { useInfiniteScroll } from "@/app/hooks/useInfiniteScroll";
import Icon from "@/app/components/assets/icons";
import { toast } from "react-toastify";

export function useScheduling({ showHistory = false }: { showHistory?: boolean } = {}) {
  const dispatch = useDispatch < AppDispatch > ();
  const { search, openPopupId } = useSelector(
    (state: RootState) => state.scheduling
  );

  const observerTarget = useRef < HTMLDivElement > (null);

  const {
    data: schedulings,
    isFetching,
    hasMore,
    reset
  } = useInfiniteScroll < Scheduling > ({
    fetchFn: useCallback(
      async (page: number) => {

        let response;

        if (search.trim()) {
          response = await searchSchedulingsByContactName(search, page);
        } else if (showHistory) {
          response = await getSchedulingHistory(page);
        } else {
          response = await getActiveSchedulings(page);
        }
        return response.content;
      },
      [search, showHistory]
    ),
  });

  const handleStatusChange = useCallback(
    async (id: number, status: SchedulingPopupStatus) => {
      try {
        if (status === "CANCELADO") {
          await deleteScheduling(id);
          toast.info("Atendimento cancelado e removido");
        } else {
          await dispatch(
            updateSchedulingStatus({ id, newStatus: status })
          ).unwrap();
          toast.success("Status atualizado com sucesso");
        }

        dispatch(setOpenPopupId(null));
        reset();
      } catch {
        toast.error("Erro ao atualizar status");
      }
    },
    [dispatch, reset, openPopupId]
  );

  const handleTogglePopup = useCallback(
    (id: number) => {
      dispatch(setOpenPopupId(openPopupId === id ? null : id));
    },
    [dispatch, openPopupId]
  );

  const filteredSchedulings = useMemo(() => {
    const list = Array.isArray(schedulings) ? schedulings : [];

    return list.filter((sts) => {
      const status = sts.status?.toUpperCase();
      return status === "AGENDADO" || status === "CONFIRMADO";
    });
  }, [schedulings]);

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
    schedulings: filteredSchedulings,
    isLoading: isFetching,
    handleStatusChange,
    handleTogglePopup,
    popupItems,
    openPopupId,
    observerTarget,
    hasMore,
  };
}