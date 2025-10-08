"use client";
import { ScheduleContact } from "@/app/components/schedule";
import { useContact } from "@/app/hooks/useContact";
import React from "react";

export default function ScheduleServiceMobile({
  contactId,
}: {
  contactId?: number;
}) {
  const { contactDataId } = useContact(contactId);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <ScheduleContact contactDataId={contactDataId} />
      </div>
    </div>
  );
}
