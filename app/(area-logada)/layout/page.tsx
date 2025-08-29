"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useIsMobile } from "@/app/hooks/useMobile";
import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import Footer from "@/app/components/footer";
import BoxMobile from "@/app/components/content/boxLayout/mobile";
import BoxLayout from "@/app/components/content/boxLayout/desktop";

export default function Layout({
  desktopContent,
  mobileContent,
}: {
  desktopContent: ReactNode;
  mobileContent: ReactNode;
}) {
  const router = useRouter();
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("@planify/token")
      : null;
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) return null;

  const headerDesktop = <Header nome="Cícera" />;
  const headerMobile = <Header label="Agendamento" nome="Cícera" isMobile />;
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
