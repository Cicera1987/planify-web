"use client";

import { useIsMobile } from "../hooks/useMobile";
import DesktopLogin from "./desktop";
import MobileLogin from "./mobile";

export default function Login() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileLogin /> : <DesktopLogin />;
}
