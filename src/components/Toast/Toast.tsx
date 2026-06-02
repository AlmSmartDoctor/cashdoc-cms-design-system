import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import {
  CheckIcon,
  CloseIcon,
  InfoIcon,
  WarningIcon,
} from "../icons";

/**
 * Toast 컴포넌트의 톤/intent variant 정의.
 *
 * 두 축으로 구성:
 * - **intent**: 의미 (success / info / warning / error) — 좌측 아이콘 색만 결정
 * - **theme**: light(기본) / dark — 배경·텍스트 톤 결정
 *
 * 두 축은 독립적이므로 `intent="warning" theme="light"` 같은 조합이 자유롭게 가능합니다.
 */
const toastVariants = cva(
  cn(
    "inline-flex w-full items-start gap-2.5",
    "rounded-cms-lg",
    "px-3.5 py-3",
    "text-[13px] leading-[1.45]",
    "max-w-[420px] min-w-[280px]",
    "shadow-[0_12px_24px_rgba(15,20,25,0.08),0_4px_8px_rgba(15,20,25,0.04)]",
  ),
  {
    variants: {
      theme: {
        dark: cn(
          "bg-cms-gray-900 text-cms-gray-200",
          "border border-cms-gray-900",
        ),
        light: cn(
          "bg-cms-white text-cms-gray-700",
          "border border-cms-gray-200",
        ),
      },
    },
    defaultVariants: {
      theme: "light",
    },
  },
);

const intentIconColor = {
  success: "text-cms-green-400",
  info: "text-cms-blue-400",
  warning: "text-cms-orange-400",
  error: "text-cms-red-400",
} as const;

const intentIcon = {
  success: CheckIcon,
  info: InfoIcon,
  warning: WarningIcon,
  error: CloseIcon,
} as const;

export type ToastIntent = keyof typeof intentIcon;
type ToastVariantProps = VariantProps<typeof toastVariants>;
export type ToastTheme = NonNullable<ToastVariantProps["theme"]>;

export type ToastProps = {
  /** intent — 좌측 아이콘 모양/컬러 결정. 생략 시 아이콘 미노출 */
  intent?: ToastIntent;
  /** 라이트/다크 톤 (default: "light") */
  theme?: ToastTheme;
  /** 헤더 라인 */
  title: React.ReactNode;
  /** 보조 설명 */
  description?: React.ReactNode;
  /** 우측 X 버튼 핸들러 — 제공 시에만 X 노출 */
  onClose?: () => void;
  /** 우측 X 버튼 aria-label (default: "닫기") */
  closeLabel?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

const renderIcon = (intent: ToastIntent) => {
  const Icon = intentIcon[intent];
  return (
    <span
      className={cn(
        "mt-px flex size-[18px] shrink-0 items-center justify-center",
        intentIconColor[intent],
      )}
      aria-hidden="true"
    >
      <Icon size={16} strokeWidth={2.2} />
    </span>
  );
};

/**
 * 정적으로 렌더링되는 토스트 카드 컴포넌트입니다.
 *
 * 런타임 알림은 {@link Toaster} + `toast()`를 사용하고, 이 컴포넌트는 디자인
 * 시스템 문서(스토리), 인라인 알림 배너, 또는 sonner의 `toast.custom`과 함께
 * 정적 마크업이 필요한 곳에서 사용합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * - **디자인 문서**: 다양한 intent/theme을 한 화면에 시각화할 때
 * - **인라인 배너**: 페이지 본문에 토스트 톤의 메시지가 필요할 때
 * - **`toast.custom`**: sonner를 통해 띄우되 마크업을 완전 제어하고 싶을 때
 *
 * ## Example
 *
 * ```tsx
 * <Toast
 *   intent="success"
 *   title="캠페인이 발행되었습니다"
 *   description="4분 전 · 12,481명에게 알림 전송"
 *   onClose={() => dismiss()}
 * />
 *
 * <Toast
 *   intent="warning"
 *   theme="light"
 *   title="발송 시간이 야간(22:00 이후)입니다"
 *   description="예약 시간을 다시 확인해 주세요."
 *   onClose={() => dismiss()}
 * />
 * ```
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      intent,
      theme = "light",
      title,
      description,
      onClose,
      closeLabel = "닫기",
      ...props
    },
    ref,
  ) => {
    const isLight = theme === "light";

    return (
      <div
        ref={ref}
        role="status"
        className={cn(toastVariants({ theme }), className)}
        {...props}
      >
        {intent != null && renderIcon(intent)}

        <div className="min-w-0 flex-1">
          <div
            className={cn(
              "font-semibold",
              isLight ? "text-cms-gray-900" : "text-cms-white",
            )}
          >
            {title}
          </div>
          {description != null && (
            <div
              className={cn(
                "text-[12px] font-normal",
                isLight ? "text-cms-gray-600" : "text-cms-gray-300",
              )}
            >
              {description}
            </div>
          )}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className={cn(
              "mt-px flex size-4 shrink-0 items-center justify-center",
              "rounded-cms-xs border-0 bg-transparent p-0",
              "transition-colors",
              isLight ?
                "text-cms-gray-450 hover:text-cms-gray-900"
              : "text-cms-gray-450 hover:text-cms-white",
            )}
          >
            <CloseIcon size={12} strokeWidth={2.2} />
          </button>
        )}
      </div>
    );
  },
);

Toast.displayName = "Toast";
