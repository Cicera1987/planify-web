"use client";

import LayoutPrivate from "../layout/layoutPrivate";
import PackagesDesktop from "./packagesDesktop";
import PackagesMobile from "./packagesMobile";

export default function Packages() {

  return (
    <LayoutPrivate
      desktopContent={<PackagesDesktop />}
      mobileContent={<PackagesMobile />}
    />
  );
}
