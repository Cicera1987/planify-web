import axios, { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  withCredentials: true,
});

export const apiPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("@planify/token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;

    if (message.includes("Quantidade do serviço esgotada")) {

      return Promise.reject(new Error("O pacote selecionado foi finalizado no último serviço."));
    }

    return Promise.reject(error);
  }
);
