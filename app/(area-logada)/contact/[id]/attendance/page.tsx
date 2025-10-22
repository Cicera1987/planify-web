"use client";

import { useParams } from "next/navigation";
import LayoutPrivate from "../../../layout/layoutPrivate";
import RegisterAttendanceDesktop from "./registerAttendanceDesktop";
import RegisterAttendanceMobile from "./registerAttendanceMobile";

export default function Attendance() {
  const params = useParams();
  const contactId = params?.id ? Number(params.id) : undefined;

  return (
    <LayoutPrivate
      desktopContent={<RegisterAttendanceDesktop contactId={contactId} />}
      mobileContent={<RegisterAttendanceMobile contactId={contactId} />}
    />
  );
}
