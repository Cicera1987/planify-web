"use client";

import ContactForm from "@/app/components/forms/formContact";
import { useContact } from "@/app/hooks/useContact";
import React from "react";

export default function ContactMobile({ contactId }: { contactId?: number }) {
  const {
    handleSave,
    isLoading,
    defaultValues,
    isEditMode,
    handleLocalImageChange,
  } = useContact(contactId);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <ContactForm
          key={contactId}
          onSubmit={handleSave}
          loading={isLoading}
          defaultValues={defaultValues}
          buttonText={isEditMode ? "Editar" : "Enviar"}
          onImageChange={handleLocalImageChange}
        />
      </div>
    </div>
  );
}
