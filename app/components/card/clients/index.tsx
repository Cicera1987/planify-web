"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import avatar from "@/app/components/assets/images/avatar.png";
import "./styles.css";
import Icon from "../../assets/icons";
import { formatPhone } from "@/app/utils/formatPhone";
import { Contact } from "@/app/services/contactService";

interface ClientCardProps {
  data: Contact;
  triggerIcon: ReactNode;
  onTriggerClick?: () => void;
}

export default function ClientCard({
  data,
  triggerIcon,
  onTriggerClick,
}: ClientCardProps) {
  return (
    <div className="client-card">
      <div className="client-image">
        <img
          src={
            data.imageUrl && data.imageUrl.startsWith("http")
              ? data.imageUrl
              : avatar.src
          }
          alt={data.name}
          className="client-img"
        />
      </div>

      <div className="client-info">
        <div className="client-header">
          <h3 className="client-name">{data.name}</h3>
          <div className="client-trigger" onClick={onTriggerClick}>
            {triggerIcon}
          </div>
        </div>

        <div className="client-details">
          <p className="client-title">
            E-mail: <span className="client-email">{data.email}</span>
          </p>
          <p className="client-title">
            <Icon.Whatsapp />{" "}
            <span className="client-text">{formatPhone(data.phone)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
