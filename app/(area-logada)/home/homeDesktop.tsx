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
import { InfiniteScrollLoader } from "@/app/components/pagination/infiniteScrollLoader";

export default function HomeDesktop() {
  const {
    handleStatusChange,
    handleTogglePopup,
    schedulings,
    popupItems,
    isLoading,
    observerTarget,
    hasMore
  } = useScheduling({ showHistory: false });

  const { search, openPopupId } = useSelector(
    (state: RootState) => state.scheduling,
  );
  const router = useRouter();
  const listToRender = schedulings.filter(
    scheduling => scheduling.contact.name
      .toLowerCase()
      .includes(search.toLowerCase()));


  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Icon.Loading size="md" borderWidth="md" />
      </div>
    );
  }
  return (
    <div className="main-container scroll-box">
      <div className="flow-container">
        <div className="buttons-container">
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

        {(!listToRender || listToRender.length === 0) && (
          <p className="text-start text-gray-500 w-full">
            Nenhum agendamento encontrado
          </p>
        )}

        {listToRender?.map((scheduling) => (
          <SchedulingCard
            key={scheduling.id}
            data={scheduling}
            className="scheduling-card-home"
            onClick={() => router.push(`/contact/${scheduling.contact.id}/schedule`)}
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
        <InfiniteScrollLoader
          observerTarget={observerTarget}
          isFetching={isLoading}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
}
