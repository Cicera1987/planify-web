"use client";

import React from "react";
import "./styles.css";

import LoginForm from "@/app/components/forms/formLogin";
import { useAuth } from "@/app/hooks/useAuth";

export default function DesktopLogin() {
  const { login } = useAuth();

  return (
    <div className="login-desktop">
      <div className="login-background-dark"></div>
      <div className="login-background-light">
        <div className="login-light-header">
          <img
            src="/images/logo.png"
            alt="Logo Planify"
            className="login-logo"
          />
          <h1 className="login-app-title">Planify</h1>
        </div>
      </div>

      <div className="login-form-container">
        <LoginForm onSubmit={(data) => login(data.email, data.password)} />
      </div>
    </div>
  );
}
