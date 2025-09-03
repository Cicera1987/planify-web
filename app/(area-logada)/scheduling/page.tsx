import Layout from "../layout/page";
import SchedulingDesktop from "./schedulingDesktop";
import SchedulingMobile from "./schedulingMobile";

export default function Sheduling() {
  return (
    <Layout
      desktopContent={<SchedulingDesktop />}
      mobileContent={<SchedulingMobile />}
    />
  );
}
