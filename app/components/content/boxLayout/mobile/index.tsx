"use client";

import React, { useState, useEffect } from "react";
import "./styles.css";

import Icon from "../../../assets/icons";
import Button from "../../../buttons";

interface BoxMobileProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function BoxMobile({
  header,
  sidebar,
  children,
  footer,
}: BoxMobileProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) return <>{children}</>;

  return (
    <div className="box-mobile">
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className={`mobile-sidebar ${isSidebarOpen ? "open" : ""}`}>
        {sidebar}
      </div>
      <div className="mobile-header">
        <Button.ButtonIcon
          icon={<Icon.InfoMenu />}
          onClick={() => setIsSidebarOpen(true)}
        />
        {header}
      </div>
      <main className="mobile-content">{children}</main>
      {footer}
    </div>
  );
}
