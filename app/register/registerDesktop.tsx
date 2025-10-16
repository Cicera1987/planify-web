"use client";

import BoxRegister from "../components/content/BoxRegister";
import RegisterForm from "../components/forms/formUser";

import { useRegister } from "../hooks/useRegister";

export default function RegisterDesktop() {
  const { handleRegister, isLoading, defaultValues } = useRegister({
    isEditMode: false,
  });

  return (
    <BoxRegister title="Meu Cadastro">
      <RegisterForm
        onSubmit={handleRegister}
        loading={isLoading}
        defaultValues={defaultValues}
        buttonText="Cadastrar"
      />
    </BoxRegister>
  );
}
