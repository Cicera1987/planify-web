"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setCredentials,
  logout as logoutAction,
} from "../store/features/authSlice";
import { useLoginMutation, useLogoutMutation } from "../services/authService";

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

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
        const response = await loginMutation({ email, password }).unwrap();
        const pureToken = response.token.replace(/^Bearer\s+/i, "");
        setToken(pureToken);
        setIsAuthenticated(true);
        localStorage.setItem("@planify/token", pureToken);
        dispatch(setCredentials(pureToken));
        router.push("/scheduling");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Login falhou:", error);
        setApiError(
          error?.data?.message || "Erro ao fazer login. Tente novamente.",
        );
      }
    },
    [loginMutation, dispatch, router],
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch (err) {
      console.warn("Erro no logout server-side", err);
    }
    localStorage.removeItem("@planify/token");
    setToken(null);
    setIsAuthenticated(false);
    dispatch(logoutAction());
    router.replace("/");
  }, [logoutMutation, dispatch, router]);

  return { token, isAuthenticated, apiError, login, logout };
}
