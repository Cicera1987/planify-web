"use client";

import SearchBar from "@/app/components/searchBar";
import LayoutPrivate from "../layout/layoutPrivate";
import ClientsDesktop from "./clientsDesktop";
import ClientsMobile from "./clientsMobile";
import { useRouter } from "next/navigation";
import { useContact } from "@/app/hooks/useContact";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setSearch } from "@/app/store/features/schedulingSlice";

export default function Clients() {

  const { handleDelete } = useContact();

  const { search } = useSelector(
    (state: RootState) => state.scheduling
  )


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
