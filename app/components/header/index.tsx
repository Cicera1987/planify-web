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
    "/home": "Início",
    "/scheduling": "Atendimentos",
    "/schedule": "Agendamento",
    "/dashboard": "Dashboard",
    "/clients": "Meus Clientes",
    "/register": "Meu Cadastro",
    "/profile": "Meu Perfil",
    "/contact": "Cadastro de Cliente",
    "/jobs": "Cadastro de Serviço",
    "/packages": "Cadastro de Pacotes",
    "/": "Início",
  };

  function getTitle(path: string) {
    if (/^\/user\/\d+\/edit$/.test(path)) return "Editar profissional";
    if (/^\/contact\/\d+\/edit$/.test(path)) return "Editar Cliente";
    if (/^\/scheduling\/\d+\/edit$/.test(path)) return "Editar agendamento";
    if (/^\/contact\/\d+\/schedule$/.test(path)) return "Agendamento";
    if (/^\/jobs\/\d+\/edit$/.test(path)) return "Editar Serviço";
    if (/^\/package\/\d+\/edit$/.test(path)) return "Editar Pacote de serviço";

    return titles[path] || path.replace("/", "");
  }

  const title = getTitle(pathname);

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
            {!isMobile && nome && <span className="header-hello">{nome}</span>}
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
