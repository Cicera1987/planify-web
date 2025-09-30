"use client";

import { useParams } from "next/navigation";
import ContactDesktop from "../../contactDesktop";
import ContactMobile from "../../contactMobile";
import LayoutPrivate from "@/app/(area-logada)/layout/layoutPrivate";

export default function ContactsEdit() {
  const params = useParams();
  const contactId = params?.id ? Number(params.id) : undefined;

  return (
    <LayoutPrivate
      desktopContent={<ContactDesktop contactId={contactId} />}
      mobileContent={<ContactMobile contactId={contactId} />}
    />
  );
}
