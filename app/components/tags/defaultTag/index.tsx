import React from "react";

import "./styles.css";
import Button from "../../buttons";
import Icon from "../../assets/icons";

interface TagItemBase {
  id: number;
  name: string;
}
interface TagProps<T extends TagItemBase> {
  id?: string;
  label?: string;
  items: T[];
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
  editingId?: number | null;
}

export default function DefaultTag<T extends TagItemBase>({
  label,
  items,
  onEdit,
  onDelete,
  editingId,
}: TagProps<T>) {
  return (
    <div className="tag-list-container">
      {label && <h3 className="tag-list-label">{label}</h3>}
      <div className="scroll-list">
        {items.length === 0 ? (
          <p className="no-tags">Nenhum item cadastrado ainda</p>
        ) : (
          <div className="tag-list">
            {items.map((item) => (
              <div
                key={item.id}
                className={`tag-item ${editingId === item.id ? "tag-item--active" : ""}`}
              >
                <span className="tag-text" onClick={() => onEdit?.(item)}>
                  {item.name}
                </span>
                <Button.ButtonIcon
                  onClick={() => onDelete?.(item.id)}
                  icon={<Icon.CloseTag />}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
