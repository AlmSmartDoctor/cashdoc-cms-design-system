import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * ToggleButton(눌림 상태가 유지되는 박스 토글)의 시각 variant를 정의합니다.
 *
 * v2 family-look: `pressed` 상태는 다크 fill + 좌측 체크 표식으로 표현합니다.
 *
 * @variant default - 회색 톤 (기본). 눌림 상태에서 `cms-gray-900` 외곽선·체크.
 * @variant primary - 강조 톤. 눌림 상태에서 `cms-primary-200` (#FFD200) fill.
 *
 * @size sm - h-7, text-[12px], px-2.5
 * @size md - h-[34px], text-[13px], px-3.5 (기본)
 */
export const toggleButtonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-1.5",
    "rounded-cms-md border border-solid",
    "font-medium whitespace-nowrap select-none",
    "transform-gpu cursor-pointer",
    "transition-colors duration-150 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-1",
    "disabled:pointer-events-none disabled:opacity-45",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border-cms-gray-250 bg-cms-white text-cms-gray-700",
          `
            hover:border-cms-gray-350 hover:bg-cms-gray-50
            hover:text-cms-gray-900
          `,
          "focus-visible:outline-cms-gray-700",
          "aria-pressed:border-cms-gray-900 aria-pressed:bg-cms-gray-50",
          "aria-pressed:font-semibold aria-pressed:text-cms-gray-900",
          "aria-pressed:shadow-[inset_0_0_0_1px_var(--cashdoc-gray-900)]",
        ),
        primary: cn(
          "border-cms-gray-250 bg-cms-white text-cms-gray-700",
          `
            hover:border-cms-gray-350 hover:bg-cms-gray-50
            hover:text-cms-gray-900
          `,
          "focus-visible:outline-cms-primary-200",
          "aria-pressed:border-cms-primary-300",
          "aria-pressed:bg-cms-primary-200",
          "aria-pressed:font-semibold aria-pressed:text-cms-gray-900",
        ),
      },
      size: {
        sm: "h-7 px-2.5 text-[12px]",
        md: "h-[34px] px-3.5 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
