
import BoxRegister from "@/app/components/content/BoxRegister";
import CalendarContent from "@/app/components/content/calendar/page";

export default function CalendarDesktop() {
  console.log("Renderizando BoxRegister");

  return (
    <BoxRegister title="Calendário">
      <CalendarContent />
    </BoxRegister>
  );
}
