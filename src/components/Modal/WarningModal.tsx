import React from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { cn } from "@/utils/cn";

export interface WarningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  className?: string;
}

export const WarningModal = React.forwardRef<HTMLDivElement, WarningModalProps>(
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
              <AlertTriangle className="w-6 h-6 text-cms-orange-500" />
              <span>{title}</span>
            </div>
          ) : (
            <AlertTriangle className="w-12 h-12 text-cms-orange-500" />
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

WarningModal.displayName = "WarningModal";
