"use client";

import BoxLayout from "@/app/components/content/boxLayout/desktop";
import BoxMobile from "@/app/components/content/boxLayout/mobile";
import Header from "@/app/components/header";
import { useIsMobile } from "@/app/hooks/useMobile";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface LayoutPublicProps {
  desktopContent: ReactNode;
  mobileContent: ReactNode;
  title: string;
  showBackButton?: boolean;
}

export default function LayoutPublic({
  desktopContent,
  mobileContent,
  title,
  showBackButton = true,
}: LayoutPublicProps) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const headerDesktop = (
    <Header
      label={title}
      onBack={showBackButton ? () => router.back() : undefined}
    />
  );

  const headerMobile = (
    <Header
      label="Meu Cadastro"
      onBack={() => router.back()}
      showUserInfo={false}
    />
  );

  if (isMobile) {
    return <BoxMobile header={headerMobile}>{mobileContent}</BoxMobile>;
  }

  return <BoxLayout header={headerDesktop}>{desktopContent}</BoxLayout>;
}
