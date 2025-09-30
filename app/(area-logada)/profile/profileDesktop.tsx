"use client";
import RegisterForm from "@/app/components/forms/formUser";
import "./styles.css";
import { useRegister } from "@/app/hooks/useRegister";

export default function ProfileDesktop() {
  const { handleRegister, isLoading, defaultValues } = useRegister({
    isEditMode: true,
  });

  return (
    <div className="register-container">
      <div className="desktop-register">
        <div className="background-register-dark"></div>
        <div className="background-register-light">
          <div className="light-register-header">
            <h1 className="app-register-title">Editar Meu perfil</h1>
          </div>
        </div>

        <div className="form-register-container">
          <RegisterForm
            onSubmit={handleRegister}
            loading={isLoading}
            defaultValues={defaultValues}
            buttonText="Editar"
            isEditMode
          />
        </div>
      </div>
    </div>
  );
}
