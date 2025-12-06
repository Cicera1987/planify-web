"use client";

import React from "react";
import LoginForm from "@/app/components/forms/formLogin";
import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";

export default function MobileLogin() {
  const { login } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Image
        src="/images/logo.png"
        alt="Logo Planify"
        className="w-24 sm:w-28 mb-4"
        width={80}
        height={80}
      />
      <h1
        style={{ color: "var(--primary-3)" }}
        className="text-2xl sm:text-3xl font-bold mb-8"
      >
        Planify
      </h1>

      <div className="w-full max-w-md">
        <LoginForm onSubmit={(data) => login(data.email, data.password)} />
      </div>
    </div>
  );
}
