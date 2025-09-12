"use client";

import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../services/usersService";
import jwtDecode from "jwt-decode";

interface DecodedToken {
  jti?: string;
  sub?: string;
}

export function useCurrentUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const numericUserId = Number(userId);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("@planify/token");
      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.jti || decoded.sub || null);
      }
    }
  }, []);

  const { data, isLoading, error } = useGetUserByIdQuery(numericUserId, {
    skip: !numericUserId,
  });

  return { user: data, isLoading, error };
}
