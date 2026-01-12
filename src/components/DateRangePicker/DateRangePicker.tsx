import React, { useState, useEffect, useMemo } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { DayPicker, DateRange as DayPickerDateRange } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import dayjs, { Dayjs } from "dayjs";
import { cn } from "@/utils/cn";
import "react-day-picker/style.css";

export interface DateRange {
  start: string;
  end: string;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  startLabel?: string;
  endLabel?: string;
  className?: string;
}

type QuickSelectOption = {
  label: string;
  getValue: () => [Dayjs, Dayjs];
};

const getQuickSelectOptions = (): QuickSelectOption[] => {
  const now = dayjs();

  return [
    {
      label: "전체",
      getValue: () => [dayjs("1970-01-01"), dayjs("2099-12-31")],
    },
    {
      label: "오늘",
      getValue: () => [now, now],
    },
    {
      label: "내일",
      getValue: () => [now.add(1, "day"), now.add(1, "day")],
    },
    {
      label: "이번주",
      getValue: () => [now.startOf("week"), now.endOf("week")],
    },
    {
      label: "이번달",
      getValue: () => [now.startOf("month"), now.endOf("month")],
    },
    {
      label: "7일",
      getValue: () => [now, now.add(6, "day")],
    },
    {
      label: "30일",
      getValue: () => [now, now.add(29, "day")],
    },
    {
      label: "다음주",
      getValue: () => [
        now.add(1, "week").startOf("week"),
        now.add(1, "week").endOf("week"),
      ],
    },
    {
      label: "다음달",
      getValue: () => [
        now.add(1, "month").startOf("month"),
        now.add(1, "month").endOf("month"),
      ],
    },
  ];
};

/**
 * 사용자가 특정 기간(시작일과 종료일)을 선택할 수 있게 하는 컴포넌트입니다.
 *
 * {@link DateRangePicker}는 두 개의 연동된 달력을 통해 기간을 시각적으로 선택할 수 있으며,
 * '오늘', '이번주', '7일' 등 자주 사용되는 기간에 대한 빠른 선택(Quick Select) 기능을 제공합니다.
 *
 * `react-day-picker`와 `dayjs`를 기반으로 구현되었으며, 대규모 데이터 조회나
 * 일정 설정 등 기간 입력이 필요한 서비스에서 주로 사용됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **조회 기간 설정**: 특정 기간 내의 로그, 주문 내역, 통계 데이터 등을 조회할 때
 * - **일정 범위 지정**: 이벤트 진행 기간, 캠페인 유효 기간 등 시작과 끝이 있는 일정을 설정할 때
 * - **상대적 기간 선택**: '최근 7일', '이번 달' 등 현재 시점 기준의 상대적 기간을 빠르게 선택해야 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **단일 날짜 선택**: 하나의 날짜만 필요한 경우 `DatePicker`를 사용하세요.
 * - **고정된 기간**: '1주일', '1개월' 등 기간이 고정되어 있고 시작일만 선택하면 되는 경우 `DatePicker`와 드롭다운 조합이 더 나을 수 있습니다.
 *
 * ## Layout behavior
 *
 * - **Dual Calendar**: 두 개의 달력이 나란히 표시되어 시작일과 종료일을 한눈에 확인하고 조절할 수 있습니다.
 * - **Side Panels**: 왼쪽 사이드바에 '오늘', '이번주' 등 빠른 선택 버튼이 배치되어 접근성을 높입니다.
 * - **Combined Input**: 두 개의 입력창(시작, 종료)이 하나의 그룹으로 묶여 표시됩니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **적절한 시작/종료 레이블**: "시작일", "종료일" 또는 "등록일", "수정일" 등 문맥에 맞는 레이블을 사용하세요.
 * - **기간 확인 피드백**: 선택된 총 일수(예: 7일간)를 하단에 표시하여 사용자가 선택한 범위를 쉽게 인지하게 하세요.
 * - **빠른 선택 활용**: 사용자 조사의 80% 이상이 '최근 7일'이라면 해당 옵션을 눈에 띄게 배치하거나 기본값으로 고려하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **너무 넓은 기본 범위**: 데이터 양이 많을 경우 기본 범위를 너무 넓게 잡으면 성능 문제가 발생할 수 있습니다.
 * - **모바일에서의 레이아웃**: 2개의 달력이 나란히 표시되므로 모바일 환경에서는 화면을 넘칠 수 있습니다. 반응형 대응에 주의하세요.
 *
 * ## Accessibility
 *
 * - **Keyboard Management**: `Tab` 키로 시작일/종료일 입력창과 달력 내부 요소를 순차적으로 이동할 수 있습니다.
 * - **Visual Indicators**: 선택된 기간 내의 날짜들은 배경색으로 하이라이트되어 시각적으로 구분됩니다.
 * - **Screen Reader**: 시작일과 종료일의 레이블이 각각 명확히 연결되어 음성으로 안내됩니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 기간 선택 예시:
 *
 * ```tsx
 * const [range, setRange] = useState({ start: "2024-01-01", end: "2024-01-07" });
 *
 * <DateRangePicker
 *   value={range}
 *   onChange={setRange}
 *   startLabel="조회 시작"
 *   endLabel="조회 종료"
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 빠른 선택 옵션이 포함된 초기 상태:
 *
 * ```tsx
 * // '전체', '오늘', '내일', '이번주', '이번달', '7일', '30일' 등의
 * // 빠른 선택 옵션이 기본적으로 내장되어 있습니다.
 * <DateRangePicker
 *   className="w-[400px]"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link DatePicker}, 단일 날짜 선택이 필요한 경우
 * - {@link Dropdown}, 기간을 텍스트 기반의 선택지로 제공할 때
 *
 * ## 참고사진
 * ![](https://github.com/AlmSmartDoctor/ccds-screenshots/blob/main/screenshots/Forms/DateRangePicker/For%20Jsdoc.png?raw=true)
 */
export const DateRangePicker = React.forwardRef<
  HTMLDivElement,
  DateRangePickerProps
>(
  (
    {
      value,
      onChange,
      startLabel = "시작일자",
      endLabel = "종료일자",
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalRange, setInternalRange] = useState<
      [Dayjs | undefined, Dayjs | undefined]
    >([
      value?.start ? dayjs(value.start) : undefined,
      value?.end ? dayjs(value.end) : undefined,
    ]);

    useEffect(() => {
      if (value) {
        setInternalRange([
          value.start ? dayjs(value.start) : undefined,
          value.end ? dayjs(value.end) : undefined,
        ]);
      }
    }, [value]);

    const [fromDay, toDay] = internalRange;

    const selected: DayPickerDateRange | undefined = useMemo(() => {
      if (!fromDay) return undefined;
      return {
        from: fromDay.toDate(),
        to: toDay?.toDate(),
      };
    }, [fromDay, toDay]);

    const handleQuickSelect = (option: QuickSelectOption) => {
      const [start, end] = option.getValue();
      setInternalRange([start, end]);
    };

    const handleDayClick = (range: DayPickerDateRange | undefined) => {
      if (!range) {
        setInternalRange([undefined, undefined]);
        return;
      }

      const from = range.from ? dayjs(range.from) : undefined;
      const to = range.to ? dayjs(range.to) : undefined;

      setInternalRange([from, to]);
    };

    const handleApply = () => {
      if (fromDay && toDay) {
        onChange?.({
          start: fromDay.format("YYYY-MM-DD"),
          end: toDay.format("YYYY-MM-DD"),
        });
        setIsOpen(false);
      }
    };

    const handleCancel = () => {
      setInternalRange([
        value?.start ? dayjs(value.start) : undefined,
        value?.end ? dayjs(value.end) : undefined,
      ]);
      setIsOpen(false);
    };

    const numberOfDays = useMemo(() => {
      if (!fromDay || !toDay) return undefined;
      return toDay.diff(fromDay, "day") + 1;
    }, [fromDay, toDay]);

    const displayValue = useMemo(() => {
      if (!value?.start || !value?.end) {
        return { start: "", end: "" };
      }
      return {
        start: dayjs(value.start).format("YYYY-MM-DD"),
        end: dayjs(value.end).format("YYYY-MM-DD"),
      };
    }, [value]);

    return (
      <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <PopoverPrimitive.Trigger asChild>
          <div ref={ref} className={cn("flex items-center gap-0", className)}>
            <div className="relative flex-1">
              <div
                className={cn(
                  "absolute top-0 left-3 flex h-full items-center",
                  "text-xs text-gray-500",
                  "pointer-events-none",
                )}
              >
                <label>{startLabel}</label>
              </div>
              <input
                type="text"
                readOnly
                value={displayValue.start}
                placeholder="YYYY-MM-DD"
                className={cn(
                  "h-10 w-full bg-white pr-3 pl-14.75 text-sm",
                  "focus:outline-none",
                  "rounded-l border border-r-0 border-gray-300",
                  "hover:border-gray-400 hover:bg-gray-50",
                  "transition-all duration-150",
                  "cursor-pointer",
                )}
              />
            </div>
            <div className="relative flex-1">
              <div
                className={cn(
                  "absolute top-0 left-3 flex h-full items-center",
                  "text-xs text-gray-500",
                  "pointer-events-none",
                )}
              >
                <label>{endLabel}</label>
              </div>
              <input
                type="text"
                readOnly
                value={displayValue.end}
                placeholder="YYYY-MM-DD"
                className={cn(
                  "h-10 w-full bg-white pr-3 pl-14.75",
                  "text-sm",
                  "rounded-r border border-gray-300",
                  "hover:border-gray-400 hover:bg-gray-50",
                  "focus:outline-none",
                  "transition-all duration-150",
                  "cursor-pointer",
                )}
              />
            </div>
          </div>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={5}
            className={cn(
              "z-50 rounded-lg bg-white p-2",
              "border border-gray-200",
              "shadow-xl",
              "data-[state=open]:animate-in",
              "data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0",
              "data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95",
              "data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2",
              "data-[side=top]:slide-in-from-bottom-2",
            )}
          >
            <div className="flex gap-2">
              {/* Quick Select Buttons */}
              <div className="flex flex-col border-r border-gray-200 pr-2">
                {getQuickSelectOptions().map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleQuickSelect(option)}
                    className={cn(
                      "cursor-pointer border-0",
                      "h-6.5 w-17.5 px-2",
                      "text-left text-xs text-gray-700",
                      "bg-white",
                      "transition-all duration-150",
                      "hover:bg-blue-50",
                      "hover:font-medium",
                      "hover:text-blue-600",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {/* Calendar */}
              <div className="date-range-picker-calendar">
                <DayPicker
                  mode="range"
                  selected={selected}
                  onSelect={handleDayClick}
                  numberOfMonths={2}
                  locale={ko}
                  formatters={{
                    formatCaption: (date) => {
                      return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
                    },
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div
              className={cn(
                "mt-2 flex items-end justify-between pt-2",
                "border-t border-gray-200",
              )}
            >
              <div className="flex min-h-8 flex-col">
                {!fromDay || !toDay ? (
                  <span className="text-xs text-red-500">
                    종료일자를 선택해 주세요.
                  </span>
                ) : (
                  <>
                    <span className="text-xs text-gray-700">
                      {fromDay.format("YYYY-MM-DD")} ~{" "}
                      {toDay.format("YYYY-MM-DD")}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({numberOfDays}일간)
                    </span>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className={cn(
                    "h-8 w-15 cursor-pointer",
                    "rounded border border-gray-300 bg-transparent",
                    "text-xs font-medium text-gray-700",
                    "transition-all duration-150",
                    "hover:bg-gray-50 active:scale-95",
                  )}
                >
                  취소
                </button>
                <button
                  onClick={handleApply}
                  disabled={!fromDay || !toDay}
                  className={cn(
                    "cursor-pointer border-0",
                    "h-8 w-15",
                    "rounded bg-blue-600",
                    "text-xs font-medium text-cms-white",
                    "hover:bg-blue-700 active:scale-95",
                    "disabled:bg-gray-300",
                    "disabled:active:scale-100",
                    "disabled:cursor-not-allowed",
                    "transition-all duration-150",
                  )}
                >
                  적용
                </button>
              </div>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);

DateRangePicker.displayName = "DateRangePicker";
