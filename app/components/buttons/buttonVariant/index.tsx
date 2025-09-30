"use client";

import React, { ReactNode, MouseEventHandler } from "react";
import "./styles.css";

type ButtonVariant = "icon" | "text" | "filled";

interface ButtonProps {
  text?: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function ButtonVariant({
  text,
  icon,
  variant = "icon",
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`Button ${variant} ${className}`}
    >
      {icon && <span className="Button-icon">{icon}</span>}
      {text && <span className="Button-text">{text}</span>}
    </button>
  );
}
