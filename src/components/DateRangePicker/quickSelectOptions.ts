import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export type QuickSelectMode = "past" | "future";

export type QuickSelectOption = {
  label: string;
  getValue: () => [Dayjs, Dayjs];
};

export const DEFAULT_MIN = "1970-01-01";
export const DEFAULT_MAX = "2099-12-31";

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
 * dayjs의 `startOf("week")`는 locale의 `weekStart`에 의존하므로,
 * 의도한 주 시작일을 보장하기 위해 양쪽 브랜치 모두 명시적 산술을 사용합니다.
 */
const getWeekStart = (date: Dayjs, mondayStart: boolean): Dayjs => {
  const day = date.day(); // 0=일, 1=월, ..., 6=토
  if (mondayStart) {
    const diff = day === 0 ? -6 : 1 - day;
    return date.add(diff, "day").startOf("day");
  }
  return date.subtract(day, "day").startOf("day");
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
  const minDate = min ? dayjs(min) : dayjs(DEFAULT_MIN);
  const maxDate = max ? dayjs(max) : dayjs(DEFAULT_MAX);

  return [
    {
      label: "전체",
      getValue: () => [minDate, maxDate],
    },
    {
      label: "오늘",
      getValue: () => {
        const now = dayjs();
        return [now, now];
      },
    },
    {
      label: "어제",
      getValue: () => {
        const yesterday = dayjs().subtract(1, "day");
        return [yesterday, yesterday];
      },
    },
    {
      label: "이번주",
      getValue: () => {
        const now = dayjs();
        return [getWeekStart(now, mondayStart), getWeekEnd(now, mondayStart)];
      },
    },
    {
      label: "이번달",
      getValue: () => {
        const now = dayjs();
        return [now.startOf("month"), now.endOf("month")];
      },
    },
    {
      label: "7일",
      getValue: () => {
        const now = dayjs();
        return [now.subtract(6, "day"), now];
      },
    },
    {
      label: "30일",
      getValue: () => {
        const now = dayjs();
        return [now.subtract(29, "day"), now];
      },
    },
    {
      label: "지난주",
      getValue: () => {
        const lastWeek = dayjs().subtract(1, "week");
        return [
          getWeekStart(lastWeek, mondayStart),
          getWeekEnd(lastWeek, mondayStart),
        ];
      },
    },
    {
      label: "지난달",
      getValue: () => {
        const lastMonth = dayjs().subtract(1, "month");
        return [lastMonth.startOf("month"), lastMonth.endOf("month")];
      },
    },
  ];
};

const getFutureQuickSelectOptions = (
  mondayStart: boolean,
  min?: string,
  max?: string,
): QuickSelectOption[] => {
  const minDate = min ? dayjs(min) : dayjs(DEFAULT_MIN);
  const maxDate = max ? dayjs(max) : dayjs(DEFAULT_MAX);

  return [
    {
      label: "전체",
      getValue: () => [minDate, maxDate],
    },
    {
      label: "오늘",
      getValue: () => {
        const now = dayjs();
        return [now, now];
      },
    },
    {
      label: "내일",
      getValue: () => {
        const tomorrow = dayjs().add(1, "day");
        return [tomorrow, tomorrow];
      },
    },
    {
      label: "이번주",
      getValue: () => {
        const now = dayjs();
        return [getWeekStart(now, mondayStart), getWeekEnd(now, mondayStart)];
      },
    },
    {
      label: "이번달",
      getValue: () => {
        const now = dayjs();
        return [now.startOf("month"), now.endOf("month")];
      },
    },
    {
      label: "7일",
      getValue: () => {
        const now = dayjs();
        return [now, now.add(6, "day")];
      },
    },
    {
      label: "30일",
      getValue: () => {
        const now = dayjs();
        return [now, now.add(29, "day")];
      },
    },
    {
      label: "다음주",
      getValue: () => {
        const nextWeek = dayjs().add(1, "week");
        return [
          getWeekStart(nextWeek, mondayStart),
          getWeekEnd(nextWeek, mondayStart),
        ];
      },
    },
    {
      label: "다음달",
      getValue: () => {
        const nextMonth = dayjs().add(1, "month");
        return [nextMonth.startOf("month"), nextMonth.endOf("month")];
      },
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
