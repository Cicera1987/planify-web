import React, { ReactNode } from "react";
import Button from "../buttons";
import "./styles.css";

export default function MenuSidebar({
  title,
  routeButtons = [],
  actionButtons = [],
}: {
  title: string;
  routeButtons?: {
    id: string;
    icon: ReactNode;
    label: string;
    onClick?: () => void;
    active?: boolean;
  }[];
  actionButtons?: {
    id: string;
    icon: ReactNode;
    label: string;
    onClick?: () => void;
    active?: boolean;
  }[];
}) {
  return (
    <aside className="MenuSidebar">
      <div className="MenuSidebar-title">{title}</div>

      <div className="MenuSidebarScroll">
        <div className="MenuSidebar-routeButtons">
          {routeButtons.map((btn) => (
            <Button.Default
              key={btn.id}
              icon={btn.icon}
              label={btn.label}
              onClick={btn.onClick}
              active={btn.active}
            />
          ))}
        </div>

        <div className="MenuSidebar-actionButtons">
          {actionButtons.map((btn) => (
            <Button.Default
              key={btn.id}
              icon={btn.icon}
              label={btn.label}
              onClick={btn.onClick}
              active={btn.active}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
