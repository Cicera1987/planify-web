import MenuSidebar from "./menu";
import Icon from "../assets/icons";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotifications } from "@/app/store/features/notificationsSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const dispatch = useDispatch < AppDispatch > ();
  
  const unreadCount = useSelector((state: RootState) =>
    Object.values(state.notifications.notificationsByContact)
      .flat()
      .filter(n => !n.read).length
  );

  useEffect(() => {
    dispatch(fetchAllNotifications());

    const interval = setInterval(() => {
      dispatch(fetchAllNotifications());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const routeButtons = [
    {
      id: "home",
      path: "/home",
      icon: <Icon.Home />,
      label: "Início",
    },
    {
      id: "profile",
      path: "/profile",
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
      id: "jobs",
      path: "/jobs",
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
      icon: <Icon.Notification hasUnread={unreadCount > 0 } />,
      label: "Notificações",
    },
    {
      id: "financial",
      path: "/financial",
      icon: <Icon.Wallet />,
      label: "Movimento Financeiro",
    },
    {
      id: "calendar",
      path: "/calendar",
      icon: <Icon.Calendar />,
      label: "Meu calendário",
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
