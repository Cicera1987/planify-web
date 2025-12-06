"use client";

import { useContact } from "@/app/hooks/useContact";
import { StatusPopup } from "@/app/components/popup/statusPopup";
import Button from "@/app/components/buttons";
import Icon from "@/app/components/assets/icons";
import ClientCard from "@/app/components/card/clients";
import "./styles.css";
import { InfiniteScrollLoader } from "@/app/components/pagination/infiniteScrollLoader";
import AlertModal from "@/app/components/modals/alert";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";

export default function ClientsDesktop({}: {
  onDelete?: (contactId: number) => void;
}) {

  const { openPopupId } = useSelector((state: RootState) => state.scheduling);
  const router = useRouter();
  
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

  const listToRender = contacts ;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Icon.Loading size="md" borderWidth="md" />
      </div>
    );
  }
  return (
    <div className="main-desktop-contact scroll-box">
      <div className="cards-container">
        {listToRender?.map((contact) => (
          <ClientCard
            className="cursor-pointer"
            key={contact.id}
            data={contact}
            triggerIcon={
               <div onClick={(e) => e.stopPropagation()}>
              <StatusPopup
                trigger={<Button.ButtonIcon icon={<Icon.OptionsIcon />} />}
                items={items}
                onSelect={(action) => handleSelect(action, contact)}
                isOpen={openPopupId === contact.id}
                onClose={() => handleTogglePopup(contact.id)}
                data={contact}
              />
            </div>
            }
            onClick={() => router.push(`/contact/${contact.id}/schedule`)}
          />
        ))}
        <InfiniteScrollLoader
          observerTarget={observerTarget}
          isFetching={isLoading}
          hasMore={hasMore}
        />
      </div>

      <AlertModal ref={alertRef} />
    </div>
  );
}
