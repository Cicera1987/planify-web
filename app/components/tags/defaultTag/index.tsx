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
  onClick?: (id: number) => void;
  editingId?: number | null;
  formatItem?: (item: T) => string;
  selectedId?: number | null;
}

export default function DefaultTag<T extends TagItemBase>({
  label,
  items,
  onEdit,
  onDelete,
  onClick,
  formatItem,
  selectedId,
}: TagProps<T>) {
  return (
    <div className="tag-list-container">
      {label && <h3 className="tag-list-label">{label}</h3>}
      <div className="scroll-list">
        {items.length === 0 ? (
          <p className="no-tags">Selecione o dia para ver horários disponíveis</p>
        ) : (
          <div className="tag-list">
            {items.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`tag-item ${isSelected ? "tag-item--selected" : ""}`}
                >
                  <span className="tag-text" onClick={()=> onEdit ? onEdit(item) : onClick?.(item.id)}>
                    {formatItem ? formatItem(item) : item.name}
                  </span>
                  {onDelete && (
                    <Button.ButtonIcon
                      onClick={() => onDelete(item.id)}
                      icon={<Icon.CloseTag />}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
