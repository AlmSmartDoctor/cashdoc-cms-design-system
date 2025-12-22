import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { cn } from "@/utils/cn";

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
              <CheckCircle2 className="w-6 h-6 text-cms-green-500" />
              <span>{title}</span>
            </div>
          ) : (
            <CheckCircle2 className="w-12 h-12 text-cms-green-500" />
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

SuccessModal.displayName = "SuccessModal";
