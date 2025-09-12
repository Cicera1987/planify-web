"use client";

import { useIsMobile } from "../hooks/useMobile";
import DesktopLogin from "./desktop/page";
import MobileLogin from "./mobile/page";

export default function Login() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileLogin /> : <DesktopLogin />;
}
