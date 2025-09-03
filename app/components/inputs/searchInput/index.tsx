import React from "react";
import "./styles.css";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export default function SearchInput({
  placeholder = "Pesquisar...",
  ...props
}: SearchInputProps) {
  return (
    <input
      {...props}
      type="text"
      placeholder={placeholder}
      className="search-input"
    />
  );
}
