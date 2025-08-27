"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import "./styles.css";
import Icon from "../assets/icons";

interface HeaderProps {
  nome: string;
  fotoUrl?: string;
}

const titles: Record<string, string> = {
  "/scheduling": "Atendimentos",
  "/client": "Cadastro de Clientes",
  "/dashboard": "Dashboard",
  "/": "Início",
};

export default function Header({ nome, fotoUrl }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const title = titles[pathname] || pathname.replace("/", "");

  return (
    <header className="header">
      <div className="header-left">
        <button onClick={() => router.back()} className="header-back-btn">
          <Icon.ToGoBack className="header-back-icon" />
        </button>
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        <span className="header-hello">Hello, {nome}</span>
        <img
          src={fotoUrl ? fotoUrl : "/images/avatar.png"}
          alt="Avatar, ou imagem de perfil do usuário"
          className="header-avatar"
        />
      </div>
    </header>
  );
}
