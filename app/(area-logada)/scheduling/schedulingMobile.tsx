"use client";

import Button from "@/app/components/buttons";
import Clients from "@/app/components/assets/images/clients-mobile.png";
import Reporter from "@/app/components/assets/images/reporter-mobile.png";
import Scheduling from "@/app/components/assets/images/scheduling-mobile.png";
import ClientCard from "@/app/components/card";
import "./styles.css";

import {
  SchedulingPopupStatus,
  useGetActiveSchedulingsQuery,
} from "@/app/services/schedulingService";
import Icon from "@/app/components/assets/icons";
import { useScheduling } from "@/app/hooks/useScheduling";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import { useSchedulingContext } from "@/app/context";

export default function SchedulingMobile() {
  const { handleStatusChange, handleTogglePopup } = useScheduling();
  const { openPopupId } = useSchedulingContext();

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
          <Button.ButtonIcon image={Clients.src} alt="Clientes" />
        </div>
      </div>

      <h2 className="mobile-section-title">Próximos atendimentos</h2>

      <div className="mobile-cards-container">
        {activeSchedulings?.map((scheduling) => (
          <ClientCard
            key={scheduling.id}
            data={scheduling}
            triggerIcon={
              <StatusPopup
                trigger={<Button.ButtonIcon icon={<Icon.OptionsIcon />} />}
                onSelect={(status: SchedulingPopupStatus) =>
                  handleStatusChange(scheduling.id, status)
                }
                isOpen={openPopupId === scheduling.id}
                onClose={() => handleTogglePopup(scheduling.id)}
                scheduling={scheduling}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
