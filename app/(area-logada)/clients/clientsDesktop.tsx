"use client";

import { useContact } from "@/app/hooks/useContact";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import Button from "@/app/components/buttons";
import Icon from "@/app/components/assets/icons";
import ClientCard from "@/app/components/card/clients";
import "./styles.css";
import { useSchedulingContext } from "@/app/context";

export default function ClientsDesktop() {
  const { search, openPopupId } = useSchedulingContext();
  const { handleTogglePopup, contacts, handleSelect, items } = useContact();

  return (
    <div className="main-desktop-contact">
      <div className="cards-container">
        {contacts?.map((contact) => (
          <ClientCard
            key={contact.id}
            data={contact}
            triggerIcon={
              <StatusPopup
                trigger={<Button.ButtonIcon icon={<Icon.OptionsIcon />} />}
                items={items}
                onSelect={(action) => handleSelect(action, contact)}
                isOpen={openPopupId === contact.id}
                onClose={() => handleTogglePopup(contact.id)}
                data={contact}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
