"use client";

import React, { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import avatar from "@/app/components/assets/images/avatar.png";
import "./styles.css";
import { Scheduling } from "@/app/services/schedulingService";
import Icon from "../assets/icons";
import { formatDate } from "@/app/utils/formatDate";
import { formatHours } from "@/app/utils/formatHours";
import { formatPhone } from "@/app/utils/formatPhone";

interface ClientCardProps {
  data: Scheduling;
  triggerIcon: ReactNode;
  onTriggerClick?: () => void;
}

export default function ClientCard({
  data,
  triggerIcon,
  onTriggerClick,
}: ClientCardProps) {
  const { contact, calendarTime, calendarDay, status } = data;

  return (
    <div className="client-card">
      <div className="client-image">
        <Image
          src={contact.imageUrl ?? avatar.src}
          alt={contact.name}
          fill
          className="client-img"
        />
      </div>

      <div className="client-info">
        <button className="client-trigger" onClick={onTriggerClick}>
          {triggerIcon}
        </button>

        <div className="client-text">
          <div className="header-name">
            <h3 className="client-name">{contact.name}</h3>
            <span className="client-date">
              {formatDate(calendarDay.localDate)}
            </span>
          </div>

          <div className="header-name">
            <p className="client-title">
              E-mail: <span className="client-email">{contact.email}</span>
            </p>
            <p className="client-title">
              Horário:{" "}
              <span className="client-text">
                {formatHours(calendarTime.time)}
              </span>
            </p>
          </div>

          <div className="header-name">
            <p className="client-title">
              <Icon.Whatsapp />{" "}
              <span className="client-text">{formatPhone(contact.phone)}</span>
            </p>
            <p className="client-status">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
