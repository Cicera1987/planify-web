"use client";

import Button from "@/app/components/buttons";
import {
  SchedulingPopupStatus,
  useGetActiveSchedulingsQuery,
} from "@/app/services/schedulingService";

import Icon from "@/app/components/assets/icons";
import { useScheduling } from "@/app/hooks/useScheduling";
import { useSchedulingContext } from "@/app/context";
import SchedulingCard from "@/app/components/card/scheduling";
import { StatusPopup } from "@/app/components/popup/statusPopup";

export default function SchedulingDesktop() {
  const { handleStatusChange, handleTogglePopup, schedulings, popupItems } =
    useScheduling();
  const { search, openPopupId } = useSchedulingContext();

  const {
    data: activeSchedulings,
    isLoading,
    error,
  } = useGetActiveSchedulingsQuery();

  const listToRender = search.trim()
    ? (schedulings ?? [])
    : (activeSchedulings ?? []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Icon.Loading size="md" borderWidth="md" />
      </div>
    );
  }

  if (error) return <p>Erro ao carregar agendamentos</p>;

  return (
    <div>
      {listToRender.length === 0 ? (
        <p className="text-center w-full py-6 text-gray-500">
          Nenhum agendamento encontrado
        </p>
      ) : (
          <div className="main-desktop-scheduling">
        <div className="cards-container-scheduling">
          {listToRender.map((scheduling) => (
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
                  onSelect={(status, sched) => {
                    handleStatusChange(
                      sched.id,
                      status as SchedulingPopupStatus
                    );
                  }}
                  isOpen={openPopupId === scheduling.id}
                  onClose={() => handleTogglePopup(scheduling.id)}
                />
              }
            />
          ))}
        </div>
          </div>
      )}
    </div>
  )}