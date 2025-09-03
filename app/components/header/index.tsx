"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import "./styles.css";
import Icon from "../assets/icons";

export default function Header({
  label,
  nome,
  fotoUrl,
  isMobile = false,
  children,
}: {
  label?: string;
  nome: string;
  fotoUrl?: string;
  isMobile?: boolean;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/scheduling": "Atendimentos",
    "/client": "Cadastro de Clientes",
    "/dashboard": "Dashboard",
    "/": "Início",
  };

  const title = titles[pathname] || pathname.replace("/", "");

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          {!isMobile && (
            <>
              <button onClick={() => router.back()} className="header-back-btn">
                <Icon.ToGoBack />
              </button>
              <h1 className="header-title">{title}</h1>
            </>
          )}
        </div>

        <div className="header-right">
          <span>Hello,</span>
          <span className="header-hello">{nome}</span>
          <img
            src={fotoUrl ? fotoUrl : "/images/avatar.png"}
            alt="Avatar"
            className="header-avatar"
          />
        </div>
      </div>

      {children && <div className="children-header">{children}</div>}
    </header>
  );
}
