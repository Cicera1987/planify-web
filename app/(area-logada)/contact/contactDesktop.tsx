"use client";

import { useContact } from "@/app/hooks/useContact";

import ContactForm from "@/app/components/forms/formContact";
import BoxRegister from "@/app/components/content/BoxRegister";

export default function ContactDesktop({ contactId }: { contactId?: number }) {
  const {
    handleSave,
    isLoading,
    defaultValues,
    isEditMode,
    handleLocalImageChange,
  } = useContact(contactId);

return (
  <BoxRegister title="Meu Cliente">
    <ContactForm
      key={contactId}
      onSubmit={handleSave}
      loading={isLoading}
      defaultValues={defaultValues}
      buttonText={isEditMode ? "Editar" : "Enviar"}
      onImageChange={handleLocalImageChange}
    />
  </BoxRegister>
);
}
