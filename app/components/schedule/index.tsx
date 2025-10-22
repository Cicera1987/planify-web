import { formatPhone } from "@/app/utils/formatPhone";
import React from "react";
import Icon from "../assets/icons";
import Button from "../buttons";
import "./styles.css";
import { useRouter } from "next/navigation";

interface ContactData {
  id: number;
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  imageUrl?: string;
}

interface ContactContainerProps {
  contactDataId: ContactData | null;
}

export const ScheduleContact: React.FC<ContactContainerProps> = ({
  contactDataId,
}) => {
  const router = useRouter();
  const openWhatsApp = () => {
    if (contactDataId?.phone) {
      window.open(`https://wa.me/${contactDataId.phone}`, "_blank");
    }
  };

  const openEmail = () => {
    if (contactDataId?.email) {
      window.open(`mailto:${contactDataId.email}`, "_blank");
    }
  };

  return (
    <div className="schedule-contact scrollbar-hide">
      <div className="session session-client">
        <p className="client-name-schedule">{contactDataId?.name}</p>

        <div className="client-info-schedule">
          {contactDataId?.imageUrl && (
            <img
              src={contactDataId.imageUrl}
              alt={contactDataId.name}
              className="client-image-schedule"
            />
          )}
          <span className="client-phone-schedule" onClick={openWhatsApp}>
            <Icon.Whatsapp />
            {formatPhone(contactDataId?.phone || "")}
          </span>
        </div>

        {contactDataId?.gender && (
          <p className="client-gender-schedule">
            {contactDataId.gender.charAt(0).toUpperCase() +
              contactDataId.gender.slice(1).toLowerCase()}
          </p>
        )}
      </div>
      <div className="session session-actions">
        <div className="button-group">
          <Button.ButtonVariant
            type="button"
            variant="info"
            text="Informações"
            onClick={() => router.push(`/contact/${contactDataId?.id}/edit`)}
          />
          <Button.ButtonVariant
            type="button"
            variant="filled"
            text="Agendamento"
            onClick={() =>
              router.push(`/contact/${contactDataId?.id}/attendance`)
            }
          />
        </div>

        <Button.ButtonVariant
          type="button"
          variant="icon"
          text={formatPhone(contactDataId?.phone || "")}
          icon={<Icon.ContactPhone />}
          onClick={openWhatsApp}
        />
        <Button.ButtonVariant
          type="button"
          variant="icon"
          text={contactDataId?.email}
          icon={<Icon.ContactEmail />}
          onClick={openEmail}
        />
      </div>
      <div className="session session-appointments">
        <div className="appointment-header">
          <div className="position-data">
            <Icon.TimeIcon /> <span>22 de Dezembro</span>
          </div>
          <Button.ButtonIcon
            icon={<Icon.Follow />}
            onClick={() =>
              router.push(`/contact/${contactDataId?.id}/attendance`)
            }
          />
        </div>

        <div className="appointment-details">
          <div className="position-data">
            <Icon.DateIcon />
            <span>14:30</span>
          </div>
          <div>Manicure</div>
        </div>
      </div>
    </div>
  );
};
