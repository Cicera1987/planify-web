"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLoginMutation, useLogoutMutation } from "../services/authService";

export function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saveToken = localStorage.getItem("@planify/token");
      if (saveToken) {
        setToken(saveToken);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginMutation({ email, password }).unwrap();
      localStorage.setItem("@planify/token", response.token);
      setToken(response.token);
      setIsAuthenticated(true);
      router.push("/home");
    } catch (error) {
      console.error("Login falhou:", error);
    }
  };

  const logout = async () => {
    try {
      await logoutMutation({}).unwrap();
    } catch (err) {
      console.warn("Erro no logout server-side", err);
    }
    localStorage.removeItem("@planify/token");
    setToken(null);
    setIsAuthenticated(false);
    router.replace("/");
  };

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
}
