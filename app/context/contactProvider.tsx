"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Contact } from "@/app/services/contactService";

interface ContactsContextType {
    contacts: Contact[];
    setContacts: (contacts: Contact[]) => void;
}

const ContactsContext = createContext < ContactsContextType | undefined > (undefined);

export function ContactsProvider({ children }: { children: ReactNode }) {
    const [contacts, setContacts] = useState < Contact[] > ([]);
    return (
        <ContactsContext.Provider value={{ contacts, setContacts }}>
            {children}
        </ContactsContext.Provider>
    );
}

export const useContactsContext = () => {
    const context = useContext(ContactsContext);
    if (!context) throw new Error("useContactsContext must be used within ContactsProvider");
    return context;
};
