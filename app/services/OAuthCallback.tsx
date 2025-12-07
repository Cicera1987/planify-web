"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("@planify/token", token);
      router.replace("/");
    }
  }, [router]);

  return <p>Redirecionando...</p>;
}
