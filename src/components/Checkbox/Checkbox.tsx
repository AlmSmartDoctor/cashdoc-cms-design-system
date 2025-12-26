import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  label?: string;
  id?: string;
}

/**
 * 사용자가 여러 옵션 중 하나 이상을 선택하거나, 특정 항목의 활성화 상태를 제어할 때 사용하는 컴포넌트입니다.
 *
 * {@link Checkbox}는 개별적인 On/Off 상태를 표시하며, 주로 목록에서의 다중 선택이나
 * 설정 화면에서 특정 기능의 사용 여부를 결정할 때 사용됩니다.
 *
 * Radix UI의 Checkbox 컴포넌트를 기반으로 구현되어 접근성과 키보드 내비게이션이
 * 자동으로 처리됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **다중 선택**: 목록에서 여러 항목을 동시에 선택해야 할 때
 * - **단일 승인**: 이용약관 동의와 같이 하나의 항목에 대해 확인이 필요할 때
 * - **설정 제어**: 특정 기능의 활성화/비활성화 상태를 토글할 때
 * - **필터링**: 여러 조건(카테고리, 날짜 등)을 동시에 적용하여 결과를 필터링할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **상호 배타적 선택**: 여러 옵션 중 단 하나만 선택해야 하는 경우 `RadioButton`을 사용하세요.
 * - **즉각적인 상태 반영**: 설정을 바꾸자마자 페이지에 즉시 반영되는 경우 `Switch` 컴포넌트가 더 적절할 수 있습니다.
 *
 * ## Layout behavior
 *
 * - **Inline Alignment**: 레이블과 함께 가로로 나란히 배치되며, 기본적으로 인라인 블록 요소처럼 동작합니다.
 * - **Spacing**: 체크박스와 레이블 사이에는 일정한 간격(8px/0.5rem)이 유지됩니다.
 * - **Touch Area**: 모바일 대응을 위해 레이블 클릭 시에도 체크박스가 선택되도록 `htmlFor` 속성이 연결되어 있습니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확한 레이블 제공**: 체크박스가 무엇을 제어하는지 명확하게 설명하는 레이블을 함께 사용하세요.
 * - **긍정형 문장 사용**: '알림 받지 않기'보다는 '알림 받기'와 같이 긍정형 문구로 작성하는 것이 혼란을 줄입니다.
 * - **그룹화**: 여러 체크박스가 하나의 주제를 다룬다면 적절한 제목 아래에 그룹화하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **레이블 생략 지양**: 공간이 매우 협소한 경우가 아니라면 항상 레이블을 함께 제공하세요.
 * - **복잡한 텍스트**: 레이블에 너무 많은 정보나 설명을 넣지 마세요. 필요하다면 툴팁이나 별도의 설명 텍스트를 사용하세요.
 *
 * ## Accessibility
 *
 * - **Keyboard Interaction**: `Space` 키를 사용하여 체크 상태를 전환할 수 있습니다.
 * - **Focus Management**: 탭 키를 통해 포커스를 이동할 수 있으며, 포커스 시 시각적인 강조 효과가 나타납니다.
 * - **WAI-ARIA**: `role="checkbox"`를 사용하며, 체크 상태에 따라 `aria-checked` 값이 자동으로 업데이트됩니다.
 * - **Label Connection**: `id`와 `htmlFor`가 자동으로 연결되어 스크린 리더가 레이블을 읽어줍니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 체크박스 사용 예시:
 *
 * ```tsx
 * <Checkbox
 *   label="이용약관에 동의합니다"
 *   checked={agreed}
 *   onCheckedChange={setAgreed}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 비활성화된 체크박스:
 *
 * ```tsx
 * <Checkbox
 *   label="선택 불가능한 옵션"
 *   disabled
 *   checked={true}
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link RadioButton}, 하나만 선택해야 하는 경우
 * - {@link Switch}, 즉각적인 상태 반영이 필요한 경우
 * - {@link Button}, 단순 액션 실행이 필요한 경우
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, id, disabled, ...props }, ref) => {
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        disabled={disabled}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded",
          "border border-gray-400 bg-white",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-black data-[state=checked]:border-black",
          "transition-colors",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center", "text-white")}
        >
          <Check className="h-[18px] w-[18px]" strokeWidth={4} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            "ml-2 text-base font-normal text-gray-500",
            "hover:text-black transition-colors",
            disabled && "cursor-not-allowed opacity-50",
            "cursor-pointer select-none"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";
