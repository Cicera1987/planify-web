"use client";

import SearchBar from "@/app/components/searchBar";
import LayoutPrivate from "../layout/layoutPrivate";
import ClientsDesktop from "./clientsDesktop";
import ClientsMobile from "./clientsMobile";
import { useSchedulingContext } from "@/app/context";
import { useRouter } from "next/navigation";

export default function Clients() {
  const { search } = useSchedulingContext();
  const router = useRouter();

  return (
    <LayoutPrivate
      pageTitle={
        <SearchBar
          searchValue={search}
          onSearchChange={() => {}}
          onButtonClick={() => router.push("/contact")}
          placeholder="Pesquisar..."
        />
      }
      desktopContent={<ClientsDesktop />}
      mobileContent={<ClientsMobile />}
    />
  );
}
