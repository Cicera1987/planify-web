"use client";

import { ChangeEvent, useMemo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RegisterFormInputs } from "../components/forms/formUser";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import jwtDecode from "jwt-decode";
import {
  DecodedToken,
  Register,
  register,
  update,
} from "../services/authService";
import { uploadImage } from "../services/authService";
import { getUserById } from "../services/usersService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setImageState, setIsLoading } from "../store/features/schedulingSlice";
import { setCurrentUser } from "../store/features/usersSlice";

export function useRegister({ isEditMode = false }: { isEditMode?: boolean } = {}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useAuth();

  const { imageState, isLoading } = useSelector((state: RootState) => state.scheduling);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [localFile, setLocalFile] = useState<File | null>(null);

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
        .then((user) => dispatch(setCurrentUser(user)))
        .catch((err) => console.error("Erro ao buscar usuário:", err));
    }
  }, [isEditMode, userId, dispatch]);

  useEffect(() => {
    if (!isEditMode) {
      dispatch(
        setImageState({
          image: "",
          provider: "CLOUDINARY",
          providerUserId: "",
        })
      );
      setLocalFile(null);
    }
  }, [isEditMode, dispatch]);

  const handleRegister = async (data: RegisterFormInputs) => {
    dispatch(setIsLoading(true));
    try {
      let imageUrl = "";

      if (localFile) {
        imageUrl = await uploadImage(localFile);
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
      console.log("payload: ", payload);

      if (isEditMode && userId) {
        await update(userId, payload);
        toast.success("Cadastro atualizado com sucesso");
        dispatch(
          setCurrentUser({
            id: userId,
            username: payload.username,
            phone: payload.phone,
            email: payload.email || "",
            speciality: payload.speciality,
            imageUrl: payload.imageUrl,
            active: payload.active,
            position: currentUser?.position || "PROFESSIONAL",
          })
        );
      } else {
        await register(payload);
        toast.success("Usuário cadastrado com sucesso");
        router.push("/login");
      }

      dispatch(
        setImageState({
          image: "",
          provider: "CLOUDINARY",
          providerUserId: "",
        })
      );
      setLocalFile(null);
    } catch (err) {
      toast.error(
        isEditMode ? "Erro ao atualizar usuário" : "Erro ao cadastrar usuário"
      );
      console.error(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleLocalImageRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLocalFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        setImageState({
          image: reader.result as string,
          provider: "CLOUDINARY",
          providerUserId: "",
        })
      );
    };
    reader.readAsDataURL(file);
  };

  const handleExternalImage = (
    url: string,
    provider: "GOOGLE" | "WHATSAPP",
    providerUserId: string
  ) => {
    setLocalFile(null);
    dispatch(
      setImageState({ image: url, provider, providerUserId })
    );
  };

  const defaultValues = useMemo(() => {
    if (isEditMode && currentUser) {
      return {
        imageUrl: currentUser.imageUrl || "",
        username: currentUser.username || "",
        email: currentUser.email || "",
        confirmEmail: currentUser.email || "",
        phone: currentUser.phone || "",
        speciality: currentUser.speciality || "",
      };
    }
    return {};
  }, [isEditMode, currentUser]);

  
  useEffect(() => {
    if (currentUser?.imageUrl) {
      dispatch(
        setImageState({
          image: currentUser.imageUrl,
          file: null,
          provider: currentUser.provider || "CLOUDINARY",
          providerUserId: currentUser.providerUserId || "",
        })
      );
    }
  }, [currentUser, dispatch]);


  return {
    handleRegister,
    handleLocalImageRegister,
    handleExternalImage,
    isLoading,
    isEditMode,
    defaultValues,
    imageState,
  };
}