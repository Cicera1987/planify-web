"use client";

import { ChangeEvent, useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RegisterFormInputs } from "../components/forms/formUser";
import { useSchedulingContext } from "../context/schedulingProvaider";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import jwtDecode from "jwt-decode";
import { DecodedToken, Register, register, update } from "../services/authService";
import { uploadImage } from "../services/authService";
import { User, getUserById } from "../services/usersService";

export function useRegister({ isEditMode = false }: { isEditMode?: boolean } = {}) {
  const { setImageData, imageState } = useSchedulingContext();
  const { token } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  let userId: number | null = null;
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      userId = Number(decoded.jti);
    } catch (err) {
      console.error("Token inválido:", err);
    }
  }

  useEffect(() => {
    if (isEditMode && userId) {
      getUserById(userId)
        .then(setUser)
        .catch(err => console.error("Erro ao buscar usuário:", err));
    }
  }, [isEditMode, userId]);

  const handleRegister = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    try {
      let imageUrl = "";

      if (imageState.file) {
        imageUrl = await uploadImage(imageState.file);
      } else if (imageState.image && imageState.image.startsWith("http")) {
        imageUrl = imageState.image;
      }

      const payload: Register = {
        username: data.username,
        phone: data.phone?.replace(/\D/g, "") || "",
        speciality: data.speciality || "",
        email: data.email,
        active: true,
        ...(imageUrl && { imageUrl }),
        provider: imageState.provider || "CLOUDINARY",
        providerUserId: imageState.providerUserId || "",
        ...(!isEditMode && { password: data.password }),
      };

      if (isEditMode && userId) {
        await update(userId, payload);
        toast.success("Cadastro atualizado com sucesso");
        return;
      } else {
        await register(payload);
        toast.success("Usuário cadastrado com sucesso");
        router.push("/login");
      }

      setImageData({ image: "", file: undefined, provider: "CLOUDINARY", providerUserId: "" });
    } catch (err) {
      toast.error(isEditMode ? "Erro ao atualizar usuário" : "Erro ao cadastrar usuário");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocalImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData({ image: reader.result as string, file, provider: "CLOUDINARY", providerUserId: "" });
    };
    reader.readAsDataURL(file);
  };

  const handleExternalImage = (url: string, provider: "GOOGLE" | "WHATSAPP", providerUserId: string) => {
    setImageData({ image: url, file: undefined, provider, providerUserId });
  };

  const defaultValues = useMemo(() => {
    if (isEditMode && user) {
      return {
        imageUrl: user.imageUrl || "",
        username: user.username || "",
        email: user.email || "",
        confirmEmail: user.email || "",
        phone: user.phone || "",
        speciality: user.speciality || "",
      };
    }
    return {};
  }, [isEditMode, user]);

  return { handleRegister, handleLocalImageChange, handleExternalImage, isLoading, isEditMode, defaultValues };
}
