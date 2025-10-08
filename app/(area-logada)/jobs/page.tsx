"use client";

import LayoutPrivate from "../layout/layoutPrivate";
import JobDesktop from "./jobDesktop";
import JobMobile from "./jobMobile";

export default function Jobs() {
  return (
    <LayoutPrivate
      desktopContent={<JobDesktop />}
      mobileContent={<JobMobile />}
    />
  );
}
