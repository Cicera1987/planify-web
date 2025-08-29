"use client";

import React, { ReactNode } from "react";
import "./styles.css";

export default function BoxLayout({
  sidebar,
  header,
  children,
  footer,
}: {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="box-layout">
      <aside className="box-sidebar">{sidebar}</aside>
      <div className="box-main">
        <header className="box-header">{header}</header>

        <main className="box-content">{children}</main>

        {footer && <footer className="box-footer">{footer}</footer>}
      </div>
    </div>
  );
}
