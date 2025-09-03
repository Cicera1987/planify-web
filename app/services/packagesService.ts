import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job } from "./jobService";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

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

export const packageApi = createApi({
  reducerPath: "packagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("@planify/token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPackages: builder.query<Package[], void>({
      query: () => "/packages",
    }),

    getPackageById: builder.query<Package, number>({
      query: (id) => `/packages/${id}`,
    }),

    createPackage: builder.mutation<Package, PackageRequest>({
      query: (packages) => ({
        url: "/packages",
        method: "POST",
        body: packages,
      }),
    }),
    updatePackage: builder.mutation<
      Package,
      { id: number; packages: PackageRequest }
    >({
      query: ({ id, packages }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: packages,
      }),
    }),
    deletePackage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllPackagesQuery,
  useGetPackageByIdQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi;
