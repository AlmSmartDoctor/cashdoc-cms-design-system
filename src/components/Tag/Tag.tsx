import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { XIcon } from "../icons";
import { tagVariants } from "./variants";

export type TagColor = NonNullable<VariantProps<typeof tagVariants>["color"]>;
export type TagSize = NonNullable<VariantProps<typeof tagVariants>["size"]>;

type TagOwnProps = {
  /** 태그 색상. 디자인 시스템 팔레트 기반. */
  color?: TagColor;
  /** 태그 크기. */
  size?: TagSize;
  /** 좌측 아이콘 — 12~14px 권장. */
  leftIcon?: React.ReactNode;
  /** 제거 버튼 노출 여부. true이면 우측에 X 버튼이 추가됩니다. */
  removable?: boolean;
  /** 제거 버튼 클릭 핸들러. removable과 함께 사용합니다. */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 제거 버튼의 aria-label (기본: "제거"). */
  removeLabel?: string;
};

export type TagProps = TagOwnProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, "color" | "prefix">;

/**
 * 짧은 메타데이터(상태, 분류, 라벨)를 시각적으로 표시하는 컴포넌트입니다.
 *
 * {@link Tag}는 비인터랙티브 라벨이 기본이며, `onClick`이 지정되면 자동으로
 * 키보드 접근 가능한 버튼 의미를 가집니다. `removable={true}`로 우측에 제거
 * 버튼을 노출할 수 있고, `leftIcon`으로 아이콘 prefix를 받을 수 있습니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **상태 라벨**: "신규", "완료", "보류" 등 짧은 상태 표시
 * - **카테고리/태그**: 컨텐츠 분류, 필터 키워드
 * - **메타 정보**: 사용자 역할, 권한, 그룹 등 컴팩트한 정보 표시
 *
 * **사용하지 말아야 하는 경우:**
 * - **주요 액션**: 클릭이 주요 액션이라면 `Button`을 사용하세요.
 * - **선택 가능한 옵션**: 다중 선택이 필요하면 `FilterToggleGroup`/`CountFilterChips`를 검토하세요.
 *
 * ## Layout behavior
 *
 * - `inline-flex` 기반이므로 텍스트 흐름 안에 자연스럽게 배치됩니다.
 * - 기본 size는 `sm`(h-5)로, table cell이나 list row 내부에 적합합니다.
 * - `removable`이면 좌측 라벨 우측에 size-3 X 버튼이 붙고, 클릭 시 `onRemove`가 호출됩니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본 사용:
 *
 * ```tsx
 * <Tag>대기</Tag>
 * <Tag color="blue">신규</Tag>
 * <Tag color="green" size="md">완료</Tag>
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 제거 가능한 태그:
 *
 * ```tsx
 * <Tag
 *   color="red"
 *   removable
 *   onRemove={() => removeTag("VIP")}
 * >
 *   VIP
 * </Tag>
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Button}, 주요 액션이 필요한 경우
 * - {@link CountFilterChips}, 카운트가 함께 보이는 선택형 칩
 * - {@link FilterToggleGroup}, 토글 가능한 필터 그룹
 */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      color,
      size,
      leftIcon,
      removable,
      onRemove,
      removeLabel = "제거",
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const interactive = onClick != null;

    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onRemove?.(e);
    };

    return (
      <span
        ref={ref}
        className={cn(tagVariants({ color, size, interactive }), className)}
        onClick={onClick}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={
          interactive ?
            (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.currentTarget.click();
              }
            }
          : undefined
        }
        {...props}
      >
        {leftIcon != null && (
          <span className="flex shrink-0 items-center" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className="truncate">{children}</span>
        {removable && (
          <button
            type="button"
            className={cn(
              "flex shrink-0 items-center justify-center",
              "rounded-cms-xs border-0 bg-transparent p-0",
              "size-3 text-current opacity-70",
              `
                transition-opacity
                hover:opacity-100
              `,
              "focus-visible:ring-2 focus-visible:outline-none",
              "focus-visible:ring-cms-gray-900/20",
            )}
            onClick={handleRemoveClick}
            aria-label={removeLabel}
          >
            <XIcon size={10} strokeWidth={2.5} />
          </button>
        )}
      </span>
    );
  },
);

Tag.displayName = "Tag";
