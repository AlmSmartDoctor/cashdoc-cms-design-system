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
      title = "삭제",
      message = "정말로 삭제하시겠습니까?",
      confirmText = "삭제",
      cancelText = "취소",
      onConfirm,
      onCancel,
      className,
    },
    ref,
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
        icon={<AlertTriangle className="w-15 h-15 text-cms-red-400" />}
        title={title}
        footer={
          <div className="flex gap-2 w-full">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 h-12"
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleConfirm}
              className={cn(
                "flex-1 h-12",
                "bg-cms-red-400 hover:bg-cms-red-500",
              )}
            >
              {confirmText}
            </Button>
          </div>
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

DeleteModal.displayName = "DeleteModal";
