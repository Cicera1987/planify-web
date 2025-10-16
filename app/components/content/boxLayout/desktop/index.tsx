import React, { ReactNode } from "react";
import "./styles.css";

export default function BoxLayout({
  sidebar,
  header,
  children,
  footer,
}: {
  sidebar?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex h-screen box-content">
      {sidebar && <aside className="hidden md:block w-80">{sidebar}</aside>}
      <div className="flex flex-col flex-1">
        <header className="flex-shrink-0">{header}</header>
        <main className="flex-1 p-6 overflow-y-auto box-main">{children}</main>
        {footer && <footer className="flex-shrink-0">{footer}</footer>}
      </div>
    </div>
  );
}
