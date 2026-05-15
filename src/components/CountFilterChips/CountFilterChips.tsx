import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const countFilterChipVariants = cva(
  cn(
    "group inline-flex items-center",
    "rounded-md border border-solid select-none",
    "font-medium whitespace-nowrap",
    "cursor-pointer outline-none",
    "transition-colors duration-150 ease-out",
    "border-cms-gray-300 bg-cms-white text-cms-gray-700",
    "hover:bg-cms-gray-50",
    "focus-visible:ring-2 focus-visible:ring-cms-gray-300",
    "focus-visible:ring-offset-1",
    "data-[state=on]:border-cms-gray-850",
    "data-[state=on]:bg-cms-gray-850",
    "data-[state=on]:text-cms-white",
    "disabled:pointer-events-none disabled:opacity-50",
  ),
  {
    variants: {
      size: {
        sm: "h-7 gap-1.5 px-2.5 text-[12px]",
        md: "h-8 gap-2 px-3 text-[13px]",
        lg: "h-9 gap-2 px-3.5 text-sm",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const countBadgeVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "rounded-sm font-semibold tabular-nums",
    "bg-cms-gray-150 text-cms-gray-700",
    "group-data-[state=on]:bg-cms-white",
    "group-data-[state=on]:text-cms-gray-850",
  ),
  {
    variants: {
      size: {
        sm: "h-4 min-w-4 px-1 text-[10px]",
        md: "h-[18px] min-w-[18px] px-1.5 text-[11px]",
        lg: "h-5 min-w-5 px-1.5 text-xs",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type CountFilterChipsSize = NonNullable<
  VariantProps<typeof countFilterChipVariants>["size"]
>;

export type CountFilterChipsItem<T extends string | number> = {
  /** 선택값으로 사용되는 식별자 */
  value: T;
  /** chip 본문 라벨 */
  label: string;
  /** 우측 뱃지에 표시되는 카운트 */
  count: number | string;
  /** 개별 chip 비활성화 */
  disabled?: boolean;
};

export type CountFilterChipsProps<T extends string | number> = {
  /** 표시할 chip 목록 */
  items: CountFilterChipsItem<T>[];
  /** 현재 선택값. controlled. */
  value: T;
  /** 선택이 바뀔 때 호출됩니다. 빈 선택은 무시됩니다. */
  onValueChange: (value: T) => void;
  /** chip 크기 */
  size?: CountFilterChipsSize;
  /** 그룹 루트 클래스 */
  className?: string;
  /** 모든 chip 에 적용할 클래스 */
  itemClassName?: string;
  /** 스크린리더용 그룹 라벨 */
  ariaLabel?: string;
};

/**
 * 라벨과 카운트 뱃지를 함께 보여주는 콤팩트한 가로 필터 chip 그룹입니다.
 *
 * 단일 선택(`type="single"`)으로 동작하며, 선택된 chip 은 어두운 톤으로
 * 강조되고 카운트 뱃지가 반전됩니다. 상단 요약 영역에서 상태별 건수를
 * 한 번에 보여주면서 그대로 필터를 전환할 때 사용하세요.
 *
 * ## When (언제 사용해야 하는가)
 *
 * ### 사용해야 하는 경우
 * - 상태별 집계(예: 전체/이벤트 내원/접수·예약/영수증 인증)와 함께
 *   목록 필터를 즉시 전환해야 할 때
 * - 옵션 수가 적고(보통 2~6 개) 라벨이 짧을 때
 * - 카드형보다 한 줄짜리 콤팩트한 시각이 필요할 때
 *
 * ### 사용하지 말아야 하는 경우
 * - 다중 선택이 필요한 경우 → Checkbox 기반 UI
 * - 카드형 큰 숫자 강조가 필요한 경우 → {@link FilterToggleGroup}
 * - 카운트가 필요 없는 단순 뷰 전환 → {@link SegmentedControls}
 *
 * ## Layout behavior
 *
 * - 루트는 `flex flex-wrap`. 좁은 폭에서는 자연스럽게 줄바꿈됩니다.
 * - 각 chip 은 콘텐츠 폭. 뱃지는 chip 우측에 inline 으로 배치됩니다.
 *
 * ## Accessibility
 *
 * - Radix `ToggleGroup`(`type="single"`) 기반. Tab 진입 후 좌우 방향키로
 *   chip 간 이동이 가능합니다.
 * - `ariaLabel` 로 그룹 목적(예: "내원 유형 필터")을 명시하세요.
 * - 시각적 강조뿐 아니라 라벨 자체에 의미를 담아 색상에만 의존하지 않게
 *   합니다.
 *
 * ## Example
 *
 * ```tsx
 * type VisitType = "all" | "event" | "reservation" | "receipt";
 *
 * const [type, setType] = useState<VisitType>("all");
 *
 * <CountFilterChips
 *   ariaLabel="내원 유형 필터"
 *   value={type}
 *   onValueChange={setType}
 *   items={[
 *     { value: "all", label: "전체", count: 107 },
 *     { value: "event", label: "이벤트 내원", count: 73 },
 *     { value: "reservation", label: "접수/예약 내원", count: 0 },
 *     { value: "receipt", label: "영수증 인증", count: 34 },
 *   ]}
 * />
 * ```
 */
export const CountFilterChips = <T extends string | number>({
  items,
  value,
  onValueChange,
  size = "md",
  className,
  itemClassName,
  ariaLabel = "Filter",
}: CountFilterChipsProps<T>) => {
  const handleValueChange = (next: string) => {
    if (!next) return;
    const selected = items.find((item) => String(item.value) === next);
    if (!selected) return;
    onValueChange(selected.value);
  };

  return (
    <ToggleGroup.Root
      type="single"
      value={String(value)}
      onValueChange={handleValueChange}
      aria-label={ariaLabel}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {items.map((item) => (
        <ToggleGroup.Item
          key={String(item.value)}
          value={String(item.value)}
          disabled={item.disabled}
          className={cn(
            countFilterChipVariants({ size }),
            itemClassName,
          )}
        >
          <span>{item.label}</span>
          <span className={cn(countBadgeVariants({ size }))}>
            {item.count}
          </span>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};

CountFilterChips.displayName = "CountFilterChips";
