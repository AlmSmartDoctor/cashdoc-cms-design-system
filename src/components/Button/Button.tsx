import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { buttonVariants } from "./variants";

export type ButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

/**
 * 사용자의 클릭 동작을 통해 특정 액션을 실행하거나 페이지를 이동시키는 기본 버튼 컴포넌트입니다.
 *
 * 다양한 시각적 스타일(`variant`)과 크기(`size`)를 제공하여 인터페이스의 계층 구조를
 * 표현하고, 표준 `<button>` HTML 속성(`onClick`, `disabled`, `form`, `type` 등)을 그대로 전달받습니다.
 *
 * ## When (언제 사용해야 하는가)
 * ### 사용해야 하는 경우
 *
 * - **액션 실행**: 데이터 저장, 삭제, 전송 등 시스템 상태를 변경하는 작업을 수행할 때
 * - **명확한 콜 투 액션(CTA)**: 페이지 내에서 가장 중요한 작업을 강조할 때
 * - **상태 변경**: 모달 열기, 드롭다운 토글 등 UI 요소를 제어할 때
 * - **인라인 텍스트 액션**: `underline` variant를 사용하면 배경 없이 밑줄 텍스트 형태의 보조 액션 버튼을 만들 수 있습니다 (예: "모두 선택", "해제").
 *
 * ### 사용하지 말아야 하는 경우:
 *
 * - **단순 링크**: 본문 내에서 다른 페이지로 연결되는 텍스트 링크는 `<a>` 태그나 별도의 Link 컴포넌트를 사용하세요
 * - **여러 선택지 중 하나 선택**: `RadioButton`이나 `Checkbox`를 고려하세요
 *
 * ---
 *
 * ## Props
 *
 * - `variant`: `default` | `secondary` | `outline` | `ghost` | `link` | `underline`
 * - `size`: `default` | `sm` | `lg` | `icon`
 * - `type`: 기본값 `"button"` — `<form>` 내부에서 의도치 않은 submit을 방지합니다. submit 버튼이 필요하면 `type="submit"`을 명시하세요.
 *
 * ---
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확한 동사 사용**: '저장', '삭제', '추가' 등 행동을 직접적으로 나타내는 레이블을 사용하세요.
 * - **계층 구조 유지**: 한 화면에 여러 버튼이 있다면 가장 중요한 버튼에만 `default` variant를 적용하세요.
 * - **일관된 위치**: 확인 버튼은 오른쪽, 취소 버튼은 왼쪽에 배치하는 등 일관된 배치 규칙을 따르세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **레이블 생략 지양**: 아이콘만 있는 버튼의 경우 접근성을 위해 반드시 `aria-label`을 제공하세요.
 * - **너무 긴 텍스트**: 버튼 레이블은 가급적 짧고 간결하게 유지하세요.
 *
 * ---
 *
 * ## Accessibility
 *
 * - **Keyboard Support**: `Enter`와 `Space` 키로 실행 가능하며, 포커스 상태가 시각적으로 명확히 표시됩니다.
 * - **ARIA Attributes**: `disabled` 상태는 브라우저가 자동 처리합니다.
 *
 * ---
 *
 * ## Example
 *
 * ```tsx
 * <div className="flex gap-2">
 *   <Button variant="default">저장하기</Button>
 *   <Button variant="outline">취소</Button>
 *   <Button variant="ghost">닫기</Button>
 * </div>
 * ```
 *
 * ```tsx
 * <Button type="submit" disabled={isSubmitting}>
 *   데이터 저장
 * </Button>
 * ```
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Forms/Button/For%20Jsdoc.png?raw=true)
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
