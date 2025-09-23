"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "./styles.css";
import Icon from "../assets/icons";
import { useIsMobile } from "@/app/hooks/useMobile";

interface HeaderProps {
  label?: string;
  nome?: string;
  fotoUrl?: string;
  onBack?: () => void;
  showUserInfo?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  hideTitle?: boolean;
}

export default function Header({
  label,
  nome,
  fotoUrl,
  onBack,
  showUserInfo = true,
  hideTitle = false,
  children,
}: HeaderProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const titles: Record<string, string> = {
    "/scheduling": "Atendimentos",
    "/client": "Cadastro de Clientes",
    "/dashboard": "Dashboard",
    "/register": "Meu Cadastro",
    "/profile": "Meu Perfil",
    "/": "Início",
  };

  const title = label || titles[pathname] || pathname.replace("/", "");

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          {onBack && !hideTitle && (
            <button onClick={onBack} className="header-back-btn">
              <Icon.ToGoBack />
            </button>
          )}
          {!hideTitle && title && <h1 className="header-title">{title}</h1>}
        </div>

        {showUserInfo && (
          <div className={isMobile ? "" : "header-right"}>
            {!isMobile && nome && (
              <span className="header-hello">{nome}</span>
            )}
            {fotoUrl && (
              <img
                src={fotoUrl || "/images/avatar.png"}
                alt="Avatar"
                className="header-avatar"
              />
            )}
          </div>
        )}
      </div>

      {children && <div className="children-header">{children}</div>}
    </header>
  );
}