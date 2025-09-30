"use client";

import Icon from "@/app/components/assets/icons";
import Button from "@/app/components/buttons";
import ClientCard from "@/app/components/card/clients";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import { useSchedulingContext } from "@/app/context";
import { useContact } from "@/app/hooks/useContact";

export default function ClientsMobile() {
  const { openPopupId } = useSchedulingContext();
  const { handleTogglePopup, contacts, handleSelect, items } = useContact();

  return (
    <div className="main-mobile-contact">
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
  );
}
