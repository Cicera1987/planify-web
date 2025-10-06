import React, { useCallback, useEffect, useMemo, useRef, useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useSchedulingContext, useContactsContext } from "../context";
import Icon from "../components/assets/icons";
import { useRouter } from "next/navigation";
import { usePagination } from "./usePaginatiojn";
import useQueryHook from "./useQuereryHook";
import * as contactApi from "../services/contactService";
import {AlertRef} from "../components/modals/alert";

export function useContact(contactId?: number) {
  const router = useRouter();
  const alertRef = useRef<AlertRef>(null);
  const isEditMode = Boolean(contactId);

  const { search, setOpenPopupId, setImageData, imageState } = useSchedulingContext();
  const { contacts, setContacts } = useContactsContext();

  const [isLoadingContactId, setIsLoadingContactId] = useState(false);

  const [contactDataId, setContactDataId] = useState < contactApi.Contact | null > (null);

  useEffect(() => {
    if (isEditMode && contactId) {
      setIsLoadingContactId(true);
      contactApi.getContactById(contactId)
        .then(setContactDataId)
        .finally(() => setIsLoadingContactId(false));
    }
  }, [isEditMode, contactId]);


  const { items, isLoading, isFetching, hasMore, observerTarget, totalElements, reset } =
    usePagination < contactApi.Contact > (useQueryHook, 10);

  useEffect(() => {
    setContacts(items);
  }, [items, setContacts]);

  useEffect(() => {
    reset();
  }, [search, reset]);

  const handleSelect = useCallback(
    (action: string, contact: contactApi.Contact) => {
      if (action === "edit") router.push(`/contact/${contact.id}/edit`);
      else if (action === "schedule") router.push(`/contact/${contact.id}/schedule`);
      else if (action === "delete") handleDelete(contact.id);
    },
    [router]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!alertRef.current) return toast.error("Erro ao abrir modal de confirmação");

      alertRef.current.open({
        title: "Tem certeza que deseja inativar este contato?",
        icon: <Icon.AlertCircle />,
        confirmText: "Inativar",
        cancelText: "Cancelar",
        onConfirm: async () => {
          try {
            await contactApi.deleteContact(id);
            setContacts(contacts.filter(c => c.id !== id));
            toast.success("Contato inativado com sucesso");
            reset();
          } catch {
            toast.error("Erro ao inativar contato");
          }
        },
      });
    },
    [contacts, setContacts, reset]
  );

  const handleSave = useCallback(
    async (data: contactApi.ContactFormInputs) => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("phone", data.phone.replace(/\D/g, ""));
        if (data.email) formData.append("email", data.email);
        if (data.observation) formData.append("observation", data.observation);
        if (data.gender) formData.append("gender", data.gender.toUpperCase());
        if (imageState.file) formData.append("file", imageState.file);
        else if (imageState.image?.startsWith("http")) formData.append("imageUrl", imageState.image);
        if (data.packageIds?.length) data.packageIds.forEach(id => formData.append("packageIds", String(id)));

        if (isEditMode && contactId) {
          const updated = await contactApi.updateContact(contactId, formData);
          setContacts(contacts.map(c => (c.id === contactId ? updated : c)));
          toast.success("Contato atualizado com sucesso");
        } else {
          const created = await contactApi.createContact(formData);
          setContacts([created, ...contacts]);
          toast.success("Contato criado com sucesso");
        }

        router.push("/clients");
        setImageData({ image: "", file: undefined, provider: "CLOUDINARY", providerUserId: "" });
        reset();
      } catch {
        toast.error(isEditMode ? "Erro ao atualizar contato" : "Erro ao criar contato");
      }
    },
    [isEditMode, contactId, contacts, router, setContacts, setImageData, imageState, reset]
  );

  const handleLocalImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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
    },
    [setImageData]
  );

  const defaultValues = useMemo(() => {
    if (isEditMode && contactDataId) {
      return {
        name: contactDataId.name || "",
        phone: contactDataId.phone || "",
        email: contactDataId.email || "",
        observation: contactDataId.observation || "",
        gender: contactDataId.gender || "",
        imageUrl: contactDataId.imageUrl || "",
        packageIds: contactDataId.packageIds || [],
      };
    }
    return {};
  }, [isEditMode, contactDataId]);

  const handleTogglePopup = (id: number) => setOpenPopupId(prev => (prev === id ? null : id));

  const itemsContacts = [
    { value: "edit", label: "Editar contato", icon: <Icon.EditUser /> },
    { value: "schedule", label: "Agendar atendimento", icon: <Icon.Calendar /> },
    { value: "delete", label: "Inativar Contato", icon: <Icon.InactivateUser /> },
  ];

  return {
    handleSave,
    handleLocalImageChange,
    isLoading: isLoading || isLoadingContactId,
    isEditMode,
    defaultValues,
    contacts,
    handleTogglePopup,
    handleSelect,
    items: itemsContacts,
    isFetching,
    hasMore,
    observerTarget,
    totalElements,
    handleDelete,
    alertRef,
    contactDataId,
  };
}
