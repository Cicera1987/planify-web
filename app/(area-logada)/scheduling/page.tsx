"use client";

import SearchBar from "@/app/components/searchBar";
import LayoutPrivate from "../layout/layoutPrivate";
import SchedulingDesktop from "./schedulingDesktop";
import SchedulingMobile from "./schedulingMobile";
import { useSchedulingContext } from "@/app/context/schedulingProvaider";
import { useRouter } from "next/navigation";

export default function Sheduling() {
  const { search, setSearch } = useSchedulingContext();
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
