"use client";
import "./styles.css";
import { useContact } from "@/app/hooks/useContact";
import { ScheduleContact } from "@/app/components/schedule";

export default function ScheduleServiceDesktop({
  contactId,
}: {
  contactId?: number;
}) {
  const { contactDataId } = useContact(contactId);

  return (
    <div className="schedule-container">
      <div className="desktop-schedule">
        <div className="background-schedule-dark"></div>
        <div className="background-schedule-light">
          <div className="light-schedule-header">
            <h1 className="app-schedule-title">Agendamento</h1>
          </div>
        </div>

        <div className="form-schedule-container">
          <ScheduleContact contactDataId={contactDataId} />
        </div>
      </div>
    </div>
  );
}
