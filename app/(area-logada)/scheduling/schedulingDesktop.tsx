"use client";

import Button from "@/app/components/buttons";
import ImageClients from "@/app/components/assets/images/clients.png";
import ImageReporter from "@/app/components/assets/images/reporter.png";
import ImageScheduling from "@/app/components/assets/images/scheduling.png";
import ClientCard from "@/app/components/card";
import "./styles.css";
import { useGetActiveSchedulingsQuery } from "@/app/services/schedulingService";
import avatar from "@/app/components/assets/images/avatar.png";
import Icon from "@/app/components/assets/icons";

export default function SchedulingDesktop() {
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
    <div className="scheduling-desktop">
      <div className="main-container">
        <div className="buttons-container">
          <Button.ButtonIcon
            image={ImageScheduling.src}
            alt="Imagem da agendas"
          />
          <Button.ButtonIcon
            image={ImageReporter.src}
            alt="Imagem dos relatórios"
          />
          <Button.ButtonIcon
            image={ImageClients.src}
            alt="Imagem dos clientes"
          />
        </div>

        <div className="cards-container">
          {activeSchedulings?.map((scheduling) => (
            <ClientCard
              key={scheduling.id}
              image={scheduling.contact?.imageUrl || avatar.src}
              name={scheduling.contact?.name}
              email={scheduling.contact?.email}
              whatsapp={scheduling.contact?.phone}
              triggerIcon={<Icon.OptionsIcon />}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
