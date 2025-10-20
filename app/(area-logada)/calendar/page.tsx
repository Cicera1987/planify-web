"use client";

import LayoutPrivate from "../layout/layoutPrivate";
import CalendarMobile from "./calendarMobile";
import CalendarDesktop from "./calendarDesktop";


export default function Packages() {
  return (
    <LayoutPrivate
      desktopContent={<CalendarDesktop />}
      mobileContent={<CalendarMobile />}
    />
  );
}
