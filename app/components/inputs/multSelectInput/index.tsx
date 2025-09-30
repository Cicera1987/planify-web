"use client";

import React, { useEffect, useState } from "react";
import "./styles.css";

interface SelectInputFormProps {
    label: string;
    options: string[];
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: string | boolean;
}

export default function SelectInputForm({
    label,
    options,
    value,
    onChange,
    placeholder = "Selecione...",
    required = false,
    error,
}: SelectInputFormProps) {
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setFilter(value || "");
    }, [value]);

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(filter.toLowerCase())
    );

    const handleSelect = (opt: string) => {
        onChange(opt);
        setFilter(opt);
        setOpen(false);
    };

    return (
        <div className="input-wrapper">
            <label className="input-label">
                {label} {required && <span style={{ color: "red" }}>*</span>}
            </label>

            <div className="multi-input-wrapper">
                <div className="multi-input">
                    <input
                        className="multi-input-field"
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setOpen(true);
                        }}
                        placeholder={placeholder}
                        onFocus={() => {
                            setFilter(value || "");
                            setOpen(true);
                        }}
                    />
                </div>

                {open && filteredOptions.length > 0 && (
                    <div className="options-dropdown">
                        {filteredOptions.map((opt) => (
                            <div
                                key={opt}
                                className="option-item"
                                onClick={() => handleSelect(opt)}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {error && typeof error === "string" && (
                <div className="input-error">{error}</div>
            )}
        </div>
    );
}
