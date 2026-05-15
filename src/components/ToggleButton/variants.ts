import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * ToggleButton(눌림 상태가 유지되는 박스 토글)의 시각 variant를 정의합니다.
 *
 * 시각적으로는 {@link Button}과 유사한 직사각형/패딩 구조이지만,
 * `pressed` 상태에 따라 채워진(filled) ↔ 외곽선(outline) 스타일이
 * 토글되며 상태가 유지됩니다.
 *
 * @variant default - 회색 톤 (기본). 눌림 상태에서 `cms-gray-850` 배경.
 * @variant primary - 강조 톤. 눌림 상태에서 `cms-primary-400` 배경.
 *
 * @size sm - h-8, text-[13px], px-3
 * @size md - h-10, text-sm, px-4 (기본)
 */
export const toggleButtonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-1.5",
    "rounded-lg border border-solid",
    "font-medium select-none",
    "scale-100 transform-gpu cursor-pointer",
    "transition-all duration-150 ease-out",
    "active:scale-95",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-60",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border-cms-gray-400 bg-cms-white text-cms-gray-800",
          "hover:bg-cms-gray-100",
          "focus-visible:outline-cms-gray-700",
          "aria-pressed:border-cms-gray-850 aria-pressed:bg-cms-gray-850",
          "aria-pressed:text-cms-white",
          "aria-pressed:hover:bg-cms-gray-750",
        ),
        primary: cn(
          "border-cms-gray-400 bg-cms-white text-cms-gray-800",
          "hover:bg-cms-gray-100",
          "focus-visible:outline-cms-primary-400",
          "aria-pressed:border-cms-primary-400",
          "aria-pressed:bg-cms-primary-400",
          "aria-pressed:text-cms-white",
        ),
      },
      size: {
        sm: "h-8 gap-1 rounded-md px-3 text-[13px]",
        md: "h-10 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
