"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import avatar from "@/app/components/assets/images/avatar.png";
import "./styles.css";
import { Scheduling } from "@/app/services/schedulingService";
import Icon from "../../assets/icons";
import { formatDate } from "@/app/utils/formatDate";
import { formatHours } from "@/app/utils/formatHours";
import { formatPhone } from "@/app/utils/formatPhone";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
interface SchedulingCardProps {
  data: DeepPartial<Scheduling>;
  triggerIcon: ReactNode;
  onTriggerClick?: () => void;
  className?: string;
}

export default function SchedulingCard({
  data,
  triggerIcon,
  onTriggerClick,
}: SchedulingCardProps) {
  const { contact, calendarTime, calendarDay, status } = data;

  return (
    <div className="scheduling-card">
      <div className="scheduling-image">
        <Image
          src={
            data.contact?.imageUrl && data.contact.imageUrl.startsWith("http")
              ? data.contact.imageUrl
              : avatar.src
          }
          alt={contact?.name || "Avatar"}
          fill
          className="scheduling-img"
        />
      </div>

      <div className="scheduling-info">
        <button className="scheduling-trigger" onClick={onTriggerClick}>
          {triggerIcon}
        </button>

        <div className="scheduling-text">
          <div className="header-name">
            <h3 className="scheduling-name">{contact?.name}</h3>
            <span className="scheduling-date">
              {formatDate(calendarDay?.localDate ?? null)}
            </span>
          </div>

          <div className="header-name">
            <p className="scheduling-title">
              E-mail: <span className="scheduling-email">{contact?.email}</span>
            </p>
            <p className="scheduling-title">
              Horário:{" "}
              <span className="scheduling-text">
                {formatHours(calendarTime?.time ?? "")}
              </span>
            </p>
          </div>

          <div className="header-name">
            <p className="scheduling-title">
              <Icon.Whatsapp />{" "}
              <span className="scheduling-text">
                {formatPhone(contact?.phone || "")}
              </span>
            </p>
            <p className="scheduling-status">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
