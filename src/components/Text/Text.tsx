import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textVariants = cva("cms-font-pretendard cms-text-black", {
  variants: {
    variant: {
      h1: "text-3xl font-bold",
      h2: "text-2xl font-semibold",
      h3: "text-lg font-semibold",
      subtitle: "text-base font-medium",
      body: "text-sm font-normal",
      emphasis: "text-sm font-semibold",
      caption: "text-xs font-normal",
      price: "text-xs font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    decoration: {
      underline: "underline",
      lineThrough: "line-through",
      none: "no-underline",
    },
  },
  defaultVariants: {
    variant: "body",
    align: "left",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";
  children: React.ReactNode;
}

/**
 * 일관된 타이포그래피 시스템을 적용하기 위한 텍스트 컴포넌트입니다.
 *
 * {@link Text}는 제목(Heading), 본문(Body), 캡션(Caption) 등 미리 정의된 스타일을 제공하여
 * 디자인 일관성을 유지하고 텍스트의 의미적 구조(Semantic Structure)를 쉽게 정의할 수 있게 합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **페이지 제목 및 부제목**: 화면의 위계를 나누는 타이틀을 작성할 때
 * - **본문 콘텐츠**: 일반적인 설명글이나 데이터를 표시할 때
 * - **캡션 및 힌트**: 부가적인 설명이나 작은 크기의 정보가 필요할 때
 * - **정형화된 스타일**: 특정 폰트 두께나 크기를 시스템 규칙에 맞춰 적용해야 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **복잡한 스타일링**: 시스템 정의 범위를 크게 벗어나는 특수 스타일은 별도 CSS 클래스를 활용하세요.
 *
 * ## Layout behavior
 *
 * - **Semantic Tag**: `as` prop을 통해 실제 HTML 태그(`h1`, `p`, `span` 등)를 결정할 수 있어 SEO와 접근성에 유리합니다.
 * - **Alignment**: `align` 속성을 통해 왼쪽, 중앙, 오른쪽 정렬을 손쉽게 조절할 수 있습니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **의미론적 태그 사용**: 제목에는 `as="h1"`, 본문에는 `as="p"`를 사용하는 등 맥락에 맞는 태그를 선택하세요.
 * - **계층 구조 준수**: 큰 제목(h1) 아래에 작은 제목(h2, h3)이 오도록 논리적인 흐름을 유지하세요.
 * - **변형(Variant) 활용**: 폰트 크기와 두께를 직접 조절하기보다 제공되는 `variant`를 우선적으로 사용하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **과도한 폰트 크기 사용**: 가급적 시스템에서 정의한 크기를 벗어나지 않도록 주의하세요.
 * - **의미와 맞지 않는 태그**: 시각적으로만 크게 보이기 위해 제목 태그를 남용하지 마세요.
 *
 * ## Example
 *
 * {@tool snippet}
 * 다양한 위계의 텍스트 구성:
 *
 * ```tsx
 * <div className="space-y-4">
 *   <Text variant="h1" as="h1">대시보드</Text>
 *   <Text variant="subtitle">오늘의 요약 정보입니다.</Text>
 *   <Text variant="body">
 *     현재 활성화된 사용자는 총 1,234명이며, 어제 대비 5% 증가했습니다.
 *   </Text>
 *   <Text variant="caption" align="right">최근 업데이트: 2024-01-24</Text>
 * </div>
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link TextInput}, 사용자의 입력을 받는 텍스트 필드
 * - {@link Button}, 텍스트를 포함하는 액션 요소
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      variant,
      align,
      decoration,
      as: Component = "p",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        className={cn(textVariants({ variant, align, decoration }), className)}
        ref={ref as any}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = "Text";
