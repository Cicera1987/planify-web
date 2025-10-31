"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import "./styles.css";
import Input from "../../inputs";
import Button from "../../buttons";
import Icon from "../../assets/icons";

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => void;
  showLinks?: boolean;
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm({
  onSubmit,
  showLinks = true,
}: LoginFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const handleGoogle = () =>{
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_API}/oauth2/authorization/google`
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <Input.InputForm
          label="E-mail"
          placeholder="Digite seu e-mail"
          {...register("email", { required: "E-mail obrigatório" })}
          required
          error={errors.email?.message}
        />

        <Input.InputForm
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          {...register("password", { required: "Senha obrigatória" })}
          required
          error={errors.password?.message}
        />
        {showLinks && (
          <div className="login-links">
            <Button.ButtonVariant
              text="Cadastrar"
              variant="text"
              type="button"
              onClick={() => router.push("/register")}
            />
            <Button.ButtonVariant
              text="Esqueci minha senha"
              type="button"
              variant="text"
              onClick={() => router.push("/forgot")}
            />
          </div>
        )}

        <Button.ButtonVariant text="Entrar" variant="filled" type="submit" />
        <Button.ButtonVariant 
          icon={<Icon.Google/>} 
          text="Entrar com o Google" 
          variant="icon_info" 
          type="button" 
          onClick={handleGoogle}
        />
      </form>
    </div>
  );
}
