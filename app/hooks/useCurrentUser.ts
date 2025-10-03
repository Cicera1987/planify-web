"use client";

import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { DecodedToken} from "../services/authService";
import { User, getUserById } from "../services/usersService";

interface UseCurrentUserResult {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export function useCurrentUser(): UseCurrentUserResult {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const numericUserId = Number(userId);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("@planify/token");
    if (!token) return;

    const decoded: DecodedToken = jwtDecode(token);
    setUserId(decoded.jti || decoded.sub || null);
  }, []);

  useEffect(() => {
    if (!numericUserId) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const fetchUser = async () => {
      try {
        const result = await getUserById(numericUserId);
        if (isMounted) setUser(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (isMounted) setError(err?.message || "Erro ao buscar usuário");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [numericUserId]);

  return { user, isLoading, error };
}
