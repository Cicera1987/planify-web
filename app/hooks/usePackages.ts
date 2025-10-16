"use client";

import { useEffect, useState } from "react";
import { Package } from "../services/packagesService";
import { getAllPackages } from "../services/packagesService"; // função Axios que vamos criar
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setPackageList } from "../store/features/packagesSlice";

interface PackageOption {
  value: number;
  label: string;
}

export function usePackages() {
  const dispatch = useDispatch();
  const packages = useSelector((state: RootState) => state.packages.list);

  const fetchPackages = async () => {
    try {
      const data: Package[] = await getAllPackages();
      dispatch(setPackageList(data));
    } catch (err) {
      console.error("Erro ao buscar pacotes:", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const isLoading = async () => {
    const packages = await getAllPackages();
    dispatch(setPackageList(packages));
  };

  const optionsPackages: PackageOption[] =
    packages.map((pack) => ({
      value: pack.id,
      label: pack.name,
    })) || [];

  return { optionsPackages, refetch: fetchPackages, packages, isLoading };
}
