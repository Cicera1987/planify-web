import React from "react";
import "./styles.css";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean | string;
  required?: boolean;
}

export default function InputForm({
  label,
  error,
  required = false,
  ...props
}: InputFormProps) {
  return (
    <div className="input-wrapper">
      <label className="input-label">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <input
        {...props}
        className={`input-field ${error ? "input-error-field" : ""}`}
      />
      {error && typeof error === "string" && (
        <div className="input-error">{error}</div>
      )}
    </div>
  );
}
