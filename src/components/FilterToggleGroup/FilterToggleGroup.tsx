import * as ToggleGroup from "@radix-ui/react-toggle-group";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

const filterToggleGroupSizeClassMap = {
  sm: {
    item: "min-w-[84px] px-3 py-2",
    caption: "text-[10px]",
    value: "text-lg",
    label: "text-[11px] mt-1",
    icon: "[&>svg]:size-3",
  },
  md: {
    item: "min-w-24 px-3.5 py-2.5",
    caption: "text-[11px]",
    value: "text-[22px]",
    label: "text-[12px] mt-1.5",
    icon: "[&>svg]:size-3.5",
  },
  lg: {
    item: "min-w-28 px-4 py-3",
    caption: "text-[11px]",
    value: "text-[26px]",
    label: "text-[13px] mt-1.5",
    icon: "[&>svg]:size-4",
  },
  xl: {
    item: "min-w-32 px-[18px] py-3.5",
    caption: "text-[12px]",
    value: "text-[32px]",
    label: "text-[13px] mt-2",
    icon: "[&>svg]:size-5",
  },
  "2xl": {
    item: "min-w-36 px-5 py-4",
    caption: "text-[13px]",
    value: "text-[40px]",
    label: "text-[14px] mt-2",
    icon: "[&>svg]:size-6",
  },
} as const;

/** Intent dot color (replaces the previous top color bar). */
const filterToggleGroupIntentDotClassMap = {
  default: "bg-cms-gray-400",
  primary: "bg-cms-primary-200",
  success: "bg-cms-green-500",
  danger: "bg-cms-red-500",
  muted: "bg-cms-gray-400",
} as const;

const filterToggleGroupIntentIconClassMap = {
  default: "text-cms-gray-650",
  primary: "text-cms-gray-650",
  success: "text-cms-green-500",
  danger: "text-cms-red-500",
  muted: "text-cms-gray-500",
} as const;

const filterToggleGroupIntentSelectedDotClassMap = {
  default: "bg-cms-white",
  primary: "bg-cms-primary-200",
  success: "bg-cms-green-400",
  danger: "bg-cms-red-400",
  muted: "bg-cms-white",
} as const;

export type FilterToggleGroupSize = keyof typeof filterToggleGroupSizeClassMap;
export type FilterToggleGroupIntent =
  keyof typeof filterToggleGroupIntentDotClassMap;

export type FilterToggleGroupItem<T extends string | number> = {
  value: T;
  count: number | string;
  label: string;
  caption?: string;
  icon?: ReactNode;
  intent?: FilterToggleGroupIntent;
  disabled?: boolean;
  className?: string;
};

export type FilterToggleGroupOption<T extends string | number> =
  FilterToggleGroupItem<T>;

export type FilterToggleGroupProps<T extends string | number> = {
  items: FilterToggleGroupItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
  itemClassName?: string;
  size?: FilterToggleGroupSize;
  showIcon?: boolean;
  ariaLabel?: string;
};

/**
 * 상태별 집계 카드와 단일 선택 필터를 결합한 카드형 토글 컴포넌트입니다.
 *
 * 숫자 요약(Count)과 상태 선택을 한 번에 제공해야 하는 관리 화면 상단 영역에 적합합니다.
 * 내부적으로 Radix ToggleGroup(single) 기반으로 동작하며 항상 하나의 상태만 선택됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - 상태별 집계 수치(예: 전체/승인/반려/취소)를 보여주면서 바로 목록 필터를 바꿔야 할 때
 * - 옵션 수가 적고(보통 3~8개), 각 옵션의 의미를 카드로 강조하고 싶을 때
 * - 프로젝트 간 동일한 카드 필터 패턴을 재사용하려는 경우
 *
 * **사용하지 말아야 하는 경우:**
 * - 다중 선택이 필요한 필터(체크박스 기반 UI 권장)
 * - 옵션이 많아 카드가 가로로 과밀해지는 경우(Dropdown/Select 권장)
 * - 집계 수치가 없고 단순 탭 전환만 필요한 경우(SegmentedControls 권장)
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 * - `value`를 단일 source of truth로 관리하고 `onValueChange`에서 화면 데이터를 즉시 동기화하세요.
 * - `size`는 한 화면에서 통일해서 사용하고, 필요한 경우 `className`/`itemClassName`으로 레이아웃만 보정하세요.
 * - `ariaLabel`에 그룹 목적(예: "리뷰 상태 필터")을 명확히 지정하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 * - 10개 이상의 옵션을 카드로 나열하지 마세요. 가독성과 클릭 정확도가 크게 떨어집니다.
 * - 상태 의미를 색상에만 의존하지 마세요. `label` 텍스트를 명확히 유지하세요.
 * - `onValueChange`를 비워 둔 채 시각 요소로만 사용하지 마세요. 필터 컴포넌트 의미가 약해집니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * ```tsx
 * type ReviewStatus = "all" | "requested" | "approved" | "rejected";
 *
 * const [status, setStatus] = useState<ReviewStatus>("all");
 *
 * <FilterToggleGroup
 *   ariaLabel="리뷰 상태 필터"
 *   value={status}
 *   onValueChange={setStatus}
 *   size="md"
 *   items={[
 *     { value: "all", label: "전체", count: 120, icon: <UserIcon /> },
 *     { value: "requested", label: "포인트 신청", count: 32, icon: <FileTextIcon /> },
 *     { value: "approved", label: "신청 승인", count: 21, icon: <CheckCircleIcon />, intent: "success" },
 *     { value: "rejected", label: "신청 거절", count: 5, icon: <XIcon />, intent: "danger" },
 *   ]}
 * />
 * ```
 * {@end-tool}
 *
 * ## 참고사진
 * ![](<https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Forms/FilterToggleGroup/For%20Jsdoc.png?raw=true>)
 */
export const FilterToggleGroup = <T extends string | number>({
  items,
  value,
  onValueChange,
  className,
  itemClassName,
  size = "md",
  showIcon = true,
  ariaLabel = "Status filter",
}: FilterToggleGroupProps<T>) => {
  const handleValueChange = (newValue: string) => {
    if (!newValue) return;

    const selectedItem = items.find((item) => String(item.value) === newValue);
    if (!selectedItem) return;

    onValueChange(selectedItem.value);
  };

  const sizeClass = filterToggleGroupSizeClassMap[size];

  return (
    <ToggleGroup.Root
      type="single"
      value={String(value)}
      onValueChange={handleValueChange}
      className={cn("flex flex-wrap gap-2", className)}
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const isSelected = String(item.value) === String(value);
        const intent = item.intent ?? "default";
        const showDot = intent !== "default" && intent !== "primary";
        const dotClass =
          isSelected
            ? filterToggleGroupIntentSelectedDotClassMap[intent]
            : filterToggleGroupIntentDotClassMap[intent];
        const iconColorClass =
          isSelected
            ? "text-cms-white"
            : filterToggleGroupIntentIconClassMap[intent];

        return (
          <ToggleGroup.Item
            key={String(item.value)}
            value={String(item.value)}
            disabled={item.disabled}
            className={cn(
              "group relative flex cursor-pointer flex-col items-start",
              "justify-between text-left",
              "rounded-cms-md border border-cms-gray-200 bg-cms-white",
              "text-cms-gray-900",
              "transform-gpu transition-colors duration-150 ease-out",
              "hover:border-cms-gray-350 hover:bg-cms-gray-50",
              "active:translate-y-px",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-cms-gray-900/15",
              "focus-visible:ring-offset-1",
              // Selected: translucent dark fill + inset white sheen
              // (matches new .cms-fcard.is-selected spec; rgba(20,23,28,0.94))
              "data-[state=on]:border-cms-gray-900",
              "data-[state=on]:bg-cms-gray-900/95",
              "data-[state=on]:text-cms-white",
              "data-[state=on]:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
              "data-[state=on]:backdrop-blur-sm",
              "disabled:cursor-not-allowed disabled:opacity-45",
              sizeClass.item,
              itemClassName,
              item.className,
            )}
          >
            {item.caption ?
              <span
                className={cn(
                  "leading-tight font-medium",
                  "text-cms-gray-600",
                  "group-data-[state=on]:text-cms-white/78",
                  sizeClass.caption,
                )}
              >
                {item.caption}
              </span>
            : null}

            <span
              className={cn(
                "mt-0.5 flex items-center gap-1.5",
                "leading-none font-bold tracking-tight tabular-nums",
                sizeClass.value,
                intent === "muted" && !isSelected && "text-cms-gray-500",
              )}
            >
              {showIcon && item.icon ?
                <span
                  className={cn("shrink-0", sizeClass.icon, iconColorClass)}
                >
                  {item.icon}
                </span>
              : null}
              {item.count}
            </span>

            <span
              className={cn(
                "flex items-center gap-1.5",
                "leading-tight font-medium break-keep",
                "text-cms-gray-650",
                "group-data-[state=on]:text-cms-white/78",
                intent === "muted" && !isSelected && "text-cms-gray-500",
                sizeClass.label,
              )}
            >
              {showDot && (
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    dotClass,
                  )}
                  aria-hidden
                />
              )}
              {item.label}
            </span>
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
};

FilterToggleGroup.displayName = "FilterToggleGroup";
