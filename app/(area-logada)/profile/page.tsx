"use client";

import LayoutPrivate from "../layout/layoutPrivate";
import ProfileDesktop from "./profileDesktop";
import ProfileMobile from "./profileMobile";

export default function Register() {

  return (
    <LayoutPrivate
      desktopContent={<ProfileDesktop />}
      mobileContent={<ProfileMobile />}
    />
  );
}
