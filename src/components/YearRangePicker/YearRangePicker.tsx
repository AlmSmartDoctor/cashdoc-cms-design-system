import React, { useState, useMemo, useRef, useEffect } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { cn } from "@/utils/cn";
import type { DateRange } from "../DateRangePicker/DateRangePicker";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { formatYearDigits, parseYearInput } from "@/utils/dateInputFormat";
import "react-day-picker/style.css";

const YEARS_PER_SECTION = 10;

export type YearRangePickerProps = {
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

const clampToMinMaxYears = (
  fromYear: Dayjs,
  toYear: Dayjs,
  min?: string,
  max?: string,
): { start: Dayjs; end: Dayjs } => {
  let start = fromYear.startOf("year");
  let end = toYear.endOf("year");
  if (fromYear.isAfter(toYear, "year")) {
    [start, end] = [toYear.startOf("year"), fromYear.endOf("year")];
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

const toDateRangeFromYears = (
  startYear: number,
  endYear: number,
  min?: string,
  max?: string,
): DateRange => {
  const fromYear = dayjs(`${startYear}-01-01`);
  const toYear = dayjs(`${endYear}-12-31`);
  const { start, end } = clampToMinMaxYears(fromYear, toYear, min, max);
  return {
    start: start.format("YYYY-MM-DD"),
    end: end.format("YYYY-MM-DD"),
  };
};

const isYearDisabled = (year: number, min?: string, max?: string): boolean => {
  const minYear = min ? dayjs(min).year() : undefined;
  const maxYear = max ? dayjs(max).year() : undefined;
  if (minYear != null && year < minYear) return true;
  if (maxYear != null && year > maxYear) return true;
  return false;
};

/**
 * 사용자가 연도 단위로 기간(시작연도와 종료연도)을 선택할 수 있게 하는 컴포넌트입니다.
 *
 * {@link YearRangePicker}는 두 개의 섹션(각 10년)으로 총 20년을 그리드로 표시하며,
 * **선택 단위는 연도이지만, 반환값은 날짜(YYYY-MM-DD)입니다.**
 * 시작연도는 해당 연 1월 1일, 종료연도는 해당 연 12월 31일로 변환되어 `DateRange`로 전달됩니다.
 *
 * {@link DateRangePicker}와 달리 빠른 선택 옵션은 없으며, 연도 그리드만 제공합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **연도 단위 조회**: 연도별 매출, 연도별 통계 등 연 단위 집계가 필요한 조회 기간 설정
 * - **넓은 기간 선택**: 여러 해에 걸친 기간을 월/일보다 빠르게 선택할 때
 * - **간소화된 UI**: 월·일 단위 선택이 불필요하고 연도 단위로 충분한 경우
 *
 * **사용하지 말아야 하는 경우:**
 * - **일/월 단위 선택**: 특정 날짜나 월을 지정해야 할 때 {@link DateRangePicker} 또는 {@link MonthRangePicker}를 사용하세요.
 *
 * ## Layout behavior
 *
 * - **Dual Decade Grid**: 두 개의 10년 단위 섹션(예: 2020~2029, 2030~2039)이 나란히 표시됩니다.
 * - **Combined Input**: 두 개의 입력창(시작, 종료)이 하나의 그룹으로 묶여 YYYY-MM-DD 형식으로 표시됩니다.
 * - **Range Highlight**: 선택된 기간의 연도들은 시각적으로 연결되어 표시됩니다.
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
 * - **월/일 단위 정확도 필요 시**: 연도 선택은 해당 연 1/1~12/31로 변환되므로, 특정 월·일 지정이 필요하면 MonthRangePicker 또는 DateRangePicker를 사용하세요.
 *
 * ## Accessibility
 *
 * - **Keyboard**: `Tab` 키로 입력창과 팝오버 내부 요소를 순차 이동할 수 있습니다.
 * - **Screen Reader**: 시작일/종료일 레이블이 각 입력창에 연결되어 있습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 연도 기간 선택 (필수 prop만 사용):
 *
 * ```tsx
 * const [range, setRange] = useState<DateRange>({ start: "", end: "" });
 *
 * <YearRangePicker
 *   value={range}
 *   onChange={setRange}
 * />
 * ```
 * 선택된 연도는 날짜로 변환되어 반환됩니다. (예: 2024년 ~ 2025년 → 2024-01-01 ~ 2025-12-31)
 * {@end-tool}
 *
 * See also:
 *
 * - {@link DateRangePicker}, 일 단위 기간 선택
 * - {@link MonthRangePicker}, 월 단위 기간 선택
 *
 */
export const YearRangePicker = React.forwardRef<
  HTMLDivElement,
  YearRangePickerProps
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
      return Math.floor(from.year() / 20) * 20;
    });
    const [draftRange, setDraftRange] = useState<
      [Dayjs | undefined, Dayjs | undefined]
    >(() => toDayjsRange(value));
    const [fromDay, toDay] = draftRange;
    const [startInput, setStartInput] = useState(() =>
      value?.start ? dayjs(value.start).format("YYYY") : "",
    );
    const [endInput, setEndInput] = useState(() =>
      value?.end ? dayjs(value.end).format("YYYY") : "",
    );
    const [inputError, setInputError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (!inputError) return;
      const timer = window.setTimeout(() => setInputError(null), 2500);
      return () => window.clearTimeout(timer);
    }, [inputError]);

    const setContainerRef = (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const leftYears = useMemo(
      () => Array.from({ length: YEARS_PER_SECTION }, (_, i) => baseYear + i),
      [baseYear],
    );
    const rightYears = useMemo(
      () =>
        Array.from(
          { length: YEARS_PER_SECTION },
          (_, i) => baseYear + YEARS_PER_SECTION + i,
        ),
      [baseYear],
    );

    const displayValue = useMemo(() => {
      if (!value || !value.start || !value.end) {
        return { start: "", end: "" };
      }
      return {
        start: dayjs(value.start).format("YYYY-MM-DD"),
        end: dayjs(value.end).format("YYYY-MM-DD"),
      };
    }, [value]);

    const startFieldValue = isOpen ? startInput : displayValue.start;
    const endFieldValue = isOpen ? endInput : displayValue.end;

    const syncInputsFromDraft = (
      next: [Dayjs | undefined, Dayjs | undefined],
    ) => {
      setStartInput(next[0] ? next[0].format("YYYY") : "");
      setEndInput(next[1] ? next[1].format("YYYY") : "");
    };

    const applyDraft = (next: [Dayjs | undefined, Dayjs | undefined]) => {
      setDraftRange(next);
      syncInputsFromDraft(next);
    };

    const handleYearClick = (year: number) => {
      if (isYearDisabled(year, min, max)) return;

      const yearDate = dayjs(`${year}-01-01`);
      const hasSingleYear = fromDay && toDay && fromDay.isSame(toDay, "year");

      // 처음 선택 시: start year 선택 → start=end (해당 연도 1/1 ~ 12/31)
      if (!fromDay || !toDay) {
        applyDraft([yearDate.startOf("year"), yearDate.endOf("year")]);
        return;
      }

      // single year 상태에서 같은 연도 재클릭 → clear
      if (hasSingleYear && fromDay.isSame(yearDate, "year")) {
        applyDraft([undefined, undefined]);
        return;
      }

      // single year 상태에서 다른 연도 클릭 → 이전 연도=start, 이후 연도=end
      if (hasSingleYear) {
        const [start, end] =
          fromDay.isBefore(yearDate) ?
            [fromDay.startOf("year"), yearDate.endOf("year")]
          : [yearDate.startOf("year"), fromDay.endOf("year")];
        applyDraft([start, end]);
        return;
      }

      // range 상태 start, end 정렬 (방어코드)
      const [start, end] =
        fromDay.isBefore(toDay) || fromDay.isSame(toDay, "year") ?
          [fromDay, toDay]
        : [toDay, fromDay];

      // range 상태에서 start 또는 end 클릭 → 해당 연도로 start=end
      if (yearDate.isSame(start, "year") || yearDate.isSame(end, "year")) {
        applyDraft([yearDate, yearDate.endOf("year")]);
        return;
      }

      // range 상태에서 middle year 클릭
      // start 이전 선택 → start 변경, 그 외(범위 내/end 이후) → end 변경
      if (yearDate.isBefore(start, "year")) {
        applyDraft([yearDate, end]);
      } else {
        applyDraft([start, yearDate.endOf("year")]);
      }
    };

    const clampYear = (d: Dayjs, mode: "start" | "end"): Dayjs => {
      let result = mode === "start" ? d.startOf("year") : d.endOf("year");
      if (min) {
        const minDate = dayjs(min);
        if (result.isBefore(minDate, "day")) result = minDate;
      }
      if (max) {
        const maxDate = dayjs(max);
        if (result.isAfter(maxDate, "day")) result = maxDate;
      }
      return result;
    };

    const handleStartInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setStartInput(formatYearDigits(e.target.value));
    };

    const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndInput(formatYearDigits(e.target.value));
    };

    const commitStartInput = () => {
      const parsed = parseYearInput(startInput, "start");
      if (!parsed) {
        setStartInput(fromDay ? fromDay.format("YYYY") : "");
        return;
      }
      const clamped = clampYear(parsed, "start");
      const next: [Dayjs | undefined, Dayjs | undefined] =
        toDay && clamped.isAfter(toDay, "year") ?
          [toDay.startOf("year"), clamped.endOf("year")]
        : [clamped, toDay];
      applyDraft(next);
      const anchor = next[0]?.year() ?? clamped.year();
      setBaseYear(Math.floor(anchor / 20) * 20);
    };

    const commitEndInput = () => {
      const parsed = parseYearInput(endInput, "end");
      if (!parsed) {
        setEndInput(toDay ? toDay.format("YYYY") : "");
        return;
      }
      const clamped = clampYear(parsed, "end");
      const next: [Dayjs | undefined, Dayjs | undefined] =
        fromDay && clamped.isBefore(fromDay, "year") ?
          [clamped.startOf("year"), fromDay.endOf("year")]
        : [fromDay, clamped];
      applyDraft(next);
    };

    const getYearState = (
      year: number,
    ): "start" | "end" | "middle" | "start-end" | "none" => {
      if (!fromDay) return "none";
      if (!toDay) {
        return fromDay.year() === year ? "start" : "none";
      }

      const fromYear = fromDay.year();
      const toYear = toDay.year();

      if (year === fromYear && year === toYear) return "start-end";
      if (year === fromYear) return "start";
      if (year === toYear) return "end";
      if (year > fromYear && year < toYear) return "middle";
      return "none";
    };

    const handleApply = () => {
      // 타이핑 중 blur 가 아직 안 된 경우를 위해 input 문자열을 다시 파싱해 반영.
      const parsedStart = startInput
        ? (parseYearInput(startInput, "start") ?? null)
        : null;
      const parsedEnd = endInput
        ? (parseYearInput(endInput, "end") ?? null)
        : null;

      if (startInput && !parsedStart) {
        setStartInput(fromDay ? fromDay.format("YYYY") : "");
        return;
      }
      if (endInput && !parsedEnd) {
        setEndInput(toDay ? toDay.format("YYYY") : "");
        return;
      }

      let finalStart = parsedStart ? clampYear(parsedStart, "start") : fromDay;
      let finalEnd = parsedEnd ? clampYear(parsedEnd, "end") : toDay;

      if (!finalStart || !finalEnd) return;
      if (finalStart.isAfter(finalEnd, "year")) {
        [finalStart, finalEnd] = [finalEnd, finalStart];
      }
      if (!finalStart.isValid() || !finalEnd.isValid()) return;

      const range = toDateRangeFromYears(
        finalStart.year(),
        finalEnd.year(),
        min,
        max,
      );
      onChange?.(range);
      setIsOpen(false);
    };

    const handleCancel = () => {
      setDraftRange(toDayjsRange(value));
      setStartInput(value?.start ? dayjs(value.start).format("YYYY") : "");
      setEndInput(value?.end ? dayjs(value.end).format("YYYY") : "");
      setIsOpen(false);
    };

    const handleOpenChange = (nextOpen: boolean) => {
      if (nextOpen) {
        setDraftRange(toDayjsRange(value));
        setStartInput(value?.start ? dayjs(value.start).format("YYYY") : "");
        setEndInput(value?.end ? dayjs(value.end).format("YYYY") : "");
        setBaseYear(
          value?.start ?
            Math.floor(dayjs(value.start).year() / 20) * 20
          : Math.floor(dayjs().year() / 20) * 20,
        );
      }
      setIsOpen(nextOpen);
    };

    const clampedRange = useMemo(() => {
      if (!fromDay || !toDay) return undefined;
      const fromYear = fromDay.startOf("year");
      const toYear = toDay.endOf("year");
      return clampToMinMaxYears(fromYear, toYear, min, max);
    }, [fromDay, toDay, min, max]);

    const numberOfYears = useMemo(() => {
      if (!clampedRange) return undefined;
      const { start, end } = clampedRange;
      return end.year() - start.year() + 1;
    }, [clampedRange]);

    const minYear = min ? dayjs(min).year() : undefined;
    const maxYear = max ? dayjs(max).year() : undefined;
    const isPrevDisabled = minYear != null && baseYear <= minYear;
    const isNextDisabled = maxYear != null && baseYear + 20 > maxYear;

    const handleStartEnter = () => {
      if (startInput) {
        const parsed = parseYearInput(startInput, "start");
        if (!parsed) {
          setInputError("유효한 일자를 입력하세요.");
          return;
        }
        const clamped = clampYear(parsed, "start");
        applyDraft([clamped, toDay]);
        setBaseYear(Math.floor(clamped.year() / 20) * 20);
        setInputError(null);
      }
      endInputRef.current?.focus();
    };

    const handleEndEnter = () => {
      if (endInput) {
        const parsed = parseYearInput(endInput, "end");
        if (!parsed) {
          setInputError("유효한 일자를 입력하세요.");
          return;
        }
        setInputError(null);
      }
      handleApply();
    };

    const renderYearSection = (years: number[]) => (
      <div key={years[0]} className="rdp-month">
        <table className="rdp-month_grid">
          <tbody>
            {[0, 1].map((rowIdx) => (
              <tr key={rowIdx} className="rdp-week">
                {[0, 1, 2, 3, 4].map((colIdx) => {
                  const year = years[rowIdx * 5 + colIdx];
                  const disabled = isYearDisabled(year, min, max);
                  const state = getYearState(year);
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
                    <td key={year} className={dayClasses} role="gridcell">
                      <button
                        type="button"
                        className={cn(
                          "rdp-day_button",
                          disabled && "rdp-day_button--disabled",
                        )}
                        disabled={disabled}
                        onClick={() => handleYearClick(year)}
                      >
                        {year}
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
        <PopoverPrimitive.Anchor asChild>
          <div ref={setContainerRef} className={className}>
            {inputError && (
              <div className="mb-1 text-xs text-red-500">{inputError}</div>
            )}
            <div className="flex items-center gap-0">
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
                  ref={startInputRef}
                  id={`${id}-start`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={isOpen ? 4 : 10}
                  value={startFieldValue}
                  onChange={handleStartInputChange}
                  onFocus={() => setIsOpen(true)}
                  onBlur={commitStartInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleStartEnter();
                    }
                  }}
                  placeholder={isOpen ? "YYYY" : "YYYY-MM-DD"}
                  aria-label={startLabel}
                  className={cn(
                    "h-10 w-full bg-white pr-3 pl-14-75 text-sm",
                    "focus:outline-none",
                    "rounded-l border border-r-0 border-gray-300",
                    "hover:border-gray-400 hover:bg-gray-50",
                    "transition-all duration-150",
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
                  ref={endInputRef}
                  id={`${id}-end`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={isOpen ? 4 : 10}
                  value={endFieldValue}
                  onChange={handleEndInputChange}
                  onFocus={() => setIsOpen(true)}
                  onBlur={commitEndInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleEndEnter();
                    }
                  }}
                  placeholder={isOpen ? "YYYY" : "YYYY-MM-DD"}
                  aria-label={endLabel}
                  className={cn(
                    "h-10 w-full bg-white pr-3 pl-14-75",
                    "text-sm",
                    "rounded-r border border-gray-300",
                    "hover:border-gray-400 hover:bg-gray-50",
                    "focus:outline-none",
                    "transition-all duration-150",
                  )}
                />
              </div>
            </div>
          </div>
        </PopoverPrimitive.Anchor>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={5}
            // Popover 열릴 때 input 에서 포커스가 빠지지 않도록 방지.
            onOpenAutoFocus={(e) => e.preventDefault()}
            // input 영역을 클릭하거나 포커스가 옮겨져도 popover 가 닫히지 않도록.
            // CustomEvent 의 target 은 Content 자신이므로, 실제 DOM 이벤트는
            // detail.originalEvent.target 을 통해 확인.
            onPointerDownOutside={(e) => {
              const t = e.detail.originalEvent.target as Node | null;
              if (t && containerRef.current?.contains(t)) e.preventDefault();
            }}
            onFocusOutside={(e) => {
              const t = e.detail.originalEvent.target as Node | null;
              if (t && containerRef.current?.contains(t)) e.preventDefault();
            }}
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
              className="date-range-picker-calendar year-range-picker-calendar"
            >
              <div className="rdp rdp-root">
                <div
                  className={cn(
                    "rdp-month_caption flex w-full items-center",
                    "justify-between px-0",
                  )}
                >
                  <button
                    type="button"
                    className="rdp-button_previous shrink-0"
                    disabled={isPrevDisabled}
                    onClick={() => setBaseYear((y) => y - 20)}
                    aria-label="이전 20년"
                  >
                    <ChevronLeftIcon size={16} className="text-cms-gray-600" />
                  </button>
                  <div
                    className={cn(
                      "rdp-caption_label flex-1 justify-center",
                      "text-center text-sm font-semibold",
                    )}
                  >
                    {baseYear} ~ {baseYear + 19}년
                  </div>
                  <button
                    type="button"
                    className="rdp-button_next shrink-0"
                    disabled={isNextDisabled}
                    onClick={() => setBaseYear((y) => y + 20)}
                    aria-label="다음 20년"
                  >
                    <ChevronRightIcon size={16} className="text-cms-gray-600" />
                  </button>
                </div>
                <div className="rdp-months">
                  {renderYearSection(leftYears)}
                  {renderYearSection(rightYears)}
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
                      ({numberOfYears}년)
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

YearRangePicker.displayName = "YearRangePicker";
