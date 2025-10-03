"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  ReactNode,
} from "react";
import Icon from "../assets/icons";
import "./styles.css";

type AlertProps = {
  title?: string;
  icon?: ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export interface AlertRef {
  open: (options: {
    title: string;
    icon?: ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
  }) => void;
  close: () => void;
};

const AlertModal = forwardRef<AlertRef, AlertProps>((_props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertProps>({});

  useImperativeHandle(ref, () => ({
    open: (opts) => {
      setOptions(opts);
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-icon">{options.icon}</div>
          <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
            <Icon.Close />
          </button>
        </div>

        {options.title && <p className="modal-title">{options.title}</p>}

        <div className="modal-footer">
          <button
            onClick={() => setIsOpen(false)}
            className="modal-btn cancel-btn"
          >
            {options.cancelText}
          </button>
          <button
            onClick={() => {
              options.onConfirm?.();
              setIsOpen(false);
            }}
            className="modal-btn confirm-btn"
          >
            {options.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
});

AlertModal.displayName = "AlertModal";

export default AlertModal;
