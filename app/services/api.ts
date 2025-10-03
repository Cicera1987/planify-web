import axios from "axios";
import { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("@planify/token");
    if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});
