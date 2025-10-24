"use client";

import React, { ReactNode } from "react";
import avatar from "@/app/components/assets/images/avatar.png";
import "./styles.css";
import { Scheduling } from "@/app/services/schedulingService";
import Icon from "../../assets/icons";
import { formatDate } from "@/app/utils/formatDates";
import { formatHour } from "@/app/utils/formatHours";
import { formatPhone } from "@/app/utils/formatPhone";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
interface SchedulingCardProps {
  data: DeepPartial<Scheduling>;
  triggerIcon: ReactNode;
  onTriggerClick?: () => void;
  className?: string;
  onClick?: () => void;
}

export default function SchedulingCard({
  data,
  triggerIcon,
  onTriggerClick,
  className,
  onClick,
}: SchedulingCardProps & { onClick?: () => void }) {
  const { contact, calendarTime, calendarDay, status, services } = data;

  return (
    <div className={`scheduling-card ${className || ""}`} onClick={onClick}>
      <div className="scheduling-image">
        <img
          src={
            data.contact?.imageUrl && data.contact.imageUrl.startsWith("http")
              ? data.contact.imageUrl
              : avatar.src
          }
          alt={contact?.name || "Avatar"}
          className="scheduling-img"
        />
      </div>

      <div className="scheduling-info">
        <div className="scheduling-trigger" 
        onClick={(e)=>{
          e.stopPropagation();
          if(onTriggerClick){
            onTriggerClick();
          }
        }}>
          {triggerIcon}
        </div>

        <div className="scheduling-text">
          <div className="header-name">
            <h3 className="scheduling-name">{contact?.name}</h3>
            <span className="scheduling-date">
              {formatDate(calendarDay?.localDate ?? null)}
            </span>
          </div>

          <div className="header-name">
            <p className="scheduling-title">
              Horário:{" "}
              <span className="scheduling-text">
                {formatHour(calendarTime?.time ?? "")}
              </span>
            </p>
            <p className="scheduling-status">{status}</p>
          </div>

          <div className="header-name">
            <p className="scheduling-title">
              <Icon.Whatsapp />{" "}
              <span className="scheduling-text">
                {formatPhone(contact?.phone || "")}
              </span>
            </p>
            <p className="scheduling-title">
              <span className="scheduling-text">
                {services && services.length > 0
                  ? services.map((srv) => srv?.name).join(", ")
                  : ""}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
