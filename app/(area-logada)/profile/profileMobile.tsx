"use client";

import RegisterForm from "@/app/components/forms/formUser";
import { useRegister } from "@/app/hooks/useRegister";
import React from "react";

export default function ProfileMobile() {
  const { handleRegister, isLoading, defaultValues } = useRegister({
    isEditMode: true,
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <RegisterForm
          onSubmit={handleRegister}
          loading={isLoading}
          defaultValues={defaultValues}
          buttonText="Editar"
          isEditMode
        />
      </div>
    </div>
  );
}
