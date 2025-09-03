"use client";

import Button from "@/app/components/buttons";
import Clients from "@/app/components/assets/images/clients-mobile.png";
import Reporter from "@/app/components/assets/images/reporter-mobile.png";
import Scheduling from "@/app/components/assets/images/scheduling-mobile.png";
import ClientCard from "@/app/components/card";
import avatar from "@/app/components/assets/images/avatar.png";
import "./styles.css";

import { useGetActiveSchedulingsQuery } from "@/app/services/schedulingService";
import Icon from "@/app/components/assets/icons";

export default function SchedulingMobile() {
  const {
    data: activeSchedulings,
    isLoading,
    error,
  } = useGetActiveSchedulingsQuery();

  function handlerTriggerClick() {
    console.log("Trigger clicked");
  }

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
            image={scheduling.contact.imageUrl || avatar.src}
            name={scheduling.contact.name}
            email={scheduling.contact.email}
            whatsapp={scheduling.contact.phone}
            triggerIcon={<Icon.OptionsIcon />}
          />
        ))}
      </div>
    </div>
  );
}
