import React from "react";
import "./styles.css";

interface CheckboxInputProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    error?: string | boolean;
}

export default function CheckboxInput({
    label,
    checked,
    onChange,
    error,
}: CheckboxInputProps) {
    return (
        <div className="checkbox-wrapper">
            <label className="checkbox-label">
                <input
                    type="checkbox"
                    className="checkbox-field"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="checkbox-custom">{checked && "✓"}</span>
                {label}
            </label>
            {error && typeof error === "string" && (
                <div className="input-error">{error}</div>
            )}
        </div>
    );
}
