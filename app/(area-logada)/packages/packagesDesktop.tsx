import PackagesContent from "@/app/components/content/packages/page";
import BoxRegister from "@/app/components/content/BoxRegister";

export default function PackagesDesktop() {
  console.log("Renderizando BoxRegister");

  return (
    <BoxRegister title="Pacotes de serviços">
      <PackagesContent />
    </BoxRegister>
  );
}
