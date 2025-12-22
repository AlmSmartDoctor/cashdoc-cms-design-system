import React from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { cn } from "@/utils/cn";

export interface DeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  className?: string;
}

export const DeleteModal = React.forwardRef<HTMLDivElement, DeleteModalProps>(
  (
    {
      open,
      onOpenChange,
      title,
      message = "정말로 삭제하시겠습니까?",
      confirmText = "삭제",
      cancelText = "취소",
      onConfirm,
      onCancel,
      className,
    },
    ref
  ) => {
    const handleConfirm = () => {
      onConfirm();
      onOpenChange(false);
    };

    const handleCancel = () => {
      onCancel?.();
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
              <AlertTriangle className="w-6 h-6 text-cms-red-400" />
              <span>{title}</span>
            </div>
          ) : (
            <AlertTriangle className="w-12 h-12 text-cms-red-400" />
          )
        }
        footer={
          <>
            <Button
              onClick={handleConfirm}
              variant="default"
              className={cn(
                "min-w-[100px]",
                "bg-cms-red-400 hover:bg-cms-red-500"
              )}
            >
              {confirmText}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="min-w-[100px]"
            >
              {cancelText}
            </Button>
          </>
        }
        className={className}
        size="sm"
        showCloseButton={false}
      >
        <div className={cn("text-center", title && "mt-2")}>{message}</div>
      </Modal>
    );
  }
);

DeleteModal.displayName = "DeleteModal";
