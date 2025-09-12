import { ReactNode } from "react";
import "./styles.css";

type PopupProps = {
  trigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Popup({ trigger, children, isOpen, onClose }: PopupProps) {
  return (
    <div className="popup-container">
      <div className="popup-trigger" onClick={onClose}>
        {trigger}
      </div>

      {isOpen && <div className="popup-content">{children}</div>}
    </div>
  );
}
