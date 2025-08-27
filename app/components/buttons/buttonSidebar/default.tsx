import React, { ReactNode } from "react";
import "./styles.css";

interface DefaultButtonProps {
  active?: boolean;
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
}

export default function Default({
  active,
  icon,
  label,
  onClick,
}: DefaultButtonProps) {
  return (
    <div className="DefaultButtonWrapper">
      <span
        className={`DefaultButton-element ${active ? "DefaultButton-element--active" : ""}`}
      ></span>
      <button
        onClick={onClick}
        className={`DefaultButton ${active ? "DefaultButton--active" : ""}`}
      >
        {icon && <span className="DefaultButton-icon">{icon}</span>}
        <span className="DefaultButton-label">{label}</span>
      </button>
    </div>
  );
}
