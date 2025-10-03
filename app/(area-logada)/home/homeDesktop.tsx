"use client";

import Button from "@/app/components/buttons";
import ImageClients from "@/app/components/assets/images/clients.png";
import ImageReporter from "@/app/components/assets/images/reporter.png";
import ImageScheduling from "@/app/components/assets/images/scheduling.png";

import {
  SchedulingPopupStatus,
  useGetActiveSchedulingsQuery,
} from "@/app/services/schedulingService";

import Icon from "@/app/components/assets/icons";
import { useScheduling } from "@/app/hooks/useScheduling";
import { useSchedulingContext } from "@/app/context";
import SchedulingCard from "@/app/components/card/scheduling";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import { useRouter } from "next/navigation";

export default function HomeDesktop() {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Icon.Loading size="md" borderWidth="md" />
      </div>
    );
  }
  if (error) return <p>Erro ao carregar agendamentos</p>;

  return (
    <div className="main-container">
      <div className="flex flex-col gap-4 h-full">
        <Button.ButtonIcon
          image={ImageScheduling.src}
          alt="Imagem agendas"
          className="flex-[1] w-full"
          onClick={() => router.push("/scheduling")}
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
        {
          listToRender?.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              Nenhum agendamento encontrado
            </p>
          )
        }
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
