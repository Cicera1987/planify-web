"use client";

import { ChangeEvent, use, useMemo } from "react";
import { toast } from "react-toastify";
import { DecodedToken, Register, useRegisterMutation, useUpdateMutation, useUploadImageMutation } from "../services/authService";
import { useSchedulingContext } from "../context";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import jwtDecode from "jwt-decode";
import { RegisterFormInputs } from "../components/forms/formRegisterClient";
import { useGetUserByIdQuery} from "../services/usersService";

export function useRegister() {
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateMutation();
  const { setImageData, imageState } = useSchedulingContext();
  const [uploadImage] = useUploadImageMutation();
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();


  const isEditMode = isAuthenticated;

  let userId: number | null = null;

  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      userId = Number(decoded.jti);
    } catch (err) {
      console.error("Token inválido:", err);
    }
  }
  const { data: user } = useGetUserByIdQuery(userId ?? 0, { skip: !userId });
  
  async function handleRegister(data: RegisterFormInputs) {
    let imageUrl = "";

    if (imageState.file) {
      try {
        imageUrl = await uploadImage(imageState.file).unwrap();
      } catch (err) {
        console.error("Erro ao enviar imagem:", err);
        toast.error("Falha ao enviar imagem");
        return;
      }
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

    try {
      if (isEditMode && userId != null) {
        await updateUser({ userId: userId, ...payload }).unwrap();
        toast.success("Cadastrado atualizado com sucesso");
        router.push("/scheduling");
        return;
      } else {
        await registerUser(payload).unwrap();
        toast.success("Usuário cadastrado com sucesso");
        router.push("/login");
      }

      setImageData({
        image: "",
        file: undefined,
        provider: "CLOUDINARY",
        providerUserId: "",
      });
    } catch (err) {
      toast.error(
        isEditMode ? "Erro ao atualizar usuário" : "Erro ao cadastrar usuário"
      );
      console.error(err);
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
    providerUserId: string
  ) => {
    setImageData({
      image: url,
      file: undefined,
      provider,
      providerUserId,
    });
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


  return {
    handleRegister,
    handleLocalImageChange,
    handleExternalImage,
    isLoading: isRegistering || isUpdating,
    isEditMode,
    defaultValues
  };
}