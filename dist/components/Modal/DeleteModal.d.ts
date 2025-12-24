import { default as React } from 'react';

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
/**
 * 데이터를 삭제하거나 영구적인 작업을 수행하기 전, 사용자의 최종 승인을 받기 위한 경고 모달입니다.
 *
 * {@link DeleteModal}은 파괴적인(Destructive) 액션을 강조하기 위해 빨간색 경고 아이콘과
 * 눈에 띄는 삭제 버튼을 제공합니다. 사용자가 실수로 데이터를 삭제하는 것을 방지하는 안전장치 역할을 합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **영구적 데이터 삭제**: 게시글, 사용자 계정, 설정값 등을 삭제할 때
 * - **되돌릴 수 없는 작업**: 초기화, 데이터 덮어쓰기 등 주의가 필요한 작업을 수행할 때
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **구체적인 정보 포함**: 단순히 "삭제하시겠습니까?" 보다는 "사용자 '홍길동'의 정보를 삭제하시겠습니까?"와 같이 구체적인 대상을 명시하는 것이 좋습니다.
 * - **위험성 강조**: 해당 작업이 되돌릴 수 없음을 메시지에 포함하세요.
 */
export declare const DeleteModal: React.ForwardRefExoticComponent<DeleteModalProps & React.RefAttributes<HTMLDivElement>>;
