"use client";

import React, { useState, ReactNode } from "react";
import "./styles.css";

import Icon from "../../../assets/icons";
import Button from "../../../buttons";
import { useIsMobile } from "@/app/hooks/useMobile";

interface BoxMobileProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export default function BoxMobile({
  header,
  sidebar,
  children,
  footer,
}: BoxMobileProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) return <>{children}</>;

  return (
    <div className="box-mobile">
      {sidebar && isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {sidebar && (
        <div className={`mobile-sidebar ${isSidebarOpen ? "open" : ""}`}>
          {sidebar}
        </div>
      )}
      <div className="mobile-header">
        {header}
        {sidebar && (
          <Button.ButtonIcon
            icon={<Icon.InfoMenu />}
            onClick={() => setIsSidebarOpen(true)}
          />
        )}
      </div>
      <main className="mobile-content">{children}</main>
      {footer}
    </div>
  );
}
