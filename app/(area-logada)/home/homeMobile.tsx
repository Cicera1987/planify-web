"use client";

import Button from "@/app/components/buttons";
import Clients from "@/app/components/assets/images/clients-mobile.png";
import Reporter from "@/app/components/assets/images/reporter-mobile.png";
import Scheduling from "@/app/components/assets/images/scheduling-mobile.png";

import "./styles.css";

import {
  SchedulingPopupStatus,
  useGetActiveSchedulingsQuery,
} from "@/app/services/schedulingService";
import Icon from "@/app/components/assets/icons";
import { useScheduling } from "@/app/hooks/useScheduling";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import { useSchedulingContext } from "@/app/context";
import SchedulingCard from "@/app/components/card/scheduling";
import { useRouter } from "next/navigation";

export default function HomeMobile() {
  const { handleStatusChange, handleTogglePopup, popupItems } = useScheduling();
  const { openPopupId } = useSchedulingContext();
  const router = useRouter();

  const {
    data: activeSchedulings,
    isLoading,
    error,
  } = useGetActiveSchedulingsQuery();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar agendamentos</p>;

  return (
    <div className="scheduling-mobile">
      <div className="container-mobile">
        <div className="container-button-mobile">
          <Button.ButtonIcon image={Scheduling.src} alt="Agenda" />
          <Button.ButtonIcon image={Reporter.src} alt="Relatório" />
        </div>
        <div>
          <Button.ButtonIcon
            image={Clients.src}
            alt="Clientes"
            onClick={() => router.push("/clients")}
          />
        </div>
      </div>

      <h2 className="mobile-section-title">Próximos atendimentos</h2>

      <div className="mobile-cards-container">
        {
          activeSchedulings?.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              Nenhum agendamento encontrado
            </p>
          )
        }
        {activeSchedulings?.map((scheduling) => (
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
