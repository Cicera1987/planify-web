"use client";

import Button from "@/app/components/buttons";
import "./styles.css";
import Icon from "@/app/components/assets/icons";
import { useScheduling } from "@/app/hooks/useScheduling";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import SchedulingCard from "@/app/components/card/scheduling";
import { SchedulingPopupStatus } from "@/app/services/schedulingService";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { InfiniteScrollLoader } from "@/app/components/pagination/infiniteScrollLoader";

export default function SchedulingMobile() {
  const {
    handleStatusChange,
    handleTogglePopup,
    schedulings,
    popupItems,
    isLoading,
    observerTarget,
    hasMore
  } = useScheduling();

  const { openPopupId } = useSelector((state: RootState) => state.scheduling);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Icon.Loading size="md" borderWidth="md" />
      </div>
    );
  }

  if (!schedulings || schedulings.length === 0) {
    return (
      <p className="text-center w-full py-6 text-gray-500">
        Nenhum agendamento encontrado
      </p>
    );
  }

  return (
    <div className="main-mobile-scheduling">
      {schedulings.map((scheduling) => (
        <SchedulingCard
          key={scheduling.id}
          data={scheduling}
          triggerIcon={
            <StatusPopup
              trigger={<Button.ButtonIcon icon={<Icon.OptionsIcon />} />}
              items={popupItems.map((item) => ({
                value: item.value,
                label: String(item.label),
                icon: item.icon,
              }))}
              data={scheduling}
              onSelect={(status, sched) =>
                handleStatusChange(sched.id, status as SchedulingPopupStatus)
              }
              isOpen={openPopupId === scheduling.id}
              onClose={() => handleTogglePopup(scheduling.id)}
            />
          }
        />
      ))}
      <InfiniteScrollLoader
        observerTarget={observerTarget}
        isFetching={isLoading}
        hasMore={hasMore}
      />
    </div>
  );
}
