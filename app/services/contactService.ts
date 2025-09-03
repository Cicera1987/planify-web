import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  observation?: string;
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
        headers.set("authorization", `Bearer ${token}`);
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
      query: ({ page = 0, size = 10 }) => `/contacts?page=${page}&size=${size}`,
      providesTags: ["Contact"],
    }),
    searchContacts: builder.query<
      PageResponse<Contact>,
      { name: string; page?: number; size?: number }
    >({
      query: ({ name, page = 0, size = 10 }) =>
        `/contacts/search?name=${encodeURIComponent(name)}&page=${page}&size=${size}`,
      providesTags: ["Contact"],
    }),
    createContact: builder.mutation<
      Contact,
      Omit<Contact, "id" | "professionalId" | "createdAt">
    >({
      query: (newContact) => ({
        url: "/contacts",
        method: "POST",
        body: newContact,
      }),
      invalidatesTags: ["Contact"],
    }),
    updateContact: builder.mutation<
      Contact,
      { id: number; data: Partial<Contact> }
    >({
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
