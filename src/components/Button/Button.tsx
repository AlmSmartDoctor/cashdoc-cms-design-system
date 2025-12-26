import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

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

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/**
 * 사용자의 클릭 동작을 통해 특정 액션을 실행하거나 페이지를 이동시키는 기본적인 컴포넌트입니다.
 *
 * {@link Button}은 다양한 시각적 스타일(Variant)과 크기(Size)를 제공하여 인터페이스의
 * 계층 구조를 명확히 하고 사용자의 행동을 유도합니다.
 *
 * ## When (언제 사용해야 하는가)
 * ### 사용해야 하는 경우
 *
 * - **액션 실행**: 데이터 저장, 삭제, 전송 등 시스템 상태를 변경하는 작업을 수행할 때
 * - **명확한 콜 투 액션(CTA)**: 페이지 내에서 가장 중요한 작업을 강조할 때
 * - **내비게이션**: 다른 페이지로의 이동이나 섹션 전환이 필요할 때
 * - **상태 변경**: 모달 열기, 드롭다운 토글 등 UI 요소를 제어할 때
 *
 * ### 사용하지 말아야 하는 경우:
 *
 * - **단순 링크**: 본문 내에서 다른 페이지로 연결되는 텍스트 링크는 `<a>` 태그나 별도의 Link 컴포넌트를 사용하세요
 * - **여러 선택지 중 하나 선택**: `RadioButton`이나 `Checkbox`를 고려하세요
 * - **탐색 메뉴**: `SideNavigation`이나 상단 메뉴에는 전용 메뉴 아이템을 사용하세요
 *
 * ---
 *
 * ## Layout behavior
 *
 * - **Inline-flex**: 기본적으로 인라인 블록 요소처럼 동작하여 텍스트 흐름 내에 배치됩니다.
 * - **W-full**: `fullWidth` prop을 통해 부모 컨테이너의 전체 너비를 차지하게 할 수 있습니다.
 * - **Center Alignment**: 버튼 내부의 텍스트와 아이콘은 항상 중앙에 정렬됩니다.
 * - **Responsive**: 모바일 환경을 위해 `fullWidth`를 적극 활용하는 것이 좋습니다.
 *
 * ---
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확한 동사 사용**: '저장', '삭제', '추가' 등 행동을 직접적으로 나타내는 레이블을 사용하세요.
 * - **계층 구조 유지**: 한 화면에 여러 버튼이 있다면 가장 중요한 버튼에만 'primary' variant를 적용하세요.
 * - **일관된 위치**: 확인 버튼은 오른쪽, 취소 버튼은 왼쪽에 배치하는 등 일관된 배치 규칙을 따르세요.
 * - **로딩 상태 활용**: 서버 통신 등 시간이 걸리는 작업 시 `isLoading` 상태를 표시하여 중복 클릭을 방지하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **레이블 생략 지양**: 아이콘만 있는 버튼(Icon Button)의 경우 접근성을 위해 반드시 `aria-label`을 제공하세요.
 * - **너무 긴 텍스트**: 버튼 레이블은 가급적 짧고 간결하게 유지하세요 (보통 2-4자).
 * - **모호한 표현**: '확인'보다는 '변경사항 저장'과 같이 구체적인 결과가 예상되는 레이블이 좋습니다.
 *
 * ---
 *
 * ## Accessibility
 *
 * - **Keyboard Support**: `Enter`와 `Space` 키로 실행 가능하며, 포커스 상태가 시각적으로 명확히 표시됩니다.
 * - **ARIA Attributes**: `disabled` 상태 시 `aria-disabled`가 자동으로 처리됩니다.
 * - **Role**: 기본적으로 `<button>` 태그를 사용하며, 필요한 경우 `asChild`를 통해 다른 요소(Link 등)로 렌더링하면서도 버튼의 스타일을 유지할 수 있습니다.
 *
 * ---
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 버튼 사용 예시:
 *
 * ```tsx
 * <div className="flex gap-2">
 *   <Button variant="primary">저장하기</Button>
 *   <Button variant="outline">취소</Button>
 *   <Button variant="ghost">닫기</Button>
 * </div>
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 아이콘과 로딩 상태가 포함된 버튼:
 *
 * ```tsx
 * <Button
 *   isLoading={isSubmitting}
 *   leftIcon={<SaveIcon />}
 *   onClick={handleSubmit}
 * >
 *   데이터 저장
 * </Button>
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 크기 변형 예시:
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Button size="sm">Small</Button>
 *   <Button size="md">Medium</Button>
 *   <Button size="lg">Large</Button>
 * </div>
 * ```
 * {@end-tool}
 *s
 * See also:
 *
 * - {@link TextInput}, 입력과 함께 액션이 필요한 경우
 * - {@link Modal}, 중요한 결정을 위한 버튼을 포함하는 오버레이
 * - {@link IconButton}, 아이콘만으로 구성된 버튼을 구성할 때
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
