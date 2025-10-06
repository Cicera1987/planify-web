"use client";

import { useParams } from "next/navigation";
import LayoutPrivate from "../../../layout/layoutPrivate";
import ScheduleServiceDesktop from "./scheduleServiceDesktop";
import ScheduleServiceMobile from "./scheduleServiceMobile";

export default function Schedule() {
  const params = useParams();
  const contactId = params?.id ? Number(params.id) : undefined;

  return (
    <LayoutPrivate
      desktopContent={<ScheduleServiceDesktop contactId={contactId }/>}
      mobileContent={<ScheduleServiceMobile contactId={contactId} />}
    />
  );
}
