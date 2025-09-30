import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API } from "./api";

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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("@planify/token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      PageResponse<User>,
      { page?: number; size?: number }
    >({
      query: ({ page = 0, size = 10 }) => `/users?page=${page}&size=${size}`,
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    searchUsers: builder.query<
      PageResponse<User>,
      { name?: string; speciality?: string; page?: number; size?: number }
    >({
      query: ({ name, speciality, page = 0, size = 10 }) => {
        const params = new URLSearchParams();
        if (name) params.append("name", name);
        if (speciality) params.append("speciality", speciality);
        params.append("page", page.toString());
        params.append("size", size.toString());
        return `/users/search?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery, useSearchUsersQuery } =
  userApi;
