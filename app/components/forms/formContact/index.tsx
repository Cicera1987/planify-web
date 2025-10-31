import { formatPhone } from "@/app/utils/formatPhone";
import { useForm } from "react-hook-form";
import Icon from "../../assets/icons";
import { ChangeEvent, useEffect } from "react";

import Button from "../../buttons";
import Input from "../../inputs";
import "./styles.css";
import { usePackages } from "@/app/hooks/usePackages";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import { externalImageLoader } from "@/app/utils/externalImageLoader";

interface ContactFormInputs {
  id?: number;
  name: string;
  phone: string;
  email?: string;
  observation?: string;
  gender?: string;
  imageUrl?: string;
  professionalId: number;
  isActive?: boolean;
  packageIds?: number[];
}

interface ContactFormProps {
  onSubmit: (data: ContactFormInputs) => void;
  loading?: boolean;
  defaultValues?: Partial<ContactFormInputs>;
  buttonText?: string;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactForm({
  onSubmit,
  loading = false,
  defaultValues,
  buttonText = "Enviar",
  onImageChange,
}: ContactFormProps) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({ defaultValues });

  const { imageState } = useSelector((state: RootState) => state.scheduling);

  const { optionsPackages: packageOptions } = usePackages();

  const genderOptions = ["Masculino", "Feminino"];

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const phoneValue = watch("phone");

  useEffect(() => {
    const phone = watch("phone");
    if (phone) {
      setValue("phone", formatPhone(phone));
    }
  }, [phoneValue, setValue]);

  return (
    <div className="contact-page">
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="contact-form-fields">
          <div className="image-preview-contact-container">
            {(imageState.image || (defaultValues?.imageUrl && defaultValues?.id))? (
              <Image
                loader={externalImageLoader}
                src={imageState.image || defaultValues?.imageUrl || ""}
                alt="Preview"
                className="image-preview-contact"
                width={100}
                height={100}
              />
            ) : (
              <div className="image-placeholder-contact">Foto</div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="file-input-contact"
          />

          <Input.InputForm
            label="Nome"
            placeholder="Informe seu nome"
            {...register("name", { required: "Nome obrigatório" })}
            required
            error={errors.name?.message}
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
          <Input.MultiSelectInput
            label="Gênero"
            options={genderOptions}
            value={watch("gender")?.toLowerCase() || ""}
            onChange={(value) => setValue("gender", value)}
            placeholder="Selecione ou digite..."
            required
            error={errors.gender?.message}
          />
          <Input.InputForm
            label="Observações"
            type="text"
            placeholder="Digite uma observação"
            {...register("observation")}
          />

          <Input.CheckboxInput
            label="Pacote Mensal"
            checked={watch("isActive") || !!watch("packageIds")?.length}
            onChange={(val) => setValue("isActive", val)}
            error={errors.isActive?.message}
          />

          {watch("isActive") && (
            <Input.SelectInput
              label="Pacote Mensal"
              value={watch("packageIds")?.[0] ?? null}
              onChange={(value) =>
                setValue("packageIds", value ? [Number(value)] : [])
              }
              options={packageOptions}
              placeholder="Selecione..."
              error={errors.packageIds?.message}
            />
          )}
        </div>
        <div className="contact-form-footer">
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
