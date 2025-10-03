"use client";

import React, { ChangeEvent, use, useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import {
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
  Contact,
} from "../services/contactService";
import { useSchedulingContext } from "../context";
import Icon from "../components/assets/icons";
import { useRouter } from "next/navigation";
import { usePagination } from "./usePaginatiojn";
import { AlertRef } from "../components/modals/alert";
import useQueryHook from "./useQuereryHook";

export interface ContactFormInputs {
  name: string;
  phone: string;
  email?: string;
  observation?: string;
  gender?: string;
  imageUrl?: string;
  packageIds?: number[];
}

export function useContact(contactId?: number) {
  const [createContact, { isLoading: isCreating }] = useCreateContactMutation();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const { setImageData, imageState, setOpenPopupId, search } =
    useSchedulingContext();
  const isEditMode = Boolean(contactId);
  const router = useRouter();
  const alertRef = useRef<AlertRef>(null);

  const {
    items: contacts,
    isLoading: isLoadingContacts,
    isFetching,
    hasMore,
    observerTarget,
    totalElements,
    reset,
  } = usePagination < Contact > (useQueryHook, 10);

  useEffect(() => {
    reset();
  }, [search, reset]);

  function handleSelect(action: string, contact: Contact) {
    if (action === "edit") {
      router.push(`/contact/${contact.id}/edit`);
    } else if (action === "scheduling") {
      router.push(`/scheduling/${contact.id}`);
    } else if (action === "delete") {
      handleDelete(contact.id);
    }
  }

  const handleDelete = (contactId: number) => {
    if (!alertRef.current) {
      toast.error("Erro ao abrir modal de confirmação");
      return;
    }

    alertRef.current.open({
      title: "Tem certeza que deseja inativar este contato?",
      icon: <Icon.AlertCircle />,
      confirmText: "Inativar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        try {
          await deleteContact(contactId).unwrap();
          toast.success("Contato inativado com sucesso");
          reset();
        } catch (error) {
          toast.error("Erro ao inativar contato");
        }
      },
    });
  };

  const itemsContacts = [
    {
      value: "edit",
      label: "Editar contato",
      icon: <Icon.EditUser />,
    },
    {
      value: "sheduling",
      label: "Agendar atendimento",
      icon: <Icon.Calendar />,
    },
    {
      value: "delete",
      label: "Inativar Contato",
      icon: <Icon.InactivateUser />,
    },
  ];

  async function handleSave(data: ContactFormInputs) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone.replace(/\D/g, ""));
      if (data.email) formData.append("email", data.email);
      if (data.observation) formData.append("observation", data.observation);
      if (data.gender) formData.append("gender", data.gender.toUpperCase());

      if (imageState.file) {
        formData.append("file", imageState.file);
      } else if (imageState.image && imageState.image.startsWith("http")) {
        formData.append("imageUrl", imageState.image);
      }

      if (data.packageIds?.length) {
        data.packageIds.forEach((id) =>
          formData.append("packageIds", String(id)),
        );
      }

      if (isEditMode && contactId) {
        await updateContact({ id: contactId, data: formData }).unwrap();
        router.push("/clients");
        toast.success("Contato atualizado com sucesso");
      } else {
        await createContact(formData).unwrap();
        router.push("/clients");
        toast.success("Contato criado com sucesso");
      }

      setImageData({
        image: "",
        file: undefined,
        provider: "CLOUDINARY",
        providerUserId: "",
      });
    } catch (err: unknown) {
      toast.error(
        isEditMode ? "Erro ao atualizar contato" : "Erro ao criar contato",
      );
      console.error(err);
    }
  }

  const handleLocalImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData({
        image: reader.result as string,
        file,
        provider: "CLOUDINARY",
        providerUserId: "",
      });
    };
    reader.readAsDataURL(file);
  };
  
  const defaultValues = useMemo(() => {
    if (isEditMode && contactId) {
      const contact = contacts.find((cnt) => cnt.id === contactId);
      if (contact) {
        return {
          name: contact.name || "",
          phone: contact.phone || "",
          email: contact.email || "",
          observation: contact.observation || "",
          gender: contact.gender || "",
          imageUrl: contact.imageUrl || "",
          packageIds: contact.packageIds || [],
        };
      }
    }
    return {};
  }, [isEditMode, contacts, contactId]);
  
  function handleTogglePopup(id: number) {
    setOpenPopupId((prev) => (prev === id ? null : id));
  }

  return {
    handleSave,
    handleLocalImageChange,
    isLoading: isCreating || isUpdating || isDeleting,
    isEditMode,
    defaultValues,
    contacts,
    handleTogglePopup,
    handleSelect,
    items: itemsContacts,
    isLoadingContacts,
    isFetching,
    hasMore,
    observerTarget,
    totalElements,
    handleDelete,
    alertRef,
  };
}
