"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import Input from "../../inputs";
import Button from "../../buttons";
import { formatPhone } from "@/app/utils/formatPhone";
import { useRegister } from "@/app/hooks/useRegister";
import Icon from "../../assets/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import { externalImageLoader } from "@/app/utils/externalImageLoader";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormInputs) => void;
  loading?: boolean;
  showLinks?: boolean;
  defaultValues?: Partial<RegisterFormInputs>;
  buttonText?: string;
  isEditMode?: boolean;
}

export interface RegisterFormInputs {
  imageUrl?: string;
  email: string;
  confirmEmail: string;
  password: string;
  username: string;
  confirmPassword: string;
  phone: string;
  speciality: string;
}

export default function RegisterForm({
  onSubmit,
  loading = false,
  defaultValues,
  buttonText = "Enviar",
  isEditMode = false,
}: RegisterFormProps) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>({
    defaultValues,
  });
  const { handleLocalImageRegister } = useRegister();

  const { imageState } = useSelector((state: RootState) => state.scheduling);

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const phone = watch("phone");

  useEffect(() => {

    if (phone) {
      setValue("phone", formatPhone(phone));
    }
  },[phone, setValue]);

  return (
    <div className="use-page">
      <form onSubmit={handleSubmit(onSubmit)} className="use-form">
        <div className="form-fields">
          <div className="image-preview-container">
            {imageState.image || defaultValues?.imageUrl ? (
              <Image
                loader={externalImageLoader}
                src={imageState.image || defaultValues?.imageUrl || ""}
                alt="Preview"
                className="image-preview"
                width={100}
                height={100}
              />
            ) : (
              <div className="image-placeholder">Foto</div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleLocalImageRegister}
            className="file-input"
          />

          <Input.InputForm
            label="Nome"
            placeholder="Informe seu nome"
            {...register("username", { required: "Nome obrigatório" })}
            required
            error={errors.username?.message}
          />
          <Input.InputForm
            label="Telefone"
            placeholder="Informe seu número de telefone"
            {...register("phone", { required: "Telefone obrigatório" })}
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

          {!isEditMode && (
            <>
              <Input.InputForm
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                {...register("password", { required: "Senha obrigatória" })}
                required
                error={errors.password?.message}
              />
              <Input.InputForm
                label="Confirme sua senha"
                placeholder="Digite novamente sua senha"
                type="password"
                {...register("confirmPassword", {
                  required: "Confirmação de senha obrigatória",
                })}
                required
                error={errors.confirmPassword?.message}
              />
            </>
          )}
          <Input.InputForm
            label="Especialidade"
            type="text"
            placeholder="Digite sua especialização"
            {...register("speciality", { required: "Campo obrigatório" })}
            required
            error={errors.speciality?.message}
          />
        </div>
        <div className="form-footer">
          <Button.ButtonVariant
            text={loading ? "" : buttonText}
            icon={loading ? <Icon.Loading /> : undefined}
            variant="filled"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
