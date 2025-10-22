"use client";

import React, { ReactNode, MouseEventHandler } from "react";
import "./styles.css";

type ButtonVariant = "icon" | "headerIcon" | "text" | "filled" | "info";

interface ButtonProps {
  text?: string;
  icon?: ReactNode;
  headerIcon?: ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

export default function ButtonVariant({
  text,
  icon,
  headerIcon,
  variant = "icon",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`Button ${variant} ${className}`}
      disabled={disabled}
    >
      {icon && <span className="Button-icon">{icon}</span>}
      {headerIcon && <span className="Button-headerIcon">{icon}</span>}
      {text && <span className="Button-text">{text}</span>}
    </button>
  );
}
