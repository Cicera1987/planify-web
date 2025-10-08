"use client";

import React, { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useIsMobile } from "@/app/hooks/useMobile";
import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import Footer from "@/app/components/footer";
import BoxMobile from "@/app/components/content/boxLayout/mobile";
import BoxLayout from "@/app/components/content/boxLayout/desktop";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import Input from "@/app/components/inputs";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import {
  setSearch,
  setToken,
  setMounted,
} from "@/app/store/features/schedulingSlice";

export default function LayoutPrivate({
  pageTitle,
  desktopContent,
  mobileContent,
}: {
  pageTitle?: ReactNode;
  desktopContent: ReactNode;
  mobileContent: ReactNode;
}) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { user, isLoading } = useCurrentUser();
  const dispatch = useDispatch<AppDispatch>();

  const { search, token, mounted } = useSelector(
    (state: RootState) => state.scheduling,
  );

  useEffect(() => {
    dispatch(setMounted(true));
    const savedToken = localStorage.getItem("@planify/token");
    dispatch(setToken(savedToken));

    if (!savedToken) {
      router.push("/login");
    }
  }, [router, dispatch]);

  if (!mounted || !token) return null;

  const headerDesktop = (
    <Header
      onBack={() => router.back()}
      showUserInfo={true}
      nome={isLoading ? "Carregando..." : (user?.username ?? "")}
      fotoUrl={user?.imageUrl || "/images/avatar.png"}
    >
      {pathname === "/home" && (
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex-1">
            <Input.SearchInput
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              placeholder="Buscar pelo nome"
              className="w-full"
            />
          </div>
          <h2 className="text-lg font-semibold whitespace-nowrap">
            Próximos atendimentos
          </h2>
        </div>
      )}
    </Header>
  );

  const headerMobile =
    pathname === "/home" ? (
      <Header
        fotoUrl={user?.imageUrl ?? ""}
        showUserInfo={true}
        hideTitle={true}
      />
    ) : (
      <Header onBack={() => router.back()} showUserInfo={false} />
    );

  const sidebar = <Sidebar />;
  const footer = <Footer />;

  if (isMobile) {
    return (
      <BoxMobile header={headerMobile} sidebar={sidebar} footer={footer}>
        <div className="mb-4">{pageTitle}</div>
        {mobileContent}
      </BoxMobile>
    );
  }

  return (
    <BoxLayout header={headerDesktop} sidebar={sidebar}>
      {pageTitle}
      {desktopContent}
    </BoxLayout>
  );
}
