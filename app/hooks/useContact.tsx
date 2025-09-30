"use client";

import { ChangeEvent, useMemo } from "react";
import { toast } from "react-toastify";
import {
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useGetContactsQuery,
} from "../services/contactService";
import { useSchedulingContext } from "../context";
import Icon from "../components/assets/icons";
import { useRouter } from "next/navigation";

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
  const { setImageData, imageState, setOpenPopupId } = useSchedulingContext();
  const isEditMode = Boolean(contactId);
  const { data: contactsResponse } = useGetContactsQuery({ page: 0, size: 20 });
  const contacts = contactsResponse?.content ?? [];
  const router = useRouter();

  function handleSelect(action: string, contact: Contact) {
    if (action === "edit") {
      router.push(`/contact/${contact.id}/edit`);
    } else if (action === "scheduling") {
      router.push(`/scheduling/${contact.id}`);
    }
  }

  const itemsContacts = [
    {
      value: "edit",
      label: "Editar Perfil",
      icon: <Icon.UseContact />,
    },
    {
      value: "sheduling",
      label: "Agendar atendimento",
      icon: <Icon.Calendar />,
    },
  ];

  async function handleSave(data: ContactFormInputs) {
    let imageUrl = "";

    if (imageState.file) {
      try {
        imageUrl = imageState.file.name;
      } catch (err) {
        console.error("Erro ao enviar imagem:", err);
        toast.error("Falha ao enviar imagem");
        return;
      }
    } else if (imageState.image && imageState.image.startsWith("http")) {
      imageUrl = imageState.image;
    }

    const payload: ContactFormInputs = {
      ...data,
      phone: data.phone?.replace(/\D/g, "") || "",
      ...(imageUrl && { imageUrl }),
      packageIds:
        data.packageIds && data.packageIds.length > 0 ? data.packageIds : [0],
      gender: data.gender?.toUpperCase()
    };

    try {
      if (isEditMode && contactId) {
        await updateContact({ id: contactId, data: payload }).unwrap();
        toast.success("Contato atualizado com sucesso");
      } else {
        await createContact(payload).unwrap();
        toast.success("Contato criado com sucesso");
        router.push("/clients");
      }

      setImageData({
        image: "",
        file: undefined,
        provider: "CLOUDINARY",
        providerUserId: "",
      });
    } catch (err) {
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
    if (isEditMode && contacts && contactId) {
      const contact = contacts.find((c) => c.id === contactId);
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
    deleteContact,
    contacts,
    handleTogglePopup,
    handleSelect,
    items: itemsContacts,
  };
}
