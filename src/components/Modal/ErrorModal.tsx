import React from "react";
import { XCircle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { cn } from "@/utils/cn";

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
      title,
      message,
      confirmText = "확인",
      onConfirm,
      className,
    },
    ref
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
        title={
          title ? (
            <div className="flex items-center gap-2">
              <XCircle className="w-6 h-6 text-cms-red-400" />
              <span>{title}</span>
            </div>
          ) : (
            <XCircle className="w-12 h-12 text-cms-red-400" />
          )
        }
        footer={
          <Button onClick={handleConfirm} className="min-w-[100px]">
            {confirmText}
          </Button>
        }
        className={className}
        size="sm"
      >
        <div className={cn("text-center", title && "mt-2")}>{message}</div>
      </Modal>
    );
  }
);

ErrorModal.displayName = "ErrorModal";
