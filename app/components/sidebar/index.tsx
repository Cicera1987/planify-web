import MenuSidebar from "./menu";
import Icon from "../assets/icons";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const routeButtons = [
    {
      id: "profile",
      path: "/register",
      icon: <Icon.UseIcon />,
      label: "Ver Perfil",
    },
    {
      id: "scheduling",
      path: "/scheduling",
      icon: <Icon.Scheduling />,
      label: "Agenda",
    },
    {
      id: "clients",
      path: "/clients",
      icon: <Icon.UseContact />,
      label: "Meus Clientes",
    },
    {
      id: "packages",
      path: "/packages",
      icon: <Icon.PackagesServices />,
      label: "Pacotes de Serviços",
    },
    {
      id: "services",
      path: "/services",
      icon: <Icon.Services />,
      label: "Serviços",
    },
    {
      id: "reports",
      path: "/reports",
      icon: <Icon.Reporter />,
      label: "Relatórios",
    },
    {
      id: "notification",
      path: "/notification",
      icon: <Icon.Notification />,
      label: "Notificações",
    },
    {
      id: "financial",
      path: "/financial",
      icon: <Icon.Wallet />,
      label: "Movimento Financeiro",
    },
    {
      id: "password",
      path: "/password",
      icon: <Icon.Logout />,
      label: "Trocar Senha",
    },
  ];

  const actionButtons = [
    { id: "fac", path: "/help", icon: <Icon.Exclamation />, label: "Ajuda" },
    {
      id: "logout",
      path: "#",
      icon: <Icon.ToGoOut />,
      label: "Sair",
      onClick: logout,
    },
  ];

  return (
    <MenuSidebar
      title="Planify"
      routeButtons={routeButtons.map((btn) => ({
        ...btn,
        onClick: () => router.push(btn.path),
        active: pathname === btn.path,
      }))}
      actionButtons={actionButtons.map((btn) => ({
        ...btn,
        active: pathname === btn.path,
      }))}
    />
  );
}
