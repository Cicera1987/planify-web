"use client";
import { useContact } from "@/app/hooks/useContact";
import { RegisterAttendance } from "@/app/components/registerAttendance";

export default function RegisterAttendanceMobile({
  contactId,
}: {
  contactId?: number;
}) {
  const { contactDataId } = useContact(contactId);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <RegisterAttendance contactDataId={contactDataId} />
      </div>
    </div>
  );
}
