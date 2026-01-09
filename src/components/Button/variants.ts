import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * 버튼 컴포넌트의 스타일 variant를 정의합니다.
 *
 * @variant default - 기본 스타일 (회색 배경)
 * @variant secondary - 보조 스타일 (밝은 회색 배경)
 * @variant outline - 테두리 스타일 (투명 배경)
 * @variant ghost - 고스트 스타일 (투명 배경, hover시 배경)
 * @variant link - 링크 스타일 (밑줄)
 *
 * @size default - 기본 크기 (h-10)
 * @size sm - 작은 크기 (h-8)
 * @size lg - 큰 크기 (h-11)
 * @size icon - 아이콘 크기 (정사각형 10x10)
 */
export const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2",
    "rounded-md ring-offset-white",
    "text-sm font-medium",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-slate-950 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-60",
    "transition-colors cursor-pointer",
  ),
  {
    variants: {
      variant: {
        default:
          "border-0 bg-cms-gray-850 text-cms-white hover:bg-cms-gray-750",
        secondary: cn(
          "border-0 bg-cms-gray-300 text-cms-black",
          "hover:bg-cms-gray-200 hover:text-cms-gray-800",
        ),
        outline: cn(
          "border border-cms-gray-400 bg-transparent",
          "hover:bg-cms-gray-200 hover:text-cms-gray-900",
        ),

        ghost:
          "border-0 bg-transparent hover:bg-cms-gray-200 hover:text-cms-gray-800",
        link: "border-0 text-cms-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-sm px-3",
        lg: "h-11 rounded-sm px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
