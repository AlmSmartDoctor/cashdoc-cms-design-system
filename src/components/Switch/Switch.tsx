import React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const DEFAULT_SWITCH_WIDTH = 40;
const SWITCH_LABEL_OFFSET_PX = 3;
const SWITCH_THUMB_TRAVEL_OFFSET_PX = 26;

type SwitchInlineStyle = React.CSSProperties & Record<`--${string}`, string>;

const resolveSwitchWidth = (width?: number | string): string => {
  if (typeof width === "number") {
    return `${Math.max(width, DEFAULT_SWITCH_WIDTH)}px`;
  }

  if (typeof width === "string") {
    const trimmedWidth = width.trim();

    if (!trimmedWidth) return `${DEFAULT_SWITCH_WIDTH}px`;

    if (!Number.isNaN(Number(trimmedWidth))) {
      return `${Math.max(Number(trimmedWidth), DEFAULT_SWITCH_WIDTH)}px`;
    }

    return trimmedWidth;
  }

  return `${DEFAULT_SWITCH_WIDTH}px`;
};

const switchVariants = cva(
  cn(
    "peer group relative inline-flex items-center transition-colors",
    "box-border rounded-full border-2 border-transparent",
    "h-6 w-(--switch-track-width-safe) shrink-0 px-px py-0.5",
    "cursor-pointer",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=unchecked]:bg-cms-gray-300",
  ),

  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-cms-primary-200",
        green: "data-[state=checked]:bg-cms-green-500",
        black: "data-[state=checked]:bg-cms-black",
        blue: "data-[state=checked]:bg-cms-blue-700",
        red: "data-[state=checked]:bg-cms-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type SwitchProps = {
  /**
   * 스위치 트랙의 가로 길이입니다.
   * - `number` 입력 시 px 단위로 처리됩니다. (예: `96`)
   * - `string` 입력 시 CSS 길이값으로 처리됩니다. (예: `8rem`, `120px`)
   * - 최소 길이는 기본 크기(40px)입니다.
   */
  width?: number | string;
  /**
   * 스위치가 켜짐(`checked`) 상태일 때, thumb 반대편(왼쪽 빈 영역)에 표시할 텍스트입니다.
   */
  checkedLabel?: React.ReactNode;
  /**
   * 스위치가 꺼짐(`unchecked`) 상태일 때, thumb 반대편(오른쪽 빈 영역)에 표시할 텍스트입니다.
   */
  uncheckedLabel?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
  VariantProps<typeof switchVariants>;

/**
 * 두 가지 상반된 상태(On/Off, 활성/비활성)를 즉각적으로 전환할 때 사용하는 컴포넌트입니다.
 *
 * {@link Switch}는 실제 전등 스위치와 같은 직관적인 시각적 모델을 제공하며,
 * 체크박스보다 더 '즉각적인 반영'의 의미를 가집니다.
 *
 * Radix UI의 Switch 컴포넌트를 기반으로 구현되어 접근성과 애니메이션이
 * 자동으로 처리됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **즉각적 설정 반영**: 클릭 즉시 시스템 설정이 변경되거나 저장되어야 할 때 (예: 다크모드 켜기, 알림 수신 동의)
 * - **상태 전환**: 특정 기능의 사용 여부를 결정할 때
 * - **단순 토글**: 복잡한 입력 없이 켜고 끄는 행위만 필요할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **제출 버튼 필요**: 여러 정보를 입력하고 '확인' 버튼을 눌러야 결과가 반영되는 폼 내에서는 `Checkbox`를 사용하세요.
 * - **다중 선택**: 여러 항목 중 일부를 골라야 할 때도 `Checkbox`가 더 적합합니다.
 *
 * ## Layout behavior
 *
 * - **Inline Component**: 주변 텍스트나 다른 요소와 자연스럽게 어우러지는 인라인 블록 형태입니다.
 * - **Thumb Animation**: 클릭 시 스위치의 '손잡이(Thumb)'가 부드럽게 좌우로 이동하며 상태 변화를 시각화합니다.
 * - **Adjustable Width**: `width` prop으로 가로 길이를 확장할 수 있으며, 높이(24px)와 thumb 크기(20px)는 고정됩니다.
 * - **Inner State Label**: `checkedLabel`, `uncheckedLabel`을 사용하면 스위치 내부 빈 영역에 상태 텍스트를 표시할 수 있습니다.
 *
 * ## Props (확장 기능)
 *
 * - **width**: 스위치 가로 길이 (`number | string`)
 * - **checkedLabel**: 켜짐 상태에서 왼쪽 빈 영역에 표시할 텍스트 (`ReactNode`)
 * - **uncheckedLabel**: 꺼짐 상태에서 오른쪽 빈 영역에 표시할 텍스트 (`ReactNode`)
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확한 현재 상태 표시**: 색상 변화(회색 vs 색상)를 통해 켜져 있는지 꺼져 있는지 한눈에 알 수 있게 하세요.
 * - **문맥 레이블 제공**: 스위치가 무엇을 제어하는지 외부 레이블(스위치 옆 텍스트) 또는 내부 상태 텍스트로 명확히 표현하세요.
 * - **텍스트 길이에 맞는 폭 사용**: `checkedLabel`과 `uncheckedLabel` 길이를 고려해 `width` 값을 지정하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **모호한 의미**: 상태 전환 후에 어떤 변화가 생길지 명확하지 않은 경우에는 사용을 지양하세요.
 * - **긴 대기 시간**: 서버 통신 등으로 인해 상태 반영에 시간이 걸리는 경우, 로딩 인디케이터를 함께 보여주거나 즉시 반응을 우선 처리하세요.
 *
 * ## Accessibility
 *
 * - **Keyboard Support**: `Space` 키를 사용하여 상태를 전환할 수 있습니다.
 * - **Roles**: `role="switch"` 속성을 사용하여 스크린 리더에서 토글 상태를 읽어줍니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 레이블과 함께 사용하는 기본적인 스위치:
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Switch id="airplane-mode" />
 *   <label htmlFor="airplane-mode">비행기 모드</label>
 * </div>
 * ```
 *
 * 내부 상태 텍스트와 가변 길이를 사용하는 스위치:
 *
 * ```tsx
 * <Switch
 *   width={96}
 *   checkedLabel="노출"
 *   uncheckedLabel="미노출"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Checkbox}, 제출 전까지 상태를 유지해야 하는 경우
 * - {@link RadioButton}, 여러 선택지 중 하나를 고르는 경우
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Forms/Switch/For%20Jsdoc.png?raw=true)
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    {
      className,
      variant,
      width,
      checkedLabel,
      uncheckedLabel,
      style,
      ...props
    },
    ref,
  ) => {
    const resolvedWidth = resolveSwitchWidth(width);
    const trackWidthSafe = `max(var(--switch-track-width), ${DEFAULT_SWITCH_WIDTH}px)`;
    const thumbTravelDistance = `calc(var(--switch-track-width-safe) - ${SWITCH_THUMB_TRAVEL_OFFSET_PX}px)`;

    const switchStyle: SwitchInlineStyle = {
      ...style,
      "--switch-track-width": resolvedWidth,
      "--switch-track-width-safe": trackWidthSafe,
      "--switch-thumb-translate": thumbTravelDistance,
      "--switch-label-width": thumbTravelDistance,
    };

    return (
      <SwitchPrimitives.Root
        className={cn(switchVariants({ variant }), className)}
        {...props}
        style={switchStyle}
        ref={ref}
      >
        {(checkedLabel || uncheckedLabel) && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <span
              className={cn(
                "absolute inset-y-0 flex w-(--switch-label-width) items-center",
                "justify-center overflow-hidden px-1",
                "text-[10px] leading-none font-medium text-ellipsis",
                "whitespace-nowrap text-cms-white",
                "invisible opacity-0 transition-opacity",
                "group-data-[state=checked]:visible",
                "group-data-[state=checked]:opacity-100",
              )}
              style={{ left: `${SWITCH_LABEL_OFFSET_PX}px` }}
            >
              {checkedLabel}
            </span>
            <span
              className={cn(
                "absolute inset-y-0 flex w-(--switch-label-width) items-center",
                "justify-center overflow-hidden px-1",
                "text-[10px] leading-none font-medium text-ellipsis",
                "visible whitespace-nowrap text-cms-gray-700 opacity-100",
                "transition-opacity",
                "group-data-[state=checked]:invisible",
                "group-data-[state=checked]:opacity-0",
              )}
              style={{ right: `${SWITCH_LABEL_OFFSET_PX}px` }}
            >
              {uncheckedLabel}
            </span>
          </span>
        )}
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none absolute top-1/2 left-px z-10 block",
            "rounded-full ring-0",
            "bg-cms-white shadow-lg",
            "size-5",
            "cursor-pointer",
            "-translate-y-1/2",
            "data-[state=unchecked]:translate-x-0",
            "data-[state=checked]:translate-x-(--switch-thumb-translate)",
            "transition-transform",
          )}
        />
      </SwitchPrimitives.Root>
    );
  },
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
