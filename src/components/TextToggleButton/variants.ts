import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * TextToggleButton(텍스트 전용 disclosure 트리거)의 시각 variant를 정의합니다.
 *
 * @variant underline - 항상 밑줄 표시 (기본). 인라인 텍스트 옆/아래 보조 액션에 사용.
 * @variant plain - 밑줄 없이 단순 텍스트만 표시.
 *
 * @size sm - text-[13px], h-[18px], gap-1 (기본)
 * @size md - text-sm, h-5, gap-1.5
 */
export const textToggleButtonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "border-0 bg-transparent p-0",
    "font-medium",
    "cursor-pointer select-none",
    "transition-colors duration-150 ease-out",
    "text-cms-gray-700",
    "hover:text-cms-black",
    "focus-visible:text-cms-black focus-visible:outline-2",
    "focus-visible:outline-offset-2 focus-visible:outline-cms-primary-400",
    "disabled:pointer-events-none disabled:text-cms-gray-400",
    "disabled:cursor-not-allowed",
  ),
  {
    variants: {
      variant: {
        underline: "underline decoration-1 underline-offset-2",
        plain: "no-underline",
      },
      size: {
        sm: "h-[18px] gap-1 text-[13px]",
        md: "h-5 gap-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "underline",
      size: "sm",
    },
  },
);
