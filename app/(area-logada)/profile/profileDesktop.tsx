"use client";
import RegisterForm from "@/app/components/forms/formUser";
import { useRegister } from "@/app/hooks/useRegister";
import BoxRegister from "@/app/components/content/BoxRegister";

export default function ProfileDesktop() {
  const { handleRegister, isLoading, defaultValues } = useRegister({
    isEditMode: true,
  });

  return (
    <BoxRegister title="Editar cadastro">
      <RegisterForm
        onSubmit={handleRegister}
        loading={isLoading}
        defaultValues={defaultValues}
        buttonText="Editar"
        isEditMode
      />
    </BoxRegister>
  );
}
