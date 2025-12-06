'use client'

import LayoutPrivate from "../layout/layoutPrivate"
import NotificationMobile from "./notificationMobile"
import NotificationDesktop from "./notificationDesktop"

export default function Notification() {
  return (
    <LayoutPrivate
      desktopContent={<NotificationDesktop />}
      mobileContent={<NotificationMobile />}
    />
  );
}