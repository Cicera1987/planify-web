"use client";

import LayoutPublic from "../(area-logada)/layout/layoutPublic";

import RegisterDesktop from "./registerDesktop";
import RegisterMobile from "./registerMobile";

export default function Register() {
  return (
    <LayoutPublic
      title="Meu Cadastro"
      desktopContent={<RegisterDesktop />}
      mobileContent={<RegisterMobile />}
    />
  );
}
