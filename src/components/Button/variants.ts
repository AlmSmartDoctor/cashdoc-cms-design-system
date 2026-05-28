import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * 버튼 컴포넌트의 스타일 variant를 정의합니다.
 *
 * @variant default - 기본 CTA (다크 뉴트럴 배경)
 * @variant secondary - 보조 액션 (밝은 그레이 배경)
 * @variant outline - 테두리만 (흰색 배경)
 * @variant ghost - 투명 배경, hover시 배경
 * @variant warning - 소프트 위험 액션 (옅은 빨강 배경 + 빨간 텍스트)
 * @variant danger - 강한 파괴적 액션 (빨간 솔리드 배경 + 흰 텍스트)
 * @variant link - 링크 텍스트 (블루)
 * @variant underline - 항상 밑줄 텍스트
 *
 * @size default - 기본 (h-9, 36px)
 * @size sm - 작은 (h-7, 30px)
 * @size lg - 큰 (h-11, 44px)
 * @size icon - 아이콘 정사각형 (36x36)
 */
export const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-1.5",
    "rounded-cms-md ring-offset-white",
    "text-sm font-semibold tracking-tight whitespace-nowrap",
    "focus-visible:ring-2 focus-visible:outline-none",
    "focus-visible:ring-cms-gray-900/20 focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-45",
    "scale-100 transform-gpu cursor-pointer select-none",
    "transition-colors duration-150 ease-out",
    "active:translate-y-px",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border-0 bg-cms-gray-850 text-cms-white",
          `
            hover:bg-cms-gray-750
            active:bg-cms-gray-900
          `,
        ),
        secondary: cn(
          "border-0 bg-cms-gray-150 text-cms-gray-850",
          "hover:bg-cms-gray-200",
        ),
        outline: cn(
          "border border-cms-gray-250 bg-cms-white text-cms-gray-850",
          "hover:border-cms-gray-300 hover:bg-cms-gray-50",
        ),
        ghost: cn(
          "border-0 bg-transparent text-cms-gray-700",
          "hover:bg-cms-gray-100 hover:text-cms-gray-900",
        ),
        warning: cn(
          "border border-cms-red-100 bg-cms-red-50 text-cms-red-600",
          "hover:border-cms-red-300 hover:bg-cms-red-100",
          "focus-visible:ring-cms-red-500/25",
        ),
        danger: cn(
          "border-0 bg-cms-red-500 text-cms-white",
          "hover:bg-cms-red-600",
          "focus-visible:ring-cms-red-500/25",
        ),
        link: cn(
          "h-auto border-0 bg-transparent p-0 text-cms-blue-600",
          `
            underline-offset-4
            hover:underline
          `,
        ),
        underline: cn(
          "h-auto border-0 bg-transparent p-0 font-medium",
          `
            text-cms-gray-650 underline decoration-cms-gray-350
            underline-offset-2
          `,
          "hover:text-cms-gray-900 hover:decoration-cms-gray-900",
          "focus:text-cms-gray-900 focus:outline-none",
        ),
      },
      size: {
        default: "h-9 px-3.5",
        sm: "h-7 rounded-cms-sm px-2.5 text-[13px]",
        lg: "h-11 px-5 text-[15px]",
        icon: "size-9 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
