"use client";
import RegisterForm from "@/app/components/forms/formRegisterClient";
import "./styles.css";
import { useRegister } from "@/app/hooks/useRegister";


export default function ProfileDesktop() {
    const { handleRegister, isLoading, defaultValues } = useRegister();

    return (
        <div className="register-container">
            <div className="desktop-register">
                <div className="background-register-dark"></div>
                <div className="background-register-light">
                    <div className="light-register-header">
                        <h1 className="app-register-title">
                           Editar Meu perfil
                        </h1>
                    </div>
                </div>

                <div className="form-register-container">
                    <RegisterForm
                        onSubmit={handleRegister}
                        loading={isLoading}
                        defaultValues={defaultValues}
                        buttonText="Editar"
                    />
                </div>
            </div>
        </div>
    );
}
