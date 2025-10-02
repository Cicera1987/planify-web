"use client";

import { Package, useGetAllPackagesQuery } from "../services/packagesService";

export function usePackages() {
  const { data, isLoading, isError, refetch } = useGetAllPackagesQuery();

  const options = data?.map((pack: Package) => ({
    value: pack.id,
    label: pack.name,
  }));

  return {
    optionsPackages: options || [],
    isLoading,
    isError,
    refetch,
  };
}
