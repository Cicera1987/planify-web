import { formatPhone } from "@/app/utils/formatPhone";
import { useForm } from "react-hook-form";
import Icon from "../../assets/icons";
import { useEffect } from "react";
import { useSchedulingContext } from "@/app/context";
import { useContact } from "@/app/hooks/useContact";
import Button from "../../buttons";
import Input from "../../inputs";
import "./styles.css";
import { usePackages } from "@/app/hooks/usePackages";

interface ContactFormInputs {
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
}

export default function ContactForm({
  onSubmit,
  loading = false,
  defaultValues,
  buttonText = "Enviar",
}: ContactFormProps) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({ defaultValues });
  const { imageState } = useSchedulingContext();
  const { handleLocalImageChange } = useContact();
  const { optionsPackages: packageOptions, isLoading: packagesLoading } = usePackages();

  const genderOptions = ["Masculino", "Feminino"];

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    const phone = watch("phone");
    if (phone) {
      setValue("phone", formatPhone(phone));
    }
  }, [watch("phone"), setValue]);

  return (
    <div className="contact-page">
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="form-fields">
          <div className="image-preview-contact-container">
            {imageState.image || defaultValues?.imageUrl ? (
              <img
                src={imageState.image || defaultValues?.imageUrl}
                alt="Preview"
                className="image-preview-contact"
              />
            ) : (
              <div className="image-placeholder-contact">Foto</div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleLocalImageChange}
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
            checked={watch("isActive") || !! watch("packageIds")?.length}
            onChange={(val) => setValue("isActive", val)}
            error={errors.isActive?.message}
          />

          {(watch("isActive") || !!watch("packageIds")?.length) && !packagesLoading && (
            <Input.SelectInput
              label="Pacote Mensal"
              value={watch("packageIds")?.[0] ?? null}
              onChange={(value) => setValue("packageIds", value ? [Number(value)] : [])}
              options={packageOptions}
              placeholder="Selecione..."
              error={errors.packageIds?.message}
            />
          )}
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
