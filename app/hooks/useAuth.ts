"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setCredentials,
  logout as logoutAction,
} from "../store/features/authSlice";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { error } from "console";

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("@planify/token");
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
        dispatch(setCredentials(savedToken));
      }
    }
  }, [dispatch]);

  const login = useCallback(
    async (email: string, password: string) => {
      setApiError(null);
      try {
        const res = await api.post<{ token: string }>("/auth/login", {
          email,
          password,
        });
        const pureToken = res.data.token.replace(/^Bearer\s+/i, "");
        setToken(pureToken);
        setIsAuthenticated(true);
        localStorage.setItem("@planify/token", pureToken);
        dispatch(setCredentials(pureToken));
        router.push("/home");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Login falhou:", err);
        toast.error(
          err?.response?.data?.message ||
          "Erro ao fazer login. Verifique suas credenciais."
        );
        setApiError(
          err?.response?.data?.message ||
            "Erro ao fazer login. Tente novamente.",
        );
      }
    },
    [dispatch, router],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("@planify/token");
    setToken(null);
    setIsAuthenticated(false);
    dispatch(logoutAction());
    router.replace("/");
  }, [dispatch, router]);

  return { token, isAuthenticated, apiError, login, logout };
}
