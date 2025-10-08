"use client";

import Button from "@/app/components/buttons";
import ImageClients from "@/app/components/assets/images/clients.png";
import ImageScheduling from "@/app/components/assets/images/schedule.png";

import Icon from "@/app/components/assets/icons";
import { useScheduling } from "@/app/hooks/useScheduling";

import { StatusPopup } from "@/app/components/popup/statusPopup";
import { useRouter } from "next/navigation";
import SchedulingCard from "@/app/components/card/scheduling";
import { SchedulingPopupStatus } from "@/app/services/schedulingService";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function HomeDesktop() {
  const {
    handleStatusChange,
    handleTogglePopup,
    schedulings,
    popupItems,
    isLoading,
  } = useScheduling();

  const { search, openPopupId } = useSelector(
    (state: RootState) => state.scheduling,
  );
  const router = useRouter();

  const listToRender = search.trim() ? schedulings : schedulings;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Icon.Loading size="md" borderWidth="md" />
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="container-button-mobile">
        <Button.ButtonIcon
          image={ImageScheduling.src}
          alt="Agenda"
          onClick={() => router.push("/scheduling")}
        />
        <Button.ButtonIcon
          image={ImageClients.src}
          alt="Clientes"
          onClick={() => router.push("/clients")}
        />
      </div>

      <div className="flex flex-col gap-4 md:w-5/12 max-h-[540px] overflow-y-auto">
        {(!listToRender || listToRender.length === 0) && (
          <p className="text-center text-gray-500 mt-4">
            Nenhum agendamento encontrado
          </p>
        )}
        {listToRender?.map((scheduling) => (
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
                onSelect={(value, sched) => {
                  handleStatusChange(sched.id, value as SchedulingPopupStatus);
                }}
                isOpen={openPopupId === scheduling.id}
                onClose={() => handleTogglePopup(scheduling.id)}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
