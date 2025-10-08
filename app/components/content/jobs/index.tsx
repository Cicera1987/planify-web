import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../inputs";
import Button from "../../buttons";
import TagList from "./tagList";
import "./styles.css";

interface Procedure {
  id: number;
  name: string;
  price?: string;
}

export default function JobsContent() {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Procedure>();

  const onSubmit = (data: Procedure) => {
    const isEditing = procedures.some((procedure) => procedure.id === data.id);

    if (isEditing) {
      setProcedures((prev) =>
        prev.map((p) => (p.id === data.id ? { ...p, ...data } : p)),
      );
    } else {
      const newProcedure = { ...data, id: Date.now() };
      setProcedures((prev) => [...prev, newProcedure]);
    }
    reset();
  };

  const handleDelete = (id: number) => {
    setProcedures((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (procedure: Procedure) => {
    reset(procedure);
  };

  const handleEditTag = (item: Procedure) => {
    const procedure: Procedure = {
      ...item,
      price: item.price ?? "",
    };
    handleEdit(procedure);
  };


  return (
    <div className="jobs-container">
      <TagList
        label="Procedimentos"
        items={procedures}
        onEdit={handleEditTag}
        onDelete={handleDelete}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="procedure-form">
        <h3 className="form-title">Cadastrar</h3>

        <Input.InputForm
          label="Nome"
          type="text"
          placeholder="Informe o nome do procedimento"
          {...register("name", { required: "Campo obrigatório" })}
          error={errors.name?.message}
        />

        <Input.InputForm
          label="Preço"
          type="text"
          placeholder="R$ 0,00"
          {...register("price", { required: "Campo obrigatório" })}
          error={errors.price?.message}
        />

        <Button.ButtonVariant type="submit" variant="filled" text="Cadastrar" />
      </form>
    </div>
  );
}
