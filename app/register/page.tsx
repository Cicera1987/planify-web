"use client";

import RegisterForm from "../components/forms/formRegisterClient";
import "./styles.css";
import Icon from "../components/assets/icons";
import { useRegister } from "../hooks/useRegister";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const { handleRegister, isLoading, isEditMode, defaultValues } = useRegister();
  
  return (
    <div className="register-container">
      <div className="register-header">
        <button onClick={() => router.back()} className="back-register-button">
          <Icon.ToGoBack /> {isEditMode ? "Meu Perfil" : "Cadastro"}
        </button>
      </div>
      <div className="desktop-register">
        <div className="background-register-dark"></div>
        <div className="background-register-light">
          <div className="light-register-header">
            <h1 className="app-register-title">
              {isEditMode ? "Meu Perfil" : "Meu Cadastro"}
            </h1>
          </div>
        </div>

        <div className="form-register-container">
          <RegisterForm
            onSubmit={handleRegister}
            loading={isLoading}
            defaultValues={defaultValues}
            buttonText={isEditMode ? "Salvar Alterações" : "Cadastrar"}
          />
        </div>
      </div>
    </div>
  );
}
