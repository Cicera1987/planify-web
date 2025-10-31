"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/features/authSlice";

const OAuthSuccess = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("@planify/token", token);
      dispatch(setCredentials(token));
      router.push("/");
    }
  }, [router, dispatch]);

  return <p>Autenticando...</p>;
};

export default OAuthSuccess;
