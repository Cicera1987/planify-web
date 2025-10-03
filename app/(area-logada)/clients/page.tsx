"use client";

import SearchBar from "@/app/components/searchBar";
import LayoutPrivate from "../layout/layoutPrivate";
import ClientsDesktop from "./clientsDesktop";
import ClientsMobile from "./clientsMobile";
import { useSchedulingContext } from "@/app/context/schedulingProvaider";
import { useRouter } from "next/navigation";
import { useContact } from "@/app/hooks/useContact";

export default function Clients() {
  const { search, setSearch } = useSchedulingContext();
  const { handleDelete } = useContact();

  const router = useRouter();

  return (
    <>
      <LayoutPrivate
        pageTitle={
          <SearchBar
            searchValue={search}
            onSearchChange={setSearch}
            onButtonClick={() => router.push("/contact")}
            placeholder="Pesquisar..."
          />
        }
        desktopContent={<ClientsDesktop onDelete={handleDelete} />}
        mobileContent={<ClientsMobile onDelete={handleDelete} />}
      />
    </>
  );
}
