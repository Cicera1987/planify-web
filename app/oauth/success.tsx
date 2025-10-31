"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("@planify/token", token.replace("Bearer ", ""));
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <div>Autenticando, aguarde...</div>;
}
