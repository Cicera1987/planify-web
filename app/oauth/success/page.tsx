"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;
    localStorage.setItem("@planify/token", cleanToken);

    router.replace("/home");
  }, [router]);

  return <div>Autenticando, aguarde...</div>;
}

