import { api } from "./api";

export interface ContactFormInputs {
  name: string;
  phone: string;
  email?: string;
  observation?: string;
  gender?: string;
  imageUrl?: string;
  professionalId: number;
  isActive?: boolean;
  packageIds?: number[];
}

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
  apiVersion?: string;
}

export const getContacts = async (
  page = 0,
  size = 10,
): Promise<PageResponse<Contact>> => {
  const res = await api.get<PageResponse<Contact>>(
    `/contacts?page=${page}&size=${size}`,
  );
  return res.data;
};

export const getContactById = async (id: number): Promise<Contact> => {
  const res = await api.get<Contact>(`/contacts/${id}`);
  return res.data;
};

export const searchContacts = async (
  name: string,
  page = 0,
  size = 10,
): Promise<PageResponse<Contact>> => {
  const res = await api.get<PageResponse<Contact>>(
    `/contacts/search?name=${encodeURIComponent(name)}&page=${page}&size=${size}`,
  );
  return res.data;
};

export const createContact = async (data: FormData): Promise<Contact> => {
  const res = await api.post<Contact>("/contacts", data);
  return res.data;
};

export const updateContact = async (
  id: number,
  data: FormData,
): Promise<Contact> => {
  const res = await api.put<Contact>(`/contacts/${id}`, data);
  return res.data;
};

export const deleteContact = async (id: number): Promise<void> => {
  await api.delete(`/contacts/${id}`);
};
