"use client";

import React from "react";
import "./styles.css";

interface TagWithCounterProps {
  label: string;
  quantity?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
}

export default function TagWithCounter({
  label,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: TagWithCounterProps) {
  return (
    <div className="tag-counter">
      <div className="tag-main">
        <span className="tag-label">{label}</span>
        <span className="tag-qty">{quantity}</span>
      </div>

      <div className="tag-controls-column">
        {onIncrease && (
          <button type="button" onClick={onIncrease} className="tag-btn">
            +
          </button>
        )}
        {onDecrease && (
          <button type="button" onClick={onDecrease} className="tag-btn">
            −
          </button>
        )}
      </div>

      {onRemove && (
        <span className="tag-remove" onClick={onRemove}>
          ×
        </span>
      )}
    </div>
  );
}
