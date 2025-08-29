import Layout from "../layout/page";

export default function Sheduling() {
  return (
    <Layout
      desktopContent={<h1>Atendimentos (versão desktop)</h1>}
      mobileContent={<h1>Atendimentos (versão mobile)</h1>}
    />
  );
}
