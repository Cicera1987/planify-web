import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API } from "./api";

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  observation?: string;
  gender?: string;
  imageUrl?: string;
  professionalId: number;
  packageIds?: number[];
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  apiVersion: string;
}

export const contactApi = createApi({
  reducerPath: "contactApi",
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
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    getContacts: builder.query<
      PageResponse<Contact>,
      { page?: number; size?: number }
    >({
      query: ({ page = 1, size = 10 }) => `/contacts?page=${page}&size=${size}`,
      providesTags: ["Contact"],
    }),
    searchContacts: builder.query<
      PageResponse<Contact>,
      { name: string; page?: number; size?: number }
    >({
      query: ({ name, page = 1, size = 10 }) =>
        `/contacts/search?name=${encodeURIComponent(name)}&page=${page}&size=${size}`,
      providesTags: ["Contact"],
    }),
    createContact: builder.mutation<Contact, FormData>({
      query: (formData) => ({
        url: "/contacts",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Contact"],
    }),
    updateContact: builder.mutation<Contact, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<void, number>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useSearchContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
