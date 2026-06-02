import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * Tag 컴포넌트의 색상/크기 variant 정의.
 *
 * 스타일은 subtle(옅은 배경 + 짙은 텍스트) 단일 톤으로 통일합니다.
 * 색상 팔레트의 명도 차이는 디자인 토큰 자체에서 흡수되며, 각 컬러는
 * 같은 의미 가중치(label 톤)를 가지도록 매핑됩니다.
 *
 * @color gray   - 기본 (중립 라벨)
 * @color blue   - 정보/신규
 * @color green  - 성공/완료
 * @color red    - 위험/오류/강조
 * @color orange - 주의/경고
 * @color yellow - 브랜드 강조 (내부적으로 cms-primary 토큰 사용)
 * @color pink   - 강조 라벨
 *
 * @size sm - 컴팩트 (h-5, 11px)
 * @size md - 일반 (h-6, 12px)
 */
export const tagVariants = cva(
  cn(
    "inline-flex items-center gap-1",
    "rounded-cms-md border border-solid",
    "font-medium whitespace-nowrap select-none",
    "transition-colors duration-150 ease-out",
  ),
  {
    variants: {
      color: {
        gray: cn(
          "border-cms-gray-200 bg-cms-gray-100 text-cms-gray-700",
        ),
        blue: cn(
          "border-cms-blue-100 bg-cms-blue-50 text-cms-blue-700",
        ),
        green: cn(
          "border-cms-green-100 bg-cms-green-50 text-cms-green-600",
        ),
        red: cn(
          "border-cms-red-100 bg-cms-red-50 text-cms-red-600",
        ),
        orange: cn(
          "border-cms-orange-100 bg-cms-orange-50 text-cms-orange-500",
        ),
        yellow: cn(
          "border-cms-primary-100 bg-cms-primary-50 text-cms-primary-500",
        ),
        pink: cn(
          "border-cms-pink-100 bg-cms-pink-50 text-cms-pink-700",
        ),
      },
      size: {
        sm: "h-5 px-2 text-[11px]",
        md: "h-6 px-2.5 text-[12px]",
      },
      interactive: {
        true: cn(
          "cursor-pointer",
          "hover:brightness-95",
          "focus-visible:ring-2 focus-visible:outline-none",
          "focus-visible:ring-cms-gray-900/15 focus-visible:ring-offset-1",
        ),
        false: "",
      },
    },
    defaultVariants: {
      color: "gray",
      size: "sm",
      interactive: false,
    },
  },
);
