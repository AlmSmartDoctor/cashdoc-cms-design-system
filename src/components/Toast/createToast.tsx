import React from "react";
import { toast as sonnerToast, type ExternalToast } from "sonner";
import { Toast, type ToastIntent, type ToastTheme } from "./Toast";

/**
 * 정적 {@link Toast} 컴포넌트와 sonner를 연결하는 래퍼.
 *
 * sonner의 자체 스타일/아이콘 시스템 대신 디자인 시스템의 `Toast`를
 * `toast.custom`을 통해 렌더링합니다. 호출 시그니처는 sonner와 유사하지만
 * `description`/`theme`/`closeButton` 옵션을 디자인 시스템 의도에 맞춰
 * 좁혔습니다. `action`/`cancel` 등 sonner 고유 슬롯은 현재 미지원입니다.
 */
export type ToastInput = {
  /** 보조 설명 */
  description?: React.ReactNode;
  /** 배경 톤 (default: "light") */
  theme?: ToastTheme;
  /** 우측 X 닫기 버튼 노출 여부 (default: true) */
  closeButton?: boolean;
} & Omit<
  ExternalToast,
  "description" | "icon" | "action" | "cancel" | "actionButtonStyle"
>;

const show = (
  intent: ToastIntent | undefined,
  title: React.ReactNode,
  { description, theme, closeButton = true, ...sonnerOpts }: ToastInput = {},
) =>
  sonnerToast.custom(
    (id) => (
      <Toast
        intent={intent}
        theme={theme}
        title={title}
        description={description}
        onClose={closeButton ? () => sonnerToast.dismiss(id) : undefined}
      />
    ),
    sonnerOpts,
  );

const defaultToast = (title: React.ReactNode, opts?: ToastInput) =>
  show(undefined, title, opts);

/**
 * CCDS 디자인 시스템에 맞춰 sonner를 감싼 toast 함수.
 *
 * - `toast(title, opts?)` — intent 없는 plain 토스트
 * - `toast.success/info/warning/error(title, opts?)` — intent별 컬러 아이콘
 * - `toast.dismiss(id?)` / `toast.promise(...)` / `toast.custom(...)` — sonner passthrough
 *
 * 모든 호출은 내부적으로 `sonner.toast.custom(<Toast />)`을 사용하므로
 * 디자인 시스템의 `Toast` 마크업이 실제 런타임에서도 그대로 보입니다.
 */
export const toast = Object.assign(defaultToast, {
  success: (title: React.ReactNode, opts?: ToastInput) =>
    show("success", title, opts),
  info: (title: React.ReactNode, opts?: ToastInput) =>
    show("info", title, opts),
  warning: (title: React.ReactNode, opts?: ToastInput) =>
    show("warning", title, opts),
  error: (title: React.ReactNode, opts?: ToastInput) =>
    show("error", title, opts),
  dismiss: sonnerToast.dismiss,
  custom: sonnerToast.custom,
  // promise / loading은 sonner 내부 타입을 참조해 dts 생성에 제약이 있어
  // 별도 노출하지 않습니다. 필요 시 `import { toast } from "sonner"`로 사용.
});
