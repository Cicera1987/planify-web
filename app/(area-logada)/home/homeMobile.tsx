"use client";

import Button from "@/app/components/buttons";
import Clients from "@/app/components/assets/images/clients-mobile.png";
import Reporter from "@/app/components/assets/images/reporter-mobile.png";
import Scheduling from "@/app/components/assets/images/scheduling-mobile.png";

import "./styles.css";

import Icon from "@/app/components/assets/icons";
import { useScheduling } from "@/app/hooks/useScheduling";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import { useSchedulingContext } from "@/app/context/schedulingProvaider";
import SchedulingCard from "@/app/components/card/scheduling";
import { useRouter } from "next/navigation";
import { SchedulingPopupStatus } from "@/app/services/schedulingService";

export default function HomeMobile() {
  const {
    handleStatusChange,
    handleTogglePopup,
    popupItems,
    schedulings,
    isLoading,
  } = useScheduling();
  const { openPopupId } = useSchedulingContext();
  const router = useRouter();

  if (isLoading) return <p>Carregando...</p>;

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
        {(!schedulings || schedulings.length === 0) && (
          <p className="text-center text-gray-500 mt-4">
            Nenhum agendamento encontrado
          </p>
        )}

        {schedulings?.map((scheduling) => (
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
