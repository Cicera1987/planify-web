"use client";

import React, { ReactNode } from "react";
import { Popup } from ".";
import "./styles.css";

export interface ListPopupItem<T> {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  extra?: Partial<T>;
}

interface ListPopupProps<T> {
  trigger: React.ReactNode;
  items: ListPopupItem<T>[];
  onSelect: (value: string, data: T) => void;
  isOpen: boolean;
  onClose: () => void;
  data: T;
}

export function StatusPopup<T>({
  trigger,
  items,
  onSelect,
  isOpen,
  onClose,
  data,
}: ListPopupProps<T>) {
  return (
    <Popup trigger={trigger} isOpen={isOpen} onClose={onClose}>
      <ul className="status-list">
        {items.map(({ value, label, icon, disabled, className }) => (
          <li key={value}>
            <button
              onClick={() => {
                onSelect(value, data);
                onClose();
              }}
              disabled={disabled}
              className={`status-btn ${className ?? ""}`}
            >
              {icon && <span className="status-icon">{icon}</span>}
              {label}
            </button>
          </li>
        ))}
      </ul>
    </Popup>
  );
}
