import BoxLayout from "./components/boxLayout";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import "./globals.css";

export default function Home() {
  return (
    <BoxLayout sidebar={<Sidebar />} header={<Header nome="Cícera" />}>
      {/*Aqui vai o conteúdo da página.*/}
      <h1>Atendimentos</h1>
    </BoxLayout>
  );
}
