"use client";

import React, { ReactNode } from "react";
import "./styles.css";

export default function ButtonIcon({
  label,
  icon,
  onClick,
}: {
  label?: string;
  icon?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className="button-container">
      <button className="ButtonIcon" onClick={onClick}>
        {icon}
      </button>
      <span>{label}</span>
    </div>
  );
}
