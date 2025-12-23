import React from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

export interface WarningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  // 추가된 Props
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
}

export const WarningModal = React.forwardRef<HTMLDivElement, WarningModalProps>(
  (
    {
      open,
      onOpenChange,
      title = "경고",
      message,
      confirmText = "확인",
      onConfirm,
      // 기본값 설정
      cancelText = "취소",
      onCancel,
      className,
    },
    ref,
  ) => {
    const handleConfirm = () => {
      onConfirm?.();
      onOpenChange(false);
    };

    // 취소 핸들러 추가
    const handleCancel = () => {
      onCancel?.();
      onOpenChange(false);
    };

    return (
      <Modal
        ref={ref}
        open={open}
        onOpenChange={onOpenChange}
        icon={<AlertTriangle className="w-15 h-15 text-cms-orange-500" />}
        title={title}
        footer={
          // 버튼 두 개를 가로로 배치하기 위해 flex 컨테이너 사용
          <div className="flex w-full gap-2">
            <Button
              onClick={handleCancel}
              className="flex-1 h-12 bg-white border border-cms-gray-200 text-cms-gray-700 hover:bg-cms-gray-50"
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 h-12 bg-cms-gray-850 hover:bg-cms-gray-800"
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

WarningModal.displayName = "WarningModal";
