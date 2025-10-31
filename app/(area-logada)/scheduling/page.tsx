"use client";

import SearchBar from "@/app/components/searchBar";
import LayoutPrivate from "../layout/layoutPrivate";
import SchedulingDesktop from "./schedulingDesktop";
import SchedulingMobile from "./schedulingMobile";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setSearch } from "@/app/store/features/schedulingSlice";

export default function Sheduling() {
  const { search } = useSelector((state: RootState) => state.scheduling);
  const dispatch = useDispatch();

  const router = useRouter();
  return (
    <LayoutPrivate
      pageTitle={
        <SearchBar
          searchValue={search}
          onSearchChange={(value) => dispatch(setSearch(value))}
          onButtonClick={() => router.push("/clients")}
          placeholder="Pesquisar..."
        />
      }
      desktopContent={<SchedulingDesktop />}
      mobileContent={<SchedulingMobile />}
    />
  );
}
