"use client";

import React, { ReactNode } from "react";
import "./styles.css";

export default function ButtonIcon({
  label,
  icon,
  image,
  onClick,
  alt = "button icon",
  width,
  height,
  className = "",
  active,
}: {
  label?: string;
  icon?: ReactNode;
  image?: string;
  onClick?: () => void;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  active?: boolean;
}) {
  return (
    <div className={`button-container ${className}`}>
      <button className="ButtonIcon" onClick={onClick}>
        {icon}
        {image && (
          <img
            className="button-image"
            src={image}
            alt={alt}
            width={width}
            height={height}
          />
        )}
      </button>
      {label && <span>{label}</span>}
    </div>
  );
}
