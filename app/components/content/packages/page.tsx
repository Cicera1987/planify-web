"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Input from "../../inputs";
import Button from "../../buttons";
import Icon from "../../assets/icons";
import mask from "@/app/utils/mask";

import { Package, PackageRequest } from "@/app/services/packagesService";
import { usePackages } from "@/app/hooks/usePackages";
import { useJobs } from "@/app/hooks/useJobs";
import {
  createPackage,
  updatePackage,
  deletePackage,
} from "@/app/services/packagesService";
import "./styles.css";
import Tag from "../../tags";

export default function PackagesContent() {
  const { packages, refetch } = usePackages();
  const { jobList, fetchJobs } = useJobs();
  const { formatCurrency, formatCurrencyInput, parseCurrency } = mask();

  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<PackageRequest>({
    defaultValues: {
      name: "",
      totalPrice: "",
      numberSessions: "",
      serviceIds: [],
      services: [],
    },
  });

  const services = watch("services") || [];
  const totalPrice = watch("totalPrice");

  const jobOptions = jobList.map((job) => ({
    value: job.id,
    label: job.name,
  }));

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    reset(pkg);
  };

  const onSubmit: SubmitHandler<PackageRequest> = async (data) => {
    const payload = {
      ...data,
      totalPrice: parseCurrency(data.totalPrice),
      serviceIds: data.services.flatMap((service) => {
        const id = typeof service === "object" ? service.id : service;
        const qty =
          typeof service === "object" && service.quantity
            ? service.quantity
            : 1;
        return Array(qty).fill(id);
      }),
      services: data.services.map((service) => ({
        id: typeof service === "object" ? service.id : service,
        quantity:
          typeof service === "object" && service.quantity
            ? service.quantity
            : 1,
      })),
    };

    if (editingPackage) {
      await updatePackage(editingPackage.id, payload);
    } else {
      await createPackage(payload);
    }

    reset();
    clearForm();
    refetch();
  };

  const clearForm = () => {
    setEditingPackage(null);
    reset({
      name: "",
      totalPrice: "",
      numberSessions: "",
      serviceIds: [],
      services: [],
    });
  };

  const handleDelete = async (id: number) => {
    await deletePackage(id);
    if (editingPackage?.id === id) clearForm();
    refetch();
  };

  useEffect(() => {
    refetch();
    if (editingPackage) {
      const totalPrice = Number(editingPackage.totalPrice);
      setValue("totalPrice", totalPrice.toFixed(2));
    }
    fetchJobs();
  }, [editingPackage]);

  return (
    <div className="pck-container">
      <Tag.Default
        id="tag-packages"
        label="Pacotes de serviços"
        items={packages}
        onEdit={(item) => {
          const pkg = packages.find((pkgs) => pkgs.id === item.id);
          if (pkg) handleEdit(pkg);
        }}
        onDelete={handleDelete}
        selectedId={editingPackage?.id}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="pck-form">
        <div className="flex items-center w-full gap-2">
          <h3 className="pck-form-title">
            {editingPackage ? "Modo edição" : "Cadastrar"}
          </h3>
          {editingPackage && (
            <Button.ButtonIcon icon={<Icon.ArrowLeft />} onClick={clearForm} />
          )}
        </div>

        <Input.InputForm
          label="Nome"
          type="text"
          placeholder="Informe o nome do pacote"
          {...register("name", { required: "Campo obrigatório" })}
          error={errors.name?.message}
          required
        />

        <div className="pck-form-number">
          <Input.InputForm
            label="Preço Total"
            type="text"
            placeholder="R$ 0,00"
            value={formatCurrency(totalPrice)}
            {...register("totalPrice", { required: "Campo obrigatório" })}
            error={errors.totalPrice?.message}
            required
            onChange={(e) =>
              formatCurrencyInput<PackageRequest>(e, setValue, "totalPrice")
            }
          />

          <Input.InputForm
            label="Número de sessões"
            type="number"
            placeholder="exemplo: 04"
            {...register("numberSessions", { required: "Campo obrigatório" })}
            error={errors.numberSessions?.message}
            required
          />
        </div>
        <Controller
          name="services"
          control={control}
          rules={{
            validate: (value) =>
              value && value.length > 0
                ? true
                : "Selecione pelo menos um serviço",
          }}
          render={({ field, fieldState }) => (
            <Input.MultSelectTag
              options={jobOptions}
              value={field.value}
              onChange={(values) => {
                const newServices = values.map((value) => ({
                  id: Number(value.id),
                  quantity: value.quantity,
                }));

                field.onChange(newServices);
              }}
              placeholder="Selecione"
              error={fieldState.error?.message}
              isEditMode={!!editingPackage}
            />
          )}
        />
        <Button.ButtonVariant
          type="submit"
          variant="filled"
          text={editingPackage ? "Editar" : "Cadastrar"}
        />
      </form>
    </div>
  );
}
