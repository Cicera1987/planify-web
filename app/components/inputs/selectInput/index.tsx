"use client";

import React from "react";
import "./styles.css";
import Icon from "../../assets/icons";

interface SelectTagProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | number | null;
  onChange: (value: string | number | null) => void;
  placeholder?: string;
  required?: boolean;
  error?: string | boolean;
}

export default function SelectTag({
  label,
  options,
  value,
  onChange,
  placeholder = "Selecionar",
  required = false,
  error,
}: SelectTagProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="input-wrapper">
      <label className="input-label">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>

      <div className="select-tag-wrapper">
        {selectedOption && (
          <div className="tag">
            {selectedOption.label}
            <span className="tag-remove" onClick={() => onChange(null)}>
              ×
            </span>
          </div>
        )}

        <select
          className={`select-tag ${value ? "value-selected" : ""}`}
          value={value ?? ""}
          onChange={(e) => {
            const selectedValue = e.target.value;
            const parsedValue =
              typeof value === "number" ? Number(selectedValue) : selectedValue;
            onChange(parsedValue || null);
          }}
          required={required}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="custom-arrow">
          <Icon.Arrow />
        </span>
      </div>

      {error && typeof error === "string" && (
        <div className="input-error">{error}</div>
      )}
    </div>
  );
}
