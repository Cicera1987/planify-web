"use client";

import { useEffect, useState } from "react";
import { Package } from "../services/packagesService";
import { getAllPackages } from "../services/packagesService"; // função Axios que vamos criar

interface PackageOption {
  value: number;
  label: string;
}

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchPackages = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await getAllPackages();
      setPackages(data);
    } catch (err) {
      console.error("Erro ao buscar pacotes:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const optionsPackages: PackageOption[] =
    packages.map((pack) => ({
      value: pack.id,
      label: pack.name,
    })) || [];

  return { optionsPackages, isLoading, isError, refetch: fetchPackages };
}
