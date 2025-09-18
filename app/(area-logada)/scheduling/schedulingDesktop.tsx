"use client";

import Button from "@/app/components/buttons";
import ImageClients from "@/app/components/assets/images/clients.png";
import ImageReporter from "@/app/components/assets/images/reporter.png";
import ImageScheduling from "@/app/components/assets/images/scheduling.png";
import ClientCard from "@/app/components/card";
import "./styles.css";
import {
  SchedulingPopupStatus,
  useGetActiveSchedulingsQuery,
} from "@/app/services/schedulingService";

import Icon from "@/app/components/assets/icons";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import { useScheduling } from "@/app/hooks/useScheduling";
import { useSchedulingContext } from "@/app/context";

export default function SchedulingDesktop() {
  const { handleStatusChange, handleTogglePopup, schedulings } =
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
          {listToRender?.map((scheduling) => (
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
    </div>
  );
}
