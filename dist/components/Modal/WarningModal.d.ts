import { default as React } from 'react';

export interface WarningModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    message: React.ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
    cancelText?: string;
    onCancel?: () => void;
    className?: string;
}
/**
 * 잠재적인 문제를 경고하거나 주의가 필요한 작업을 수행하기 전 사용자의 동의를 구하는 모달입니다.
 *
 * {@link WarningModal}은 주황색 경고 아이콘을 통해 주의를 환기시킵니다.
 * 완전한 파괴적 액션(삭제)은 아니지만, 데이터 변경이나 시스템 설정 변경 등
 * 신중함이 필요한 상황에서 사용됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **데이터 변경**: 기존 정보를 대량으로 수정하거나 업데이트할 때
 * - **민감한 설정 변경**: 시스템 동작에 영향을 줄 수 있는 설정을 변경할 때
 * - **동작 확인**: 예기치 않은 부작용이 발생할 수 있는 기능을 실행할 때
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **위험성 명시**: 이 작업을 실행했을 때 어떤 결과가 초래될 수 있는지 명확히 설명하세요.
 * - **취소 옵션 제공**: 사용자가 마음을 바꿀 수 있도록 명확한 취소 버튼을 함께 배치하세요.
 */
export declare const WarningModal: React.ForwardRefExoticComponent<WarningModalProps & React.RefAttributes<HTMLDivElement>>;
