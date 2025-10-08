"use client";

import Icon from "@/app/components/assets/icons";
import Button from "@/app/components/buttons";
import ClientCard from "@/app/components/card/clients";
import AlertModal from "@/app/components/modals/alert";
import { InfiniteScrollLoader } from "@/app/components/pagination/infiniteScrollLoader";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import { useContact } from "@/app/hooks/useContact";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export default function ClientsMobile({}: {
  onDelete?: (contactId: number) => void;
}) {
  const { openPopupId } = useSelector((state: RootState) => state.scheduling);

  const {
    handleTogglePopup,
    contacts,
    handleSelect,
    items,
    isLoading,
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
      <InfiniteScrollLoader
        observerTarget={observerTarget}
        isFetching={isLoading}
        hasMore={hasMore}
      />
      <AlertModal ref={alertRef} />
    </div>
  );
}
