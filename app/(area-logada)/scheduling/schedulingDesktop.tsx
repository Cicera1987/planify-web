"use client";

import Button from "@/app/components/buttons";
import ImageClients from "@/app/components/assets/images/clients.png";
import ImageReporter from "@/app/components/assets/images/reporter.png";
import ImageScheduling from "@/app/components/assets/images/scheduling.png";

import {
  SchedulingPopupStatus,
  SchedulingPopupStatusLabels,
  useGetActiveSchedulingsQuery,
} from "@/app/services/schedulingService";

import Icon from "@/app/components/assets/icons";
import { useScheduling } from "@/app/hooks/useScheduling";
import { useSchedulingContext } from "@/app/context";
import SchedulingCard from "@/app/components/card/scheduling";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import { useRouter } from "next/navigation";

export default function SchedulingDesktop() {
  const { handleStatusChange, handleTogglePopup, schedulings, popupItems } =
    useScheduling();
  const { search, openPopupId } = useSchedulingContext();
  const router = useRouter();

  const {
    data: activeSchedulings,
    isLoading,
    error,
  } = useGetActiveSchedulingsQuery();

  const listToRender = search.trim()
    ? (schedulings ?? [])
    : (activeSchedulings ?? []);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar agendamentos</p>;

  return (
    <div className="main-container">
      <div className="flex flex-col gap-4 h-full">
        <Button.ButtonIcon
          image={ImageScheduling.src}
          alt="Imagem agendas"
          className="flex-[1] w-full"
        />
        <Button.ButtonIcon
          image={ImageReporter.src}
          alt="Imagem relatórios"
          className="flex-[1] w-full"
        />
        <Button.ButtonIcon
          image={ImageClients.src}
          alt="Imagem clientes"
          className="flex-[1.5] w-full"
          onClick={() => router.push("/clients")}
        />
      </div>

      <div className="flex flex-col gap-4 md:w-5/12 max-h-[540px] overflow-y-auto">
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
                onSelect={(status, sched) => {
                  handleStatusChange(sched.id, status as SchedulingPopupStatus);
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
