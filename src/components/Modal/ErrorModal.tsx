import React from "react";
import { XCircle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

export interface ErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  className?: string;
}

export const ErrorModal = React.forwardRef<HTMLDivElement, ErrorModalProps>(
  (
    {
      open,
      onOpenChange,
      title = "오류",
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
        icon={<XCircle className="w-15 h-15 text-cms-red-400" />}
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

ErrorModal.displayName = "ErrorModal";
