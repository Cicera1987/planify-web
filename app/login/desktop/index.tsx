"use client";

import React from "react";
import "./styles.css";

import LoginForm from "@/app/components/forms/formLogin";
import { useAuth } from "@/app/hooks/useAuth";

export default function DesktopLogin() {
    const { login } = useAuth();

    return (
        <div className="desktop-login">
            <div className="background-dark"></div>
            <div className="background-light">
                <div className="light-header">
                    <img src="/images/logo.png" alt="Logo Planify" className="logo" />
                    <h1 className="app-title">Planify</h1>
                </div>
            </div>

            <div className="form-container">
                <LoginForm onSubmit={(data) => login(data.email, data.password)} />
            </div>
        </div>
    );
}
