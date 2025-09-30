"use client";

import { useContact } from "@/app/hooks/useContact";
import "./styles.css";
import ContactForm from "@/app/components/forms/formContact";

export default function ContactDesktop({ contactId }: { contactId?: number }) {
  const { handleSave, isLoading, defaultValues, isEditMode } =
    useContact(contactId);

  return (
    <div className="contact-container">
      <div className="desktop-contact">
        <div className="background-contact-dark"></div>
        <div className="background-contact-light">
          <div className="light-contact-header">
            <h1 className="app-contact-title">Meu Cliente</h1>
          </div>
        </div>

        <div className="form-contact-container">
          <ContactForm
            onSubmit={handleSave}
            loading={isLoading}
            defaultValues={defaultValues}
            buttonText={isEditMode ? "Editar" : "Enviar"}
          />
        </div>
      </div>
    </div>
  );
}
