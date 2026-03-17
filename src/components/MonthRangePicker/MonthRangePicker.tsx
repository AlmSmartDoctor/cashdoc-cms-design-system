import React, { useState, useMemo } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { cn } from "@/utils/cn";
import type { DateRange } from "../DateRangePicker/DateRangePicker";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import "react-day-picker/style.css";

const MONTH_NAMES = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export type MonthRangePickerProps = {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  startLabel?: string;
  endLabel?: string;
  className?: string;
  /** 선택 가능한 최소 날짜 (YYYY-MM-DD) */
  min?: string;
  /** 선택 가능한 최대 날짜 (YYYY-MM-DD) */
  max?: string;
};

const toDayjsRange = (
  range?: DateRange,
): [Dayjs | undefined, Dayjs | undefined] => {
  return [
    range?.start ? dayjs(range.start) : undefined,
    range?.end ? dayjs(range.end) : undefined,
  ];
};

const clampToMinMax = (
  fromDay: Dayjs,
  toDay: Dayjs,
  min?: string,
  max?: string,
): { start: Dayjs; end: Dayjs } => {
  let start = fromDay.startOf("month");
  let end = toDay.endOf("month");

  if (fromDay.isAfter(toDay, "month")) {
    [start, end] = [toDay.startOf("month"), fromDay.endOf("month")];
  }
  if (min) {
    const minDate = dayjs(min);
    if (start.isBefore(minDate, "day")) start = minDate;
  }
  if (max) {
    const maxDate = dayjs(max);
    if (end.isAfter(maxDate, "day")) end = maxDate;
  }
  return { start, end };
};

/** year, month를 받아 해당 월 1일 00:00:00을 반환 */
const monthToDate = (year: number, month: number): Dayjs =>
  dayjs(`${year}-${String(month).padStart(2, "0")}-01`);

const toDateRangeFromMonths = (
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number,
  min?: string,
  max?: string,
): DateRange => {
  const fromDay = monthToDate(startYear, startMonth);
  const toDay = monthToDate(endYear, endMonth);
  const { start, end } = clampToMinMax(fromDay, toDay, min, max);
  return {
    start: start.format("YYYY-MM-DD"),
    end: end.format("YYYY-MM-DD"),
  };
};

const isMonthDisabled = (
  year: number,
  month: number,
  min?: string,
  max?: string,
): boolean => {
  const monthStart = monthToDate(year, month);
  const monthEnd = monthStart.endOf("month");

  if (min) {
    const minDate = dayjs(min);
    if (monthEnd.isBefore(minDate, "day")) return true;
  }
  if (max) {
    const maxDate = dayjs(max);
    if (monthStart.isAfter(maxDate, "day")) return true;
  }
  return false;
};

/**
 * 사용자가 월 단위로 기간(시작월과 종료월)을 선택할 수 있게 하는 컴포넌트입니다.
 *
 * {@link MonthRangePicker}는 4×3 그리드로 1~12월을 표시하며, 두 개의 연도 섹션이
 * 나란히 배치되어 넓은 기간을 빠르게 선택할 수 있습니다.
 * **선택 단위는 월이지만, 반환값은 날짜(YYYY-MM-DD)입니다.**
 * 시작월은 해당 월 1일, 종료월은 해당 월 말일로 변환되어 `DateRange`로 전달됩니다.
 *
 * {@link DateRangePicker}와 달리 빠른 선택 옵션은 없으며, 달력 형태의 월 그리드만 제공합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **월 단위 조회**: 월별 매출, 월별 통계 등 월 단위 집계가 필요한 조회 기간 설정
 * - **넓은 기간 선택**: 여러 달에 걸친 기간을 날짜보다 빠르게 선택할 때
 * - **간소화된 UI**: 일 단위 선택이 불필요하고 월 단위로 충분한 경우
 *
 * **사용하지 말아야 하는 경우:**
 * - **일 단위 선택**: 특정 날짜를 지정해야 할 때 {@link DateRangePicker}를 사용하세요.
 * - **연도 단위 선택**: 연도 단위 기간이 필요할 때 {@link YearRangePicker}를 사용하세요.
 *
 * ## Layout behavior
 *
 * - **Dual Year Grid**: 두 개의 연도(예: 2025년, 2026년)가 나란히 표시되며, 각각 4×3 월 그리드를 가집니다.
 * - **Combined Input**: 두 개의 입력창(시작, 종료)이 하나의 그룹으로 묶여 YYYY-MM-DD 형식으로 표시됩니다.
 * - **Range Highlight**: 선택된 기간의 월들은 시각적으로 연결되어 표시됩니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **적절한 레이블**: "조회 시작", "조회 종료" 등 문맥에 맞는 레이블을 사용하세요.
 * - **min/max 설정**: 데이터 존재 기간이 제한된 경우 `min`, `max`로 선택 가능 범위를 제한하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **일 단위 정확도 필요 시**: 월 선택은 해당 월 1일~말일로 변환되므로, 특정 일자 지정이 필요하면 DateRangePicker를 사용하세요.
 *
 * ## Accessibility
 *
 * - **Keyboard**: `Tab` 키로 입력창과 팝오버 내부 요소를 순차 이동할 수 있습니다.
 * - **Screen Reader**: 시작일/종료일 레이블이 각 입력창에 연결되어 있습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 월 기간 선택 (필수 prop만 사용):
 *
 * ```tsx
 * const [range, setRange] = useState<DateRange>({ start: "", end: "" });
 *
 * <MonthRangePicker
 *   value={range}
 *   onChange={setRange}
 * />
 * ```
 * 선택된 월은 날짜로 변환되어 반환됩니다. (예: 2025년 1월 → 2025-01-01 ~ 2025-01-31)
 * {@end-tool}
 *
 * See also:
 *
 * - {@link DateRangePicker}, 일 단위 기간 선택
 * - {@link YearRangePicker}, 연도 단위 기간 선택
 *
 */
export const MonthRangePicker = React.forwardRef<
  HTMLDivElement,
  MonthRangePickerProps
>(
  (
    {
      value,
      onChange,
      startLabel = "시작일자",
      endLabel = "종료일자",
      className,
      min,
      max,
    },
    ref,
  ) => {
    const id = React.useId();
    const [isOpen, setIsOpen] = useState(false);
    const [baseYear, setBaseYear] = useState(() => {
      const from = value?.start ? dayjs(value.start) : dayjs();
      return from.year();
    });
    const [draftRange, setDraftRange] = useState<
      [Dayjs | undefined, Dayjs | undefined]
    >(() => toDayjsRange(value));
    const [fromDay, toDay] = draftRange;

    const displayValue = useMemo(() => {
      if (!value || !value.start || !value.end) {
        return { start: "", end: "" };
      }
      return {
        start: dayjs(value.start).format("YYYY-MM-DD"),
        end: dayjs(value.end).format("YYYY-MM-DD"),
      };
    }, [value]);

    const handleMonthClick = (year: number, month: number) => {
      if (isMonthDisabled(year, month, min, max)) return;

      const monthDate = monthToDate(year, month);
      const hasSingleMonth = fromDay && toDay && fromDay.isSame(toDay, "month");

      // 처음 선택 시: start month 선택 → start=end
      if (!fromDay || !toDay) {
        setDraftRange([monthDate, monthDate]);
        return;
      }

      // single month 상태에서 같은 월 재클릭 → clear
      if (hasSingleMonth && fromDay.isSame(monthDate, "month")) {
        setDraftRange([undefined, undefined]);
        return;
      }

      // single month 상태에서 다른 월 클릭 → 이전 월=start, 이후 월=end
      if (hasSingleMonth) {
        const [start, end] =
          fromDay.isBefore(monthDate) ?
            [fromDay, monthDate]
          : [monthDate, fromDay];
        setDraftRange([start, end]);
        return;
      }

      // range 상태 start, end 정렬 (방어코드)
      const [start, end] =
        fromDay.isBefore(toDay) || fromDay.isSame(toDay, "month") ?
          [fromDay, toDay]
        : [toDay, fromDay];

      // range 상태에서 start 또는 end 클릭 → 해당 월로 start=end
      if (monthDate.isSame(start, "month") || monthDate.isSame(end, "month")) {
        setDraftRange([monthDate, monthDate]);
        return;
      }

      // range 상태에서 middle month 클릭
      // start 이전 선택 → start 변경, 그 외(범위 내/end 이후) → end 변경
      if (monthDate.isBefore(start, "month")) {
        setDraftRange([monthDate, end]);
      } else {
        setDraftRange([start, monthDate]);
      }
    };

    // 스타일 적용을 위한 상태값
    const getMonthState = (
      year: number,
      month: number,
    ): "start" | "end" | "middle" | "start-end" | "none" => {
      if (!fromDay) return "none";
      if (!toDay) {
        const d = monthToDate(year, month);
        return fromDay.isSame(d, "month") ? "start" : "none";
      }

      const monthStart = monthToDate(year, month);
      const fromMonth = fromDay.startOf("month");
      const toMonth = toDay.startOf("month");

      if (
        monthStart.isSame(fromMonth, "month") &&
        monthStart.isSame(toMonth, "month")
      ) {
        return "start-end";
      }
      if (monthStart.isSame(fromMonth, "month")) return "start";
      if (monthStart.isSame(toMonth, "month")) return "end";
      if (
        monthStart.isAfter(fromMonth, "month") &&
        monthStart.isBefore(toMonth, "month")
      ) {
        return "middle";
      }
      return "none";
    };

    const handleApply = () => {
      if (fromDay && toDay) {
        const [start, end] =
          fromDay.isBefore(toDay) || fromDay.isSame(toDay, "month") ?
            [fromDay, toDay]
          : [toDay, fromDay];
        const range = toDateRangeFromMonths(
          start.year(),
          start.month() + 1,
          end.year(),
          end.month() + 1,
          min,
          max,
        );
        onChange?.(range);
        setIsOpen(false);
      }
    };

    const handleCancel = () => {
      setDraftRange(toDayjsRange(value));
      setIsOpen(false);
    };

    const handleOpenChange = (nextOpen: boolean) => {
      if (nextOpen) {
        setDraftRange(toDayjsRange(value));
        setBaseYear(value?.start ? dayjs(value.start).year() : dayjs().year());
      }
      setIsOpen(nextOpen);
    };

    const clampedRange = useMemo(() => {
      if (!fromDay || !toDay) return undefined;
      return clampToMinMax(fromDay, toDay, min, max);
    }, [fromDay, toDay, min, max]);

    const numberOfMonths = useMemo(() => {
      if (!clampedRange) return undefined;
      const { start, end } = clampedRange;
      return (
        (end.year() - start.year()) * 12 + (end.month() - start.month()) + 1
      );
    }, [clampedRange]);

    const minYear = min ? dayjs(min).year() : undefined;
    const maxYear = max ? dayjs(max).year() : undefined;
    const isPrevYearDisabled = minYear != null && baseYear <= minYear;
    const isNextYearDisabled = maxYear != null && baseYear >= maxYear;

    const renderMonthSection = (year: number) => (
      <div key={year} className="rdp-month">
        <table className="rdp-month_grid">
          <tbody>
            {[0, 1, 2].map((rowIdx) => (
              <tr key={rowIdx} className="rdp-week">
                {[0, 1, 2, 3].map((colIdx) => {
                  const month = rowIdx * 4 + colIdx + 1;
                  const disabled = isMonthDisabled(year, month, min, max);
                  const state = getMonthState(year, month);
                  const dayClasses = cn(
                    "rdp-day",
                    disabled && "rdp-day_disabled",
                    state === "start" && "rdp-day_selected rdp-day_range_start",
                    state === "end" && "rdp-day_selected rdp-day_range_end",
                    state === "middle" && "rdp-day_range_middle",
                    state === "start-end" &&
                      "rdp-day_selected rdp-day_range_start rdp-day_range_end",
                  );
                  return (
                    <td key={month} className={dayClasses} role="gridcell">
                      <button
                        type="button"
                        className={cn(
                          "rdp-day_button",
                          disabled && "rdp-day_button--disabled",
                        )}
                        disabled={disabled}
                        onClick={() => handleMonthClick(year, month)}
                      >
                        {MONTH_NAMES[month - 1]}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
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
                <label htmlFor={`${id}-start`}>{startLabel}</label>
              </div>
              <input
                id={`${id}-start`}
                type="text"
                readOnly
                value={displayValue.start}
                placeholder="YYYY-MM-DD"
                aria-label={startLabel}
                className={cn(
                  "h-10 w-full bg-white pr-3 pl-14-75 text-sm",
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
                <label htmlFor={`${id}-end`}>{endLabel}</label>
              </div>
              <input
                id={`${id}-end`}
                type="text"
                readOnly
                value={displayValue.end}
                placeholder="YYYY-MM-DD"
                aria-label={endLabel}
                className={cn(
                  "h-10 w-full bg-white pr-3 pl-14-75",
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
            <div
              className="date-range-picker-calendar month-range-picker-calendar"
            >
              <div className="rdp rdp-root">
                {/* Full-width nav bar: prev at left, years in center, next at right */}
                <div
                  className={cn(
                    "rdp-month_caption flex w-full items-center",
                    "justify-between px-0",
                  )}
                >
                  <button
                    type="button"
                    className="rdp-button_previous shrink-0"
                    disabled={isPrevYearDisabled}
                    onClick={() => setBaseYear((y) => y - 1)}
                    aria-label="이전 연도"
                  >
                    <ChevronLeftIcon size={16} className="text-cms-gray-600" />
                  </button>
                  <div className="flex flex-1 gap-20">
                    <div
                      className="rdp-caption_label flex-1 justify-center"
                    >
                      {baseYear}년
                    </div>
                    <div
                      className="rdp-caption_label flex-1 justify-center"
                    >
                      {baseYear + 1}년
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rdp-button_next shrink-0"
                    disabled={isNextYearDisabled}
                    onClick={() => setBaseYear((y) => y + 1)}
                    aria-label="다음 연도"
                  >
                    <ChevronRightIcon size={16} className="text-cms-gray-600" />
                  </button>
                </div>
                <div className="rdp-months">
                  {renderMonthSection(baseYear)}
                  {renderMonthSection(baseYear + 1)}
                </div>
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
                {!fromDay || !toDay ?
                  <span className="text-xs text-red-500">
                    기간을 선택해 주세요.
                  </span>
                : clampedRange ?
                  <>
                    <span className="text-xs text-gray-700">
                      {clampedRange.start.format("YYYY-MM-DD")} ~{" "}
                      {clampedRange.end.format("YYYY-MM-DD")}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({numberOfMonths}개월)
                    </span>
                  </>
                : null}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className={cn(
                    "h-8 w-15 cursor-pointer",
                    "rounded-sm border border-gray-300 bg-transparent",
                    "text-xs font-medium text-gray-700",
                    "transition-all duration-150",
                    "hover:bg-gray-50",
                    "active:scale-95",
                  )}
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={!fromDay || !toDay}
                  className={cn(
                    "cursor-pointer border-0",
                    "h-8 w-15",
                    "rounded-sm bg-[#358fff]",
                    "text-xs font-medium text-white",
                    "hover:bg-[#0071fe]",
                    "active:scale-95",
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

MonthRangePicker.displayName = "MonthRangePicker";
