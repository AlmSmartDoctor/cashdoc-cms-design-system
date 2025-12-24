import { default as React } from 'react';

export interface ErrorModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    message: React.ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
    className?: string;
}
/**
 * 시스템 오류나 사용자의 잘못된 조작으로 인해 작업이 실패했음을 알리는 모달입니다.
 *
 * {@link ErrorModal}은 빨간색 X 아이콘을 통해 부정적인 결과임을 즉각적으로 전달하며,
 * 사용자가 문제를 인지하고 다음 행동을 취할 수 있도록 돕습니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **API 통신 실패**: 서버 오류나 네트워크 문제로 요청을 처리할 수 없을 때
 * - **유효성 검사 실패**: 입력한 정보에 중대한 결함이 있어 처리가 중단되었을 때
 * - **권한 부족**: 특정 기능을 사용할 권한이 없음을 알릴 때
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **구체적인 원인 안내**: 단순히 "오류가 발생했습니다" 보다는 "이미 존재하는 이메일입니다"와 같이 해결 가능한 정보를 제공하세요.
 * - **해결 방법 제시**: 가능하다면 "나중에 다시 시도해 주세요" 또는 "고객센터로 문의해 주세요"와 같은 가이드를 포함하세요.
 */
export declare const ErrorModal: React.ForwardRefExoticComponent<ErrorModalProps & React.RefAttributes<HTMLDivElement>>;
