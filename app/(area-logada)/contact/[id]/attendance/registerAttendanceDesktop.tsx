"use client";
import { useContact } from "@/app/hooks/useContact";
import BoxRegister from "@/app/components/content/BoxRegister";
import { RegisterAttendance } from "@/app/components/registerAttendance";

export default function RegisterAttendanceDesktop({
  contactId,
}: {
  contactId?: number;
}) {
  const { contactDataId } = useContact(contactId);

  return (
    <BoxRegister title="Agendar atendimento">
      <RegisterAttendance contactDataId={contactDataId} />
    </BoxRegister>
  );
}
