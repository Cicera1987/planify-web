import MenuSidebar from "./menu";
import Icon from "../assets/icons";

export default function Sidebar() {
  const routeButtons = [
    { id: "profile", icon: <Icon.UseIcon />, label: "Ver Perfil" },
    { id: "scheduling", icon: <Icon.Scheduling />, label: "Agenda" },
    { id: "clients", icon: <Icon.UseContact />, label: "Meus Clientes" },
    {
      id: "packages",
      icon: <Icon.PackagesServices />,
      label: "Pacotes de Serviços",
    },
    { id: "services", icon: <Icon.Services />, label: "Serviços" },
    { id: "reports", icon: <Icon.Reporter />, label: "Relatórios" },
    { id: "Notification", icon: <Icon.Notification />, label: "Notificações" },
    { id: "financial", icon: <Icon.Wallet />, label: "Movimento Financeiro" },
    { id: "logout", icon: <Icon.Logout />, label: "Trocar Senha" },
  ];

  const actionButtons = [
    { id: "fac", icon: <Icon.Exclamation />, label: "Ajuda" },
    { id: "logout", icon: <Icon.ToGoOut />, label: "Sair" },
  ];

  return (
    <MenuSidebar
      title="Planify"
      routeButtons={routeButtons}
      actionButtons={actionButtons}
    />
  );
}
