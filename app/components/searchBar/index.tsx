"use client";

import React from "react";
import Button from "@/app/components/buttons";
import Input from "../inputs";
import Icon from "../assets/icons";

interface SearchBarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onButtonClick?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  searchValue = "",
  onSearchChange,
  onButtonClick,
  placeholder = "Pesquisar...",
}: SearchBarProps) {
  return (
    <div className="w-full flex flex-row sm:flex-row md:flex-row lg:flex-row gap-2 justify-between sm:gap-4 items-stretch sm:items-center">
      <Input.SearchInput
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder={placeholder}
      />
      <Button.ButtonVariant
        onClick={onButtonClick}
        variant="headerIcon"
        icon={<Icon.Client />}
        type="button"
      />
    </div>
  );
}
