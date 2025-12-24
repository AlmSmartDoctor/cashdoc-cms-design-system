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

/**
 * 요청한 작업이 성공적으로 완료되었음을 축하하거나 알리는 모달입니다.
 *
 * {@link SuccessModal}은 초록색 체크 아이콘을 통해 긍정적인 결과를 전달합니다.
 * 단순한 Toast 알림보다 더 강조된 확인이 필요할 때 사용됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **중요 작업 완료**: 회원가입 완료, 대규모 데이터 처리 완료 등
 * - **영구적 저장 완료**: 중요한 설정이나 게시글이 성공적으로 서버에 저장되었을 때
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **긍정적인 피드백**: "처리가 완료되었습니다" 보다는 "성공적으로 저장되었습니다"와 같이 명확한 피드백을 제공하세요.
 * - **후속 조치 안내**: 필요한 경우 다음 단계로 무엇을 해야 하는지(예: 리스트로 이동 등) 메시지에 포함하세요.
 */
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
