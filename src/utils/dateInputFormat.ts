import dayjs, { type Dayjs } from "dayjs";

export type RangeMode = "start" | "end";

const stripDigits = (raw: string, maxDigits: number): string =>
  raw.replace(/\D/g, "").slice(0, maxDigits);

/**
 * 숫자만 추출해 YYYY-MM-DD 형식으로 대시를 자동 삽입합니다. 최대 8자리까지 허용.
 */
export const formatDateDigits = (raw: string): string => {
  const digits = stripDigits(raw, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
};

/**
 * 숫자만 추출해 YYYY-MM 형식으로 대시를 자동 삽입합니다. 최대 6자리까지 허용.
 */
export const formatMonthDigits = (raw: string): string => {
  const digits = stripDigits(raw, 6);
  if (digits.length <= 4) return digits;
  return `${digits.slice(0, 4)}-${digits.slice(4)}`;
};

/**
 * 숫자만 추출해 YYYY 형식으로 반환합니다. 최대 4자리.
 */
export const formatYearDigits = (raw: string): string => stripDigits(raw, 4);

// customParseFormat 플러그인 없이도 엄격 파싱을 위해 round-trip 검증을 사용합니다.
// 네 자리 연도(1000~9999) 밖은 거부하여 "0100" 같은 예상치 못한 입력이 통과하지 않도록 합니다.
const strictParse = (input: string, format: string): Dayjs | null => {
  const parsed = dayjs(input);
  if (!parsed.isValid()) return null;
  if (parsed.format(format) !== input) return null;
  const year = parsed.year();
  if (year < 1000 || year > 9999) return null;
  return parsed;
};

/**
 * "YYYY-MM-DD" 또는 부분 입력을 파싱합니다.
 * 4자리 → 연도의 start/end, 5~6자리 → 월의 start/end, 7~8자리 → 해당 일의 start/end.
 * 유효하지 않은 날짜(예: 2025-02-31)는 null을 반환합니다.
 */
export const parseDateInput = (
  formatted: string,
  mode: RangeMode,
): Dayjs | null => {
  const digits = formatted.replace(/\D/g, "");
  if (digits.length < 4) return null;

  if (digits.length === 4) {
    const base = strictParse(digits, "YYYY");
    if (!base) return null;
    return mode === "start" ? base.startOf("year") : base.endOf("year");
  }

  if (digits.length <= 6) {
    const padded = digits.padEnd(6, "0");
    const input = `${padded.slice(0, 4)}-${padded.slice(4, 6)}`;
    if (digits.length === 6) {
      const base = strictParse(input, "YYYY-MM");
      if (!base) return null;
      return mode === "start" ? base.startOf("month") : base.endOf("month");
    }
    // 5자리: 월이 한 자리. 0을 채워 "YYYY-MM"으로 엄격 파싱합니다.
    const month = Number(digits.slice(4));
    if (month < 1 || month > 9) return null;
    const base = strictParse(`${digits.slice(0, 4)}-0${month}`, "YYYY-MM");
    if (!base) return null;
    return mode === "start" ? base.startOf("month") : base.endOf("month");
  }

  const padded = digits.padEnd(8, "0");
  const input = `${padded.slice(0, 4)}-${padded.slice(4, 6)}-${padded.slice(6, 8)}`;
  if (digits.length === 8) {
    const base = strictParse(input, "YYYY-MM-DD");
    if (!base) return null;
    return mode === "start" ? base.startOf("day") : base.endOf("day");
  }
  // 7자리: 일이 한 자리.
  const day = Number(digits.slice(6));
  if (day < 1 || day > 9) return null;
  const fullInput = `${digits.slice(0, 4)}-${digits.slice(4, 6)}-0${day}`;
  const base = strictParse(fullInput, "YYYY-MM-DD");
  if (!base) return null;
  return mode === "start" ? base.startOf("day") : base.endOf("day");
};

/**
 * "YYYY-MM" 또는 부분 입력을 파싱합니다.
 * 4자리 → 연도의 start/end, 5~6자리 → 월의 start/end.
 */
export const parseMonthInput = (
  formatted: string,
  mode: RangeMode,
): Dayjs | null => {
  const digits = formatted.replace(/\D/g, "");
  if (digits.length < 4) return null;

  if (digits.length === 4) {
    const base = strictParse(digits, "YYYY");
    if (!base) return null;
    return mode === "start" ? base.startOf("year") : base.endOf("year");
  }

  if (digits.length === 6) {
    const input = `${digits.slice(0, 4)}-${digits.slice(4, 6)}`;
    const base = strictParse(input, "YYYY-MM");
    if (!base) return null;
    return mode === "start" ? base.startOf("month") : base.endOf("month");
  }

  // 5자리: 월이 한 자리. 0을 채워 "YYYY-MM"으로 엄격 파싱합니다.
  const month = Number(digits.slice(4));
  if (month < 1 || month > 9) return null;
  const base = strictParse(`${digits.slice(0, 4)}-0${month}`, "YYYY-MM");
  if (!base) return null;
  return mode === "start" ? base.startOf("month") : base.endOf("month");
};

/**
 * "YYYY"를 파싱합니다. 정확히 4자리가 아니면 null.
 */
export const parseYearInput = (
  formatted: string,
  mode: RangeMode,
): Dayjs | null => {
  const digits = formatted.replace(/\D/g, "");
  if (digits.length !== 4) return null;
  const base = strictParse(digits, "YYYY");
  if (!base) return null;
  return mode === "start" ? base.startOf("year") : base.endOf("year");
};
