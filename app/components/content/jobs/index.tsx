import React, { useEffect, useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import Input from "../../inputs";
import Button from "../../buttons";
import "./styles.css";
import { useJobs } from "@/app/hooks/useJobs";
import { Job, JobRequest } from "@/app/services/jobService";
import Icon from "../../assets/icons";
import mask from "@/app/utils/mask";
import Tag from "../../tags";

export default function JobsContent() {
  const { jobList, addJob, editJob, removeJob, fetchJobs } = useJobs();

  const { formatCurrency, formatCurrencyInput, parseCurrency } = mask();

  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<JobRequest>({
    defaultValues: {
      name: "",
      price: "",
      duration: "",
      description: "",
    },
  });

  const price = watch("price");

  const onSubmit = async (data: JobRequest) => {
    const parsedData = {
      ...data,
      price: parseCurrency(data.price),
      duration: Number(data.duration),
    };
    if (editingJob) {
      await editJob(editingJob.id, parsedData);
      setEditingJob(null);
    } else {
      await addJob(parsedData);
    }
    reset();
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    reset(job);
  };

  const clearForm = () => {
    setEditingJob(null);
    reset({
      name: "",
      price: "",
      duration: "",
      description: "",
    });
  };

  const handleDelete = async (id: number) => {
    await removeJob(id);
    if (editingJob?.id === id) {
      setEditingJob(null);
      reset();
    }
  };

  useEffect(() => {
    fetchJobs();
    if (editingJob) {
      const price = Number(editingJob.price);
      setValue("price", price.toFixed(2));
    }
  }, [editingJob]);

  return (
    <div className="jobs-container">
      <Tag.Default
        id="tag-service"
        label="Procedimentos"
        items={jobList}
        onEdit={(item) => {
          const job = jobList.find((jlist) => jlist.id === item.id);
          if (job) handleEdit(job);
        }}
        onDelete={handleDelete}
        editingId={editingJob?.id}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="procedure-form">
        <div className="flex items-center w-full gap-2">
          <h3 className="form-title">
            {editingJob ? "Modo edição" : "Cadastrar"}
          </h3>
          {editingJob ? (
            <Button.ButtonIcon icon={<Icon.ArrowLeft />} onClick={clearForm} />
          ) : (
            ""
          )}
        </div>

        <Input.InputForm
          label="Nome"
          type="text"
          placeholder="Informe o nome do procedimento"
          {...register("name", { required: "Campo obrigatório" })}
          error={errors.name?.message}
          required
        />

        <div className="form-number">
          <Input.InputForm
            label="Preço"
            type="text"
            placeholder="R$ 0,00"
            value={formatCurrency(price)}
            {...register("price", { required: "Campo obrigatório" })}
            error={errors.price?.message}
            required
            onChange={(e) =>
              formatCurrencyInput<JobRequest>(e, setValue, "price")
            }
          />

          <Input.InputForm
            label="Tempo de atendimento"
            type="number"
            placeholder="30"
            {...register("duration", {
              required: "Preencha o tempo em minutos",
            })}
            error={errors.duration?.message}
            required
          />
        </div>
        <Input.InputForm
          label="Descrição do serviço"
          type="text"
          placeholder="Faça uma breve descrição"
          {...register("description")}
        />

        <Button.ButtonVariant
          type="submit"
          variant="filled"
          text={editingJob ? "Editar" : "Cadastrar"}
        />
      </form>
    </div>
  );
}
