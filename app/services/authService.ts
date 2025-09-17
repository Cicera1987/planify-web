import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API } from "./api";

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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
  }),
  tagTypes: ["Register"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    uploadImage: builder.mutation<string, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "/upload",
          method: "POST",
          body: formData,
          responseHandler: (response) => response.text(),
        };
      },
    }),
    register: builder.mutation<void, Register>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...userData, active: true },
      }),
    }),
    update: builder.mutation({
      query: ({ userId, ...userData }) => ({
        url: `/auth/${userId}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["Register"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateMutation,
  useUploadImageMutation,
} = authApi;
