import { cn } from "@/utils/cn";
import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { textToggleButtonVariants } from "./variants";

type TextToggleButtonVariantProps = VariantProps<
  typeof textToggleButtonVariants
>;

export type TextToggleButtonLabels = {
  /** 펼쳐진(`expanded === true`) 상태에서 표시되는 레이블 (예: "접기") */
  expanded: string;
  /** 접힌(`expanded === false`) 상태에서 표시되는 레이블 (예: "더보기") */
  collapsed: string;
};

export type TextToggleButtonProps = {
  /** 현재 펼침 상태. controlled prop 입니다. */
  expanded: boolean;
  /** 상태 전환 시 호출되는 핸들러. 다음 expanded 값을 인자로 받습니다. */
  onToggle: (next: boolean) => void;
  /** 상태별 레이블 */
  labels: TextToggleButtonLabels;
  /** 연결된 disclosure 영역의 DOM id (`aria-controls`로 연결됩니다) */
  controls?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children"> &
  TextToggleButtonVariantProps;

/**
 * 인라인 텍스트 옆/아래에 붙는 텍스트 전용 disclosure(공개) 트리거 버튼입니다.
 *
 * 동일한 트리거가 "더보기/접기"처럼 두 상태를 오가야 할 때 사용합니다.
 * 본문 텍스트와 자연스럽게 어울리도록 작은 폰트·낮은 높이로 정렬되며,
 * `aria-expanded`·`aria-controls` 같은 disclosure 시맨틱이 기본 포함됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * ### 사용해야 하는 경우
 *
 * - **콘텐츠 펼치기/접기**: 후기·QnA·공지 등 긴 텍스트의 "더보기/접기" 트리거
 * - **인라인 보조 액션**: 본문 흐름 안에 작은 폰트로 붙어야 하는 토글
 *
 * ### 사용하지 말아야 하는 경우
 *
 * - **일반 액션 실행**: 단일 액션은 {@link Button}
 * - **boolean 설정 전환**: On/Off는 {@link Switch}
 * - **눌림(pressed) 상태가 유지되는 버튼형 토글**: {@link ToggleButton}
 * - **다중 옵션 선택**: `SegmentedControls` 또는 `FilterToggleGroup`
 *
 * ## Layout behavior
 *
 * - 인라인 블록으로 동작하며 본문 텍스트 라인에 자연스럽게 정렬됩니다.
 * - 아이콘 없이 텍스트만 표시되어 본문 흐름을 끊지 않습니다.
 *
 * ## Props
 *
 * - `expanded` (`boolean`): 현재 펼침 상태. controlled.
 * - `onToggle` (`(next: boolean) => void`): 다음 상태가 인자로 전달됩니다.
 * - `labels` (`{ expanded; collapsed }`): 상태별 텍스트.
 * - `variant` (`"underline" | "plain"`, 기본 `"underline"`): 시각 스타일.
 * - `size` (`"sm" | "md"`, 기본 `"sm"`): 본문 텍스트와 맞물리는 크기.
 * - `controls` (`string`, optional): 연결된 영역의 id. `aria-controls`로 노출됩니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do
 *
 * - **상태별 레이블을 명시적으로 다르게** 작성하세요. (예: "더보기" / "접기")
 * - **연관된 콘텐츠 영역에 id를 부여**하고 `controls`로 연결하세요.
 * - 본문 라인 안에 둘 때 `size="sm"`을 우선 사용하세요.
 *
 * ### 🚫 Don't
 *
 * - 단일 액션(저장/삭제 등)에 사용하지 마세요. `aria-expanded`가 잘못된 시맨틱을 노출합니다.
 * - 상태 레이블이 동일하면(예: 두 상태 모두 "토글") 사용자가 현재 상태를 알 수 없습니다.
 * - 외부에서 `onClick`을 덮어쓰지 마세요. 토글 동작은 `onToggle`로만 처리합니다.
 *
 * ## Accessibility
 *
 * - 렌더 태그는 `<button type="button">`이며 Enter/Space로 동작합니다.
 * - `aria-expanded`가 현재 상태를 항상 반영합니다.
 * - `controls`를 전달하면 `aria-controls`가 출력되어 SR 사용자에게 관계가 전달됩니다.
 *
 * ## Example
 *
 * ```tsx
 * const [expanded, setExpanded] = useState(false);
 *
 * <>
 *   <p id="review-body" className={expanded ? "" : "line-clamp-5"}>
 *     {longReviewText}
 *   </p>
 *   <TextToggleButton
 *     expanded={expanded}
 *     onToggle={setExpanded}
 *     labels={{ collapsed: "더보기", expanded: "접기" }}
 *     controls="review-body"
 *   />
 * </>
 * ```
 *
 * See also:
 *
 * - {@link Button}, `variant="underline"`은 단일 액션용입니다.
 * - {@link ToggleButton}, 박스 형태의 pressed 토글이 필요한 경우.
 * - {@link Switch}, On/Off 설정용입니다.
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Forms/TextToggleButton/For%20Jsdoc.png?raw=true)
 */
const TextToggleButton = forwardRef<HTMLButtonElement, TextToggleButtonProps>(
  (
    {
      expanded,
      onToggle,
      labels,
      variant,
      size,
      controls,
      className,
      type = "button",
      disabled,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const label = expanded ? labels.expanded : labels.collapsed;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-expanded={expanded}
        aria-controls={controls}
        aria-label={ariaLabel ?? label}
        className={cn(
          textToggleButtonVariants({ variant, size }),
          className,
        )}
        onClick={() => onToggle(!expanded)}
        {...props}
      >
        {label}
      </button>
    );
  },
);
TextToggleButton.displayName = "TextToggleButton";

export { TextToggleButton };
