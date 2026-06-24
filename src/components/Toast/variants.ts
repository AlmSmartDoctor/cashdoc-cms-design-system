import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * Toast 컴포넌트의 톤/intent variant 정의.
 *
 * 두 축으로 구성:
 * - **intent**: 의미 (success / info / warning / error) — 좌측 아이콘 색만 결정
 * - **theme**: light(기본) / dark — 배경·텍스트 톤 결정
 *
 * 두 축은 독립적이므로 `intent="warning" theme="light"` 같은 조합이 자유롭게 가능합니다.
 */
export const toastVariants = cva(
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
