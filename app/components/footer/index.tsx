"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Icon from "../assets/icons";
import Button from "../buttons";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const buttons: {
    id: string;
    path: string;
    icon: (active: boolean) => React.ReactNode;
    label?: string;
  }[] = [
    {
      id: "home",
      path: "/home",
      icon: (active) => <Icon.InfoHome active={active} />,
      label: "Home",
    },
    {
      id: "packages",
      path: "/packages",
      icon: (active) => <Icon.InfoPackages active={active} />,
      label: "Pacotes",
    },
    {
      id: "scheduling",
      path: "/scheduling",
      icon: (active) => <Icon.InfoScheduling active={active} />,
      label: "Agenda",
    },
    {
      id: "jobs",
      path: "/jobs",
      icon: (active) => <Icon.InfoServices active={active} />,
      label: "Serviços",
    },
  ];

  return (
    <footer className="footer">
      {buttons.map(({ id, path, icon, label }) => {
        const isActive = pathname === path;

        return (
          <Button.ButtonIcon
            key={id}
            icon={icon(isActive)}
            active={isActive}
            onClick={() => router.push(path)}
            label={label}
          />
        );
      })}
    </footer>
  );
}
