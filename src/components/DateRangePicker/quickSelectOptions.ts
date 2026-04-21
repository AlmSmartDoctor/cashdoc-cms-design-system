import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export type QuickSelectMode = "past" | "future";

export type QuickSelectOption = {
  label: string;
  getValue: () => [Dayjs, Dayjs];
};

const DEFAULT_MIN = "1970-01-01";
const DEFAULT_MAX = "2099-12-31";

/**
 * 빠른 선택 옵션의 시작/종료 날짜가 min~max 범위 내에 있는지 검사합니다.
 * 범위를 벗어나면 false를 반환하여 오류 메시지 표시에 사용할 수 있습니다.
 */
export const isRangeWithinBounds = (
  start: Dayjs,
  end: Dayjs,
  min?: string,
  max?: string,
): boolean => {
  const minDate = min ? dayjs(min) : dayjs(DEFAULT_MIN);
  const maxDate = max ? dayjs(max) : dayjs(DEFAULT_MAX);
  const startInRange =
    !start.isBefore(minDate, "day") && !start.isAfter(maxDate, "day");
  const endInRange =
    !end.isBefore(minDate, "day") && !end.isAfter(maxDate, "day");
  return startInRange && endInRange;
};

/**
 * mondayStart 옵션에 따라 주(週)의 시작일(월요일 또는 일요일)을 반환합니다.
 */
const getWeekStart = (date: Dayjs, mondayStart: boolean): Dayjs => {
  if (mondayStart) {
    const day = date.day(); // 0=일, 1=월, ..., 6=토
    const diff = day === 0 ? -6 : 1 - day;
    return date.add(diff, "day").startOf("day");
  }
  return date.startOf("week");
};

/**
 * mondayStart 옵션에 따라 주(週)의 종료일(일요일 또는 토요일)을 반환합니다.
 */
const getWeekEnd = (date: Dayjs, mondayStart: boolean): Dayjs => {
  return getWeekStart(date, mondayStart).add(6, "day").endOf("day");
};

const getPastQuickSelectOptions = (
  mondayStart: boolean,
  min?: string,
  max?: string,
): QuickSelectOption[] => {
  const now = dayjs();
  const minDate = min ? dayjs(min) : dayjs(DEFAULT_MIN);
  const maxDate = max ? dayjs(max) : dayjs(DEFAULT_MAX);

  return [
    {
      label: "전체",
      getValue: () => [minDate, maxDate],
    },
    {
      label: "오늘",
      getValue: () => [now, now],
    },
    {
      label: "어제",
      getValue: () => [now.subtract(1, "day"), now.subtract(1, "day")],
    },
    {
      label: "이번주",
      getValue: () => [
        getWeekStart(now, mondayStart),
        getWeekEnd(now, mondayStart),
      ],
    },
    {
      label: "이번달",
      getValue: () => [now.startOf("month"), now.endOf("month")],
    },
    {
      label: "7일",
      getValue: () => [now.subtract(6, "day"), now],
    },
    {
      label: "30일",
      getValue: () => [now.subtract(29, "day"), now],
    },
    {
      label: "지난주",
      getValue: () => {
        const lastWeek = now.subtract(1, "week");
        return [
          getWeekStart(lastWeek, mondayStart),
          getWeekEnd(lastWeek, mondayStart),
        ];
      },
    },
    {
      label: "지난달",
      getValue: () => [
        now.subtract(1, "month").startOf("month"),
        now.subtract(1, "month").endOf("month"),
      ],
    },
  ];
};

const getFutureQuickSelectOptions = (
  mondayStart: boolean,
  min?: string,
  max?: string,
): QuickSelectOption[] => {
  const now = dayjs();
  const minDate = min ? dayjs(min) : dayjs(DEFAULT_MIN);
  const maxDate = max ? dayjs(max) : dayjs(DEFAULT_MAX);

  return [
    {
      label: "전체",
      getValue: () => [minDate, maxDate],
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
      getValue: () => [
        getWeekStart(now, mondayStart),
        getWeekEnd(now, mondayStart),
      ],
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
      getValue: () => {
        const nextWeek = now.add(1, "week");
        return [
          getWeekStart(nextWeek, mondayStart),
          getWeekEnd(nextWeek, mondayStart),
        ];
      },
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

export const getQuickSelectOptions = (
  mode: QuickSelectMode,
  mondayStart: boolean,
  min?: string,
  max?: string,
): QuickSelectOption[] => {
  return mode === "past" ?
      getPastQuickSelectOptions(mondayStart, min, max)
    : getFutureQuickSelectOptions(mondayStart, min, max);
};
