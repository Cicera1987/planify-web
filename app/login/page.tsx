"use client";

import { useEffect } from "react";
import { useIsMobile } from "../hooks/useMobile";
import DesktopLogin from "./desktop/page";
import MobileLogin from "./mobile/page";
import { requestNotificationPermission } from "../services/notificationService";
import { api } from "../services/api";

export default function Login() {
  const isMobile = useIsMobile();

  useEffect(() => {
    async function registerToken() {
      const token = await requestNotificationPermission();
      if (token) {
        await api.post("/notification-token", { token });
      }
    }

    registerToken();
  }, []);

  return isMobile ? <MobileLogin /> : <DesktopLogin />;
}
