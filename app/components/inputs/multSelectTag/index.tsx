"use client";

import React from "react";
import Icon from "../../assets/icons";
import "./styles.css";
import TagWithCounter from "../../tags/tagWithCounter";

interface ItemsTag {
  id: string | number;
  label?: string;
  quantity: number;
}

interface MultiSelectTagProps {
  label?: string;
  options: { value: string | number; label: string }[];
  value: ItemsTag[];
  onChange: (value: ItemsTag[]) => void;
  placeholder?: string;
  required?: boolean;
  error?: string | boolean;
  isEditMode?: boolean;
  showQuantity?: boolean;
}

export default function MultSelectTag({
  label,
  options,
  value,
  onChange,
  placeholder = "Selecionar",
  required = false,
  error,
  isEditMode = false,
  showQuantity = true,
}: MultiSelectTagProps) {
  const handleAdd = (item: ItemsTag) => {
    if (!item) return;

    const existingItem = value.find((val) => val.id === item.id);

    if (existingItem) {
      const newValues = value.map((val) =>
        val.id === item.id ? { ...val, quantity: val.quantity + 1 } : val,
      );
      onChange(newValues);
    } else {
      onChange([...value, { ...item, quantity: 1 }]);
    }
  };

  const handleRemove = (id: string | number) => {
    onChange(value.filter((item) => item.id !== id));
  };

  const handleChangeQuantity = (id: string | number, newQty: number) => {
    if (newQty < 1) {
      handleRemove(id);
      return;
    }

    const newValues = value.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item,
    );
    onChange(newValues);
  };

  return (
    <div className="mult-input-wrapper">
      <label className="mult-input-label">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>

      <div className="mult-select-tag-wrapper">
        <div className="mult-tags-container">
          {value.map((val) => {
            const opt = options.find((option) => option.value === val.id);
            return showQuantity ? (
              <TagWithCounter
                key={val.id}
                label={opt?.label || val.label || ""}
                quantity={val.quantity}
                onIncrease={() =>
                  handleChangeQuantity(val.id, val.quantity + 1)
                }
                onDecrease={() =>
                  handleChangeQuantity(val.id, val.quantity - 1)
                }
              />
            ) : (
              <div key={val.id} className="mult-tag">
                {opt?.label || val.label || ""}
                <span
                  className="mult-tag-remove"
                  onClick={() => handleRemove(val.id)}
                >
                  ×
                </span>
              </div>
            );
          })}
        </div>
        <div className="mult-select-row">
          <select
            className="mult-select-tag"
            value=""
            onChange={(e) => {
              const selectedValue = e.target.value;
              const parsedValue = isNaN(Number(selectedValue))
                ? selectedValue
                : Number(selectedValue);

              const itemToAdd: ItemsTag = {
                id: parsedValue,
                label:
                  options.find((opt) => opt.value === parsedValue)?.label || "",
                quantity: 1,
              };

              handleAdd(itemToAdd);
            }}
          >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <span className="mult-custom-arrow">
            <Icon.Arrow />
          </span>
        </div>
      </div>

      {error && typeof error === "string" && (
        <div className="mult-input-error">{error}</div>
      )}
    </div>
  );
}
