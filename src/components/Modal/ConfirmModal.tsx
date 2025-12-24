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

/**
 * 사용자에게 특정 작업에 대한 최종 확인을 받기 위한 단순화된 모달 컴포넌트입니다.
 *
 * {@link ConfirmModal}은 {@link Modal}을 기반으로 구성되었으며, 상징적인 체크 아이콘과
 * 하나의 '확인' 버튼만을 제공하여 사용자의 빠른 의사결정을 돕습니다.
 * 주로 성공적인 처리 알림이나 단순한 동의가 필요할 때 사용됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **결과 확인**: 설정 변경, 데이터 저장 등 작업이 정상적으로 완료되었음을 알릴 때
 * - **단순 안내**: 사용자에게 중요한 안내 사항을 전달하고 확인을 받아야 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **중요한 결정/취소 필요**: '예/아니오'와 같이 선택지가 필요한 경우 일반 `Modal`이나 `DeleteModal`을 사용하세요.
 * - **데이터 입력**: 폼 입력이 필요한 경우 일반 `Modal`을 사용하세요.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **간결한 메시지**: 메시지는 가급적 2-3줄 이내로 짧고 명확하게 작성하세요.
 * - **적절한 타이틀**: "저장 완료", "안내" 등 문맥에 맞는 타이틀을 사용하세요.
 */
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
