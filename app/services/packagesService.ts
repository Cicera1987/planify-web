import { api } from "./api";
import { Job } from "./jobService";

export interface Package {
  id: number;
  name: string;
  totalPrice: number;
  numberSessions: number;
  ownerId: number;
  createdAt: string;
  services: Job[];
}

export interface PackageRequest {
  name: string;
  totalPrice: number;
  numberSessions: number;
  serviceIds: number[];
}


export const getAllPackages = async (): Promise<Package[]> => {
  const res = await api.get<Package[]>("/packages");
  return res.data;
};


export const getPackageById = async (id: number): Promise<Package> => {
  const res = await api.get<Package>(`/packages/${id}`);
  return res.data;
};

export const createPackage = async (
  pkg: PackageRequest
): Promise<Package> => {
  const res = await api.post<Package>("/packages", pkg);
  return res.data;
};

export const updatePackage = async (
  id: number,
  pkg: PackageRequest
): Promise<Package> => {
  const res = await api.put<Package>(`/packages/${id}`, pkg);
  return res.data;
};

export const deletePackage = async (id: number): Promise<void> => {
  await api.delete(`/packages/${id}`);
};
