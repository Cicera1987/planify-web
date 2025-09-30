"use client";

import RegisterForm from "../components/forms/formUser";
import "./styles.css";
import { useRegister } from "../hooks/useRegister";

export default function RegisterDesktop() {
  const { handleRegister, isLoading, defaultValues } = useRegister({
    isEditMode: false,
  });

  return (
    <div className="register-container">
      <div className="desktop-register">
        <div className="background-register-dark"></div>
        <div className="background-register-light">
          <div className="light-register-header">
            <h1 className="app-register-title">Meu Cadastro</h1>
          </div>
        </div>

        <div className="form-register-container">
          <RegisterForm
            onSubmit={handleRegister}
            loading={isLoading}
            defaultValues={defaultValues}
            buttonText="Cadastrar"
          />
        </div>
      </div>
    </div>
  );
}
