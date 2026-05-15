import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { toggleButtonVariants } from "./variants";

export type ToggleButtonProps = {
  /** 현재 눌림 상태. controlled prop 입니다. */
  pressed: boolean;
  /** 눌림 상태가 바뀔 때 호출되는 핸들러. 다음 pressed 값이 전달됩니다. */
  onPressedChange: (next: boolean) => void;
  /** 버튼 내부에 표시할 콘텐츠 (텍스트, 아이콘 등). */
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children"> &
  VariantProps<typeof toggleButtonVariants>;

/**
 * 박스 형태의 버튼처럼 보이지만 클릭 시 눌림(`pressed`) 상태가 유지되는 토글 버튼입니다.
 *
 * 시각적으로는 {@link Button}과 동일한 직사각형 구조를 갖지만, `pressed` 상태에 따라
 * 외곽선(off) ↔ 채워짐(on) 스타일이 토글되며 사용자에게 명확한 on/off 피드백을
 * 제공합니다. `aria-pressed`로 토글 시맨틱을 노출합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * ### 사용해야 하는 경우
 *
 * - **on/off 액션이 유지되어야 하는 버튼**: '좋아요'/'좋아요 취소', '알림 ON/OFF',
 *   '북마크' 같이 같은 자리에서 같은 트리거가 두 상태를 오가는 경우.
 * - **단일 필터 칩**: 한 옵션을 켜거나 끌 수 있는 보조 필터.
 *
 * ### 사용하지 말아야 하는 경우
 *
 * - **단일 액션 실행**: 상태가 유지되지 않는 액션은 {@link Button}
 * - **인라인 텍스트 토글**: '더보기/접기' 같은 disclosure 트리거는 {@link TextToggleButton}
 * - **여러 옵션 중 하나 선택**: `SegmentedControls` 또는 `FilterToggleGroup`
 * - **boolean 설정 전환**: 설정 메뉴의 On/Off는 {@link Switch}
 *
 * ## Layout behavior
 *
 * - 인라인 블록으로 동작합니다. 너비는 콘텐츠에 맞춰지며 `className`으로 확장 가능합니다.
 * - 눌림 전환은 배경/테두리/텍스트 색상만 변하며, 폭/높이는 고정입니다.
 *
 * ## Props
 *
 * - `pressed` (`boolean`): 현재 눌림 상태. controlled.
 * - `onPressedChange` (`(next: boolean) => void`): 다음 상태가 인자로 전달됩니다.
 * - `variant` (`"default" | "primary"`, 기본 `"default"`): 눌림 시 강조 색.
 * - `size` (`"sm" | "md"`, 기본 `"md"`): {@link Button} `sm`/`default`와 동일 높이.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do
 *
 * - **현재 상태가 명확히 드러나도록** 채움/외곽선 차이를 유지하세요.
 * - **레이블은 액션이 아닌 상태**로 표현하세요. (예: "팔로잉" / "팔로우")
 * - 여러 ToggleButton이 나열될 때는 일관된 `size`를 사용하세요.
 *
 * ### 🚫 Don't
 *
 * - 단일 액션(저장/삭제 등)에 사용하지 마세요. `aria-pressed` 시맨틱이 잘못 노출됩니다.
 * - 외부에서 `onClick`을 덮어쓰지 마세요. 토글 동작은 `onPressedChange`로만 처리합니다.
 * - 두 상태 모두 같은 레이블을 쓰지 마세요. 스크린리더 사용자가 현재 상태를 구분하기
 *   어려워집니다.
 *
 * ## Accessibility
 *
 * - 렌더 태그는 `<button type="button">`이며 Enter/Space로 동작합니다.
 * - `aria-pressed`가 현재 상태를 항상 반영합니다.
 * - 시각적인 색상 차이뿐 아니라 레이블 자체에도 상태가 드러나도록 권장합니다.
 *
 * ## Example
 *
 * ```tsx
 * const [liked, setLiked] = useState(false);
 *
 * <ToggleButton
 *   pressed={liked}
 *   onPressedChange={setLiked}
 *   variant="primary"
 * >
 *   {liked ? "좋아요 취소" : "좋아요"}
 * </ToggleButton>
 * ```
 *
 * See also:
 *
 * - {@link Button}, 상태가 유지되지 않는 단일 액션.
 * - {@link TextToggleButton}, 인라인 텍스트 disclosure 트리거.
 * - {@link Switch}, 설정용 On/Off 토글.
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Forms/ToggleButton/For%20Jsdoc.png?raw=true)
 */
const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      pressed,
      onPressedChange,
      variant,
      size,
      className,
      type = "button",
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-pressed={pressed}
        className={cn(toggleButtonVariants({ variant, size }), className)}
        onClick={() => onPressedChange(!pressed)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
ToggleButton.displayName = "ToggleButton";

export { ToggleButton };
