import React from "react";
import Button from "../../buttons";
import Icon from "../../assets/icons";
import "./styles.css";

interface TagItem {
  id: number;
  name: string;
  price?: string;
}

interface TagListProps {
  label?: string;
  items: TagItem[];
  onEdit?: (item: TagItem) => void;
  onDelete?: (id: number) => void;
}

export default function TagList({
  label,
  items,
  onEdit,
  onDelete,
}: TagListProps) {
  return (
    <div className="tag-list-container">
      {label && <h3 className="tag-list-label">{label}</h3>}

      {items.length === 0 ? (
        <p className="no-tags">Nenhum item cadastrado ainda</p>
      ) : (
        <div className="tag-list">
          {items.map((item) => (
            <div key={item.id} className="tag-item">
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
  );
}
