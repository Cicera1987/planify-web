"use client";

import LayoutPrivate from "../layout/layoutPrivate";
import ContactDesktop from "./contactDesktop";
import ContactMobile from "./contactMobile";

export default function Contacts() {
  return (
    <LayoutPrivate
      desktopContent={<ContactDesktop />}
      mobileContent={<ContactMobile />}
    />
  );
}
