"use client";

import type { RegisterFormInputs } from "../components/forms/formRegisterClient";
import { useRouter } from "next/navigation";
import {
  type RegisterRequest,
  useRegisterMutation,
  useUploadImageMutation,
} from "../services/authService";
import { toast } from "react-toastify";
import { useSchedulingContext } from "../context";
import type { ChangeEvent } from "react";

export function useRegister() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  const { setImageData, imageState } = useSchedulingContext();
  const [uploadImage] = useUploadImageMutation();

  async function handleRegister(data: RegisterFormInputs) {
    let imageUrl = "";
    if (imageState.file) {
      try {
        imageUrl = await uploadImage(imageState.file).unwrap();
        console.log("Imagem enviada com sucesso:", imageUrl);
      } catch (err) {
        console.error("Erro ao enviar imagem:", err);
        toast.error("Falha ao enviar imagem");
        return;
      }
    } else if (imageState.image && imageState.image.startsWith("http")) {
      imageUrl = imageState.image;
    }

    const payload: RegisterRequest = {
      username: data.username,
      phone: data.phone?.replace(/\D/g, "") || "",
      password: data.password,
      speciality: data.speciality || "",
      email: data.email,
      active: true,
      ...(imageUrl && { imageUrl }),
      provider: imageState.provider || "CLOUDINARY",
      providerUserId: imageState.providerUserId || "",
    };

    try {
      await registerUser(payload).unwrap();
      toast.success("Usuário cadastrado com sucesso");
      router.push("/login");
      setImageData({
        image: "",
        file: undefined,
        provider: "CLOUDINARY",
        providerUserId: "",
      });
    } catch (err) {
      console.error("Erro ao registrar:", err);
      toast.error("Erro ao registrar usuário");
    }
  }

  const handleLocalImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData({
        image: reader.result as string,
        file,
        provider: "CLOUDINARY",
        providerUserId: "",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleExternalImage = (
    url: string,
    provider: "GOOGLE" | "WHATSAPP",
    providerUserId: string,
  ) => {
    setImageData({
      image: url,
      file: undefined,
      provider,
      providerUserId,
    });
  };

  return {
    handleRegister,
    handleLocalImageChange,
    handleExternalImage,
    isLoading,
  };
}
