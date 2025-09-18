"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useIsMobile } from "@/app/hooks/useMobile";
import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import Footer from "@/app/components/footer";
import BoxMobile from "@/app/components/content/boxLayout/mobile";
import BoxLayout from "@/app/components/content/boxLayout/desktop";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import Input from "@/app/components/inputs";
import { useSchedulingContext } from "@/app/context";

export default function Layout({
  desktopContent,
  mobileContent,
}: {
  desktopContent: ReactNode;
  mobileContent: ReactNode;
}) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { user, isLoading } = useCurrentUser();
  const { search, setSearch, token, setToken, mounted, setMounted } =
    useSchedulingContext();

  useEffect(() => {
    setMounted(true);
    const savedToken = localStorage.getItem("@planify/token");
    setToken(savedToken);

    if (!savedToken) {
      router.push("/login");
    }
  }, [router]);

  if (!mounted || !token) return null;

  const headerDesktop = (
    <Header
      nome={isLoading ? "Carregando..." : (user?.username ?? "")}
      fotoUrl={user?.imageUrl ?? ""}
    >
      <Input.SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar pelo nome"
      />
      <h2>Próximos atendimentos</h2>
    </Header>
  );
  const headerMobile = (
    <Header
      label="Agendamento"
      nome={isLoading ? "Carregando..." : (user?.username ?? "")}
      fotoUrl={user?.imageUrl ?? ""}
      isMobile
    />
  );

  const sidebar = <Sidebar />;
  const footer = <Footer />;

  if (isMobile) {
    return (
      <BoxMobile header={headerMobile} sidebar={sidebar} footer={footer}>
        {mobileContent}
      </BoxMobile>
    );
  }

  return (
    <BoxLayout header={headerDesktop} sidebar={sidebar}>
      {desktopContent}
    </BoxLayout>
  );
}
