"use client";

import { useScheduling } from "@/app/hooks/useScheduling";
import { Popup } from ".";
import "./styles.css";

import {
  Scheduling,
  SchedulingPopupStatus,
  SchedulingPopupStatusLabels,
} from "@/app/services/schedulingService";

interface StatusPopupProps {
  trigger: React.ReactNode;
  onSelect: (status: SchedulingPopupStatus) => void;
  scheduling: Scheduling;
}

export function StatusPopup({
  trigger,
  onSelect,
  isOpen,
  onClose,
  scheduling,
}: StatusPopupProps & { isOpen: boolean; onClose: () => void }) {
  const { isStatusEnabled, getStatusStyle } = useScheduling();

  return (
    <Popup trigger={trigger} isOpen={isOpen} onClose={onClose}>
      <ul className="status-list">
        {Object.entries(SchedulingPopupStatusLabels).map(([key, label]) => {
          const statusKey = key as SchedulingPopupStatus;
          const btnClass = getStatusStyle(statusKey, scheduling.status);
          const disabled = !isStatusEnabled(statusKey);

          return (
            <li key={key}>
              <button
                onClick={() => {
                  onSelect(statusKey);
                  onClose();
                }}
                disabled={disabled}
                className={`status-btn ${btnClass}`}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </Popup>
  );
}
