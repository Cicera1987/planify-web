import { api, apiPublic } from "./api";

export interface DecodedToken {
  jti?: string;
  sub?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Register {
  username: string;
  phone: string;
  password?: string;
  speciality: string;
  email?: string;
  position?: "ADMIN" | "PROFESSIONAL" | "CLIENT";
  imageUrl?: string;
  active: boolean;
  provider?: "CLOUDINARY" | "GOOGLE" | "WHATSAPP";
  providerUserId?: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiPublic.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return typeof response.data === "string" ? response.data : "";
};

export const register = async (userData: Register): Promise<void> => {
  await api.post("/auth/register", { ...userData, active: true });
};

export const update = async (
  userId: string | number,
  userData: Partial<Register>,
): Promise<void> => {
  await api.patch(`/auth/${userId}`, userData);
};
