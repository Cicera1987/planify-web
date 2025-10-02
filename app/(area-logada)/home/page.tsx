import HomeDesktop from "./homeDesktop";
import HomeMobile from "./homeMobile";
import Layout from "../layout/layoutPrivate";

export default function Home() {
  return (
    <Layout desktopContent={<HomeDesktop />} mobileContent={<HomeMobile />} />
  );
}
