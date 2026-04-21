import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export type DateRange = {
  start: string;
  end: string;
};

export const ISO_DATE_FORMAT = "YYYY-MM-DD";

/**
 * `DateRange` 쌍을 `Dayjs` 쌍으로 변환합니다.
 * 값이 없거나 시작/끝이 빈 문자열이면 해당 위치는 `undefined`입니다.
 */
export const toDayjsRange = (
  range?: DateRange,
): [Dayjs | undefined, Dayjs | undefined] => {
  return [
    range?.start ? dayjs(range.start) : undefined,
    range?.end ? dayjs(range.end) : undefined,
  ];
};

/**
 * `Dayjs` 쌍을 `YYYY-MM-DD` 문자열 `DateRange`로 직렬화합니다.
 */
export const formatDateRange = (start: Dayjs, end: Dayjs): DateRange => ({
  start: start.format(ISO_DATE_FORMAT),
  end: end.format(ISO_DATE_FORMAT),
});

/**
 * 기존 `DateRange`를 `YYYY-MM-DD` 포맷으로 정규화합니다.
 */
export const normalizeDateRange = (range: DateRange): DateRange => ({
  start: dayjs(range.start).format(ISO_DATE_FORMAT),
  end: dayjs(range.end).format(ISO_DATE_FORMAT),
});
