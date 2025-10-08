"use client";

import SearchBar from "@/app/components/searchBar";
import LayoutPrivate from "../layout/layoutPrivate";
import SchedulingDesktop from "./schedulingDesktop";
import SchedulingMobile from "./schedulingMobile";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setSearch } from "@/app/store/features/contactsSlice";

export default function Sheduling() {
  const { search } = useSelector((state: RootState) => state.scheduling);

  const router = useRouter();
  return (
    <LayoutPrivate
      pageTitle={
        <SearchBar
          searchValue={search}
          onSearchChange={setSearch}
          onButtonClick={() => router.push("/contact")}
          placeholder="Pesquisar..."
        />
      }
      desktopContent={<SchedulingDesktop />}
      mobileContent={<SchedulingMobile />}
    />
  );
}
