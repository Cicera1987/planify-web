"use client";

import React, { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import "./styles.css";

interface ClientCardProps {
  image: string | StaticImageData;
  name: string;
  email: string | undefined;
  whatsapp: string;
  triggerIcon: ReactNode;
  onTriggerClick?: () => void;
}

export default function ClientCard({
  image,
  name,
  email,
  whatsapp,
  triggerIcon,
  onTriggerClick,
}: ClientCardProps) {
  return (
    <div className="client-card">
      <div className="client-image">
        <Image src={image} alt={name} fill className="client-img" />
      </div>
      <div className="client-info">
        <button className="client-trigger" onClick={onTriggerClick}>
          {triggerIcon}
        </button>

        <div className="client-text">
          <h3 className="client-name">{name}</h3>
          <p className="client-title">
            E-mail: <span className="client-text">{email}</span>
          </p>
          <p className="client-title">
            WhatsApp: <span className="client-text">{whatsapp}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
