"use client";
import React from "react";
import LoginForm from "@/app/components/forms/formLogin";
import "./styles.css";
import { useAuth } from "@/app/hooks/useAuth";

export default function MobileLogin() {

    const { login } = useAuth();

    return (
        <div className="mobile-login">
            <div className="header-mobile">
                <img src="/images/logo.png" alt="Logo Planify" className="logo-mobile" />
                <h1 className="app-title-mobile">Planify</h1>
            </div>

            <div className="form-container-mobile">
                <LoginForm onSubmit={(data) => login(data.email, data.password)} />
            </div>
        </div>
    );
}
