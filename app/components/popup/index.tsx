import { ReactNode, useEffect, useRef } from "react";
import "./styles.css";

type PopupProps = {
  trigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Popup({ trigger, children, isOpen, onClose }: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      popupRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="popup-container" ref={popupRef}>
      <div className="popup-trigger" onClick={onClose}>
        {trigger}
      </div>

      {isOpen && <div className="popup-content">{children}</div>}
    </div>
  );
}
