import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "@/utils/cn";

export type SegmentedControlsOption<T extends string | number> = {
  label: string;
  value: T;
};

export type SegmentedControlsProps<T extends string | number> = {
  options: SegmentedControlsOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

/**
 * 상호 배타적인 적은 수의 옵션 중 하나를 선택하거나 뷰(View)를 전환할 때 사용하는 컴포넌트입니다.
 * Radix UI의 ToggleGroup을 기반으로 구축되어, 향상된 키보드 접근성을 제공합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **뷰(View) 전환**: 지도/목록 보기, 일/주/월 달력 보기 등 화면의 데이터 표시 방식을 전환할 때
 * - **적은 수의 단일 선택**: 2~5개 사이의 옵션 중 하나를 빠르게 선택하고 결과를 즉시 확인해야 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **옵션이 많은 경우**: 선택지가 5개를 초과한다면 `Dropdown`이나 `Select`를 사용하는 것이 좋습니다.
 * - **다중 선택**: 여러 항목을 동시에 선택해야 하는 경우 `Checkbox`를 사용하세요.
 *
 * ## Layout behavior
 *
 * - **Flexbox 기반**: 컨테이너는 `flex`를 사용하며, 내부 버튼들은 `flex-1` 속성을 가져 주어진 너비 내에서 동일한 비율로 공간을 차지합니다.
 *
 * ## Accessibility
 *
 * - **Keyboard Navigation**: `Tab` 키로 그룹에 진입한 후, **좌우 방향키(Arrow Keys)**를 사용하여 옵션 간 포커스를 이동할 수 있습니다.
 * - **Screen Reader**: `role="group"` 및 내부적으로 적절한 토글 상태 속성이 자동으로 부여됩니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * ```tsx
 * const [viewType, setViewType] = useState<"map" | "list">("map");
 *
 * <SegmentedControls
 * value={viewType}
 * onChange={setViewType}
 * options={[
 * { label: "지도 보기", value: "map" },
 * { label: "목록 보기", value: "list" },
 * ]}
 * />
 * ```
 * {@end-tool}
 *
 * ## 참고사진
 * ![](<https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Forms/SegmentedControls/For%20Jsdoc.png?raw=true>)
 */
export const SegmentedControls = <T extends string | number>({
  options,
  value,
  onChange,
  className = "",
}: SegmentedControlsProps<T>) => {
  // Radix ToggleGroup은 string value를 기본으로 사용하므로,
  // string | number 타입 대응을 위해 핸들러를 래핑합니다.
  const handleValueChange = (newValue: string) => {
    // 빈 문자열 방지 (항상 하나는 선택되어 있도록 강제)
    if (!newValue) return;

    const selectedOption = options.find(
      (opt) => String(opt.value) === newValue,
    );
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

  return (
    <ToggleGroup.Root
      type="single"
      value={String(value)}
      onValueChange={handleValueChange}
      className={cn(
        "my-3 flex overflow-hidden rounded-lg",
        "border border-gray-300",
        className,
      )}
      aria-label="View selection"
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={String(option.value)}
          value={String(option.value)}
          aria-label={option.label}
          className={cn(
            "flex-1 py-2.5 text-sm transition-all duration-150 ease-in-out",
            "cursor-pointer outline-none",
            "hover:opacity-90",
            "border-none",
            "bg-gray-100 font-normal text-[#666]",
            "data-[state=on]:bg-[#222]",
            "data-[state=on]:font-semibold",
            "data-[state=on]:text-white",
          )}
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};

SegmentedControls.displayName = "SegmentedControls";
