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
}

export default function ButtonVariant({
  text,
  icon,
  variant = "icon",
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <div className="button-container">
      <button type={type} onClick={onClick} className={`Button ${variant}`}>
        {icon && <span className="Button-icon">{icon}</span>}
        {text && <span className="Button-text">{text}</span>}
      </button>
    </div>
  );
}
