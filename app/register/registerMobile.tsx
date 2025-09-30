"use client";
import React from "react";
import RegisterForm from "@/app/components/forms/formUser";
import { useRegister } from "@/app/hooks/useRegister";

export default function RegisterMobile() {
  const { handleRegister, isLoading, defaultValues } = useRegister({
    isEditMode: false,
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <RegisterForm
          onSubmit={handleRegister}
          loading={isLoading}
          defaultValues={defaultValues}
          buttonText="Cadastrar"
        />
      </div>
    </div>
  );
}
