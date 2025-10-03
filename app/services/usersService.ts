import { api } from "./api"; 

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  apiVersion: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  speciality: string;
  position: "ADMIN" | "PROFESSIONAL" | "CLIENT";
  imageUrl?: string;
  active: boolean;
}


export const getAllUsers = async (page = 0, size = 10): Promise<PageResponse<User>> => {
  const response = await api.get<PageResponse<User>>(`/users?page=${page}&size=${size}`);
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const searchUsers = async (params: {
  name?: string;
  speciality?: string;
  page?: number;
  size?: number;
}): Promise<PageResponse<User>> => {
  const searchParams = new URLSearchParams();
  if (params.name) searchParams.append("name", params.name);
  if (params.speciality) searchParams.append("speciality", params.speciality);
  searchParams.append("page", (params.page ?? 0).toString());
  searchParams.append("size", (params.size ?? 10).toString());

  const response = await api.get<PageResponse<User>>(`/users/search?${searchParams.toString()}`);
  return response.data;
};
