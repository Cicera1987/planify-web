"use client";

import SearchBar from "@/app/components/searchBar";
import LayoutPrivate from "../layout/layoutPrivate";
import ClientsDesktop from "./clientsDesktop";
import ClientsMobile from "./clientsMobile";
import { useRouter } from "next/navigation";
import { useContact } from "@/app/hooks/useContact";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setSearch } from "@/app/store/features/contactsSlice";
import { useEffect } from "react";


export default function Clients() {
  const { handleDelete} = useContact();
  const dispatch = useDispatch();
  const router = useRouter();
  const { search } = useSelector((state: RootState) => state.contacts);


  return (
    <>
      <LayoutPrivate
        pageTitle={
           <SearchBar
            searchValue={search}
            onSearchChange={(value) => dispatch(setSearch(value))}
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
