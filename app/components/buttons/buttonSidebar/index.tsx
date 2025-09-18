import React from "react";
import "./styles.css";

export default function Default({
  active,
  icon,
  label,
  onClick,
}: {
  active?: boolean;
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <div className="DefaultButtonWrapper">
      <span
        className={`DefaultButton-element ${
          active ? "DefaultButton-element--active" : ""
        }`}
      />
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
