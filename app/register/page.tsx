"use client";

import { useRouter } from "next/navigation";
import RegisterForm from "../components/forms/formRegisterClient";
import "./styles.css";
import Icon from "../components/assets/icons";
import { useRegister } from "../hooks/useRegister";

export default function Register() {
  const router = useRouter();
  const { handleRegister, isLoading } = useRegister();

  return (
    <div className="register-container">
      <div className="register-header">
        <button onClick={() => router.back()} className="back-register-button">
          <Icon.ToGoBack /> Cadastro
        </button>
      </div>
      <div className="desktop-register">
        <div className="background-register-dark"></div>
        <div className="background-register-light">
          <div className="light-register-header">
            <h1 className="app-register-title">Meu Cadastro</h1>
          </div>
        </div>

        <div className="form-register-container">
          <RegisterForm onSubmit={handleRegister} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}
