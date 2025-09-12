"use client";

import React from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import Input from "../../inputs";
import Button from "../../buttons";
import { formatPhone } from "@/app/utils/formatPhone";
import { useRegister } from "@/app/hooks/useRegister";
import { useSchedulingContext } from "@/app/context";
import Icon from "../../assets/icons";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormInputs) => void;
  loading?: boolean;
  showLinks?: boolean;
}

export interface RegisterFormInputs {
  email: string;
  confirmEmail: string;
  password: string;
  username: string;
  confirmPassword: string;
  phone?: string;
  speciality?: string;
}

export default function RegisterForm({
  onSubmit,
  loading = false,
}: RegisterFormProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const { handleLocalImageChange } = useRegister();
  const { imageState } = useSchedulingContext();

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="image-preview-container">
          {imageState.image ? (
            <img
              src={imageState.image}
              alt="Preview"
              className="image-preview"
            />
          ) : (
            <div className="image-placeholder">Foto</div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleLocalImageChange}
          className="file-input"
        />
        <Input.InputForm
          label="Nome"
          placeholder="Informe seu nome"
          {...register("username", { required: "E-mail obrigatório" })}
          required
          error={errors.username?.message}
        />
        <Input.InputForm
          label="Telefone"
          placeholder="Informe seu número de telefone"
          {...register("phone", { required: "E-mail obrigatório" })}
          value={formatPhone(watch("phone") || "")}
          type="tel"
          required
          error={errors.phone?.message}
        />
        <Input.InputForm
          label="E-mail"
          placeholder="Digite seu e-mail"
          {...register("email", { required: "E-mail obrigatório" })}
          required
          error={errors.email?.message}
        />
        <Input.InputForm
          label="Informe novamente seu e-mail"
          placeholder="Digite novamente seu e-mail"
          type="email"
          {...register("confirmEmail", {
            required: "Confirmação de e-mail obrigatória",
          })}
          required
          error={errors.confirmEmail?.message}
        />
        <Input.InputForm
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          {...register("password", { required: "Senha obrigatória" })}
          required
          error={errors.password?.message}
        />
        <Input.InputForm
          label="confirme novamente sua senha"
          placeholder="Digite novamente sua senha"
          type="password"
          {...register("confirmPassword", {
            required: "Confirmação de senha obrigatória",
          })}
          required
          error={errors.confirmPassword?.message}
        />
        <Input.InputForm
          label="Especialidade"
          type="text"
          placeholder="Digite seu especialização"
          {...register("speciality", { required: " Campo obrigatório" })}
          required
          error={errors.speciality?.message}
        />
        <Button.ButtonVariant
          text={loading ? "" : "Cadastrar"}
          icon={loading ? <Icon.Loading /> : undefined}
          variant="filled"
          type="submit"
        />
      </form>
    </div>
  );
}
