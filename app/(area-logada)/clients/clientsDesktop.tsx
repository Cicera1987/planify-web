"use client";

import { useContact } from "@/app/hooks/useContact";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import Button from "@/app/components/buttons";
import Icon from "@/app/components/assets/icons";
import ClientCard from "@/app/components/card/clients";
import "./styles.css";
import { useSchedulingContext } from "@/app/context/schedulingProvaider";
import { InfiniteScrollLoader } from "@/app/components/pagination/infiniteScrollLoader";
import AlertModal from "@/app/components/modals/alert";

export default function ClientsDesktop({}: {
  onDelete?: (contactId: number) => void;
}) {
  const { openPopupId } = useSchedulingContext();
  const {
    handleTogglePopup,
    contacts,
    handleSelect,
    items,
    isLoading,
    isFetching,
    hasMore,
    observerTarget,
    alertRef,
  } = useContact();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Icon.Loading size="md" borderWidth="md" />
      </div>
    );
  }

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
        <InfiniteScrollLoader
          observerTarget={observerTarget}
          isFetching={isFetching}
          hasMore={hasMore}
        />
      </div>

      <AlertModal ref={alertRef} />
    </div>
  );
}
