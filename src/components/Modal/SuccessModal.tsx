import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

export interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  className?: string;
}

export const SuccessModal = React.forwardRef<HTMLDivElement, SuccessModalProps>(
  (
    {
      open,
      onOpenChange,
      title = "성공",
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
        icon={
          <CheckCircle2 className="w-15 h-15 text-cms-green-500 border-cms-green-500" />
        }
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
      >
        <div className="text-sm text-cms-gray-700">{message}</div>
      </Modal>
    );
  },
);

SuccessModal.displayName = "SuccessModal";
