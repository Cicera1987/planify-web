import { formatPhone } from "@/app/utils/formatPhone";
import React from "react";
import Icon from "../assets/icons";
import Button from "../buttons";
import "./styles.css";
import { useRouter } from "next/navigation";
import { useScheduling } from "@/app/hooks/useScheduling";
import { formatDate } from "@/app/utils/formatDates";
import { formatHour } from "@/app/utils/formatHours";
import { Job } from "@/app/services/jobService";
import Image from "next/image";
import { externalImageLoader } from "@/app/utils/externalImageLoader";

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
  const { schedulings } = useScheduling();

  const contactSchedulings = schedulings
    .filter((s) => s.contact?.id === contactDataId?.id)
    .map((svc) => ({
      id: svc.id,
      date: formatDate(svc.calendarDay?.localDate),
      hour: formatHour(svc.calendarTime?.time ?? ""),
      services:
        svc.services && svc.services.length > 0
          ? svc.services.map((srv: Job) => srv.name).join(", ")
          : "",
    }));

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
            <Image
              loader={externalImageLoader}
              src={contactDataId.imageUrl}
              alt={contactDataId.name}
              className="client-image-schedule"
              width={70}
              height={70}   
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
      <div className="appointment-item">
        {(contactSchedulings.length > 0
          ? contactSchedulings
          : [{ id: "empty", date: "", hour: "", services: "" }]
        ).map((scheduling) => (
          <div key={scheduling.id} className="session session-appointments">
            <div className="appointment-header">
              <div className="position-data">
                <Icon.TimeIcon />
                <span>{scheduling.date || ""}</span>
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
                <span>{scheduling.hour || ""}</span>
              </div>
              <div>{scheduling.services || ""}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
