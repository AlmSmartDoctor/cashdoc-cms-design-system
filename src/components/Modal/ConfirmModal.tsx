import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

export interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  className?: string;
}

export const ConfirmModal = React.forwardRef<HTMLDivElement, ConfirmModalProps>(
  (
    {
      open,
      onOpenChange,
      title = "확인",
      message,
      confirmText = "확인",
      onConfirm,
      className,
    },
    ref,
  ) => {
    const handleConfirm = () => {
      onConfirm?.();
      onOpenChange(false);
    };

    return (
      <Modal
        ref={ref}
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        footer={
          <Button
            onClick={handleConfirm}
            className="w-full h-12 bg-cms-gray-850 hover:bg-cms-gray-800"
          >
            {confirmText}
          </Button>
        }
        className={className}
        size="sm"
        showCloseButton={false}
        icon={<CheckCircle2 className="w-15 h-15 text-cms-black" />}
      >
        <div className="text-sm text-cms-gray-700">{message}</div>
      </Modal>
    );
  },
);

ConfirmModal.displayName = "ConfirmModal";
