import { cn } from "@/utils/cn";
import type { HTMLAttributes } from "react";
import { forwardRef, useMemo } from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { BarShapeProps, LabelProps } from "recharts";

// CMS 디자인 토큰 색상값 (globals.css에서 참조)
const CMS_COLORS = {
  blue600: "#358fff",
  gray250: "#e4e7eb",
  gray600: "#89939e",
  gray900: "#111111",
  white: "#ffffff",
  black: "#000000",
} as const;

/** 막대 최소 너비(px) = w-8 */
const MIN_BAR_WIDTH = 32;
/** barCategoryGap="20%" 기준 막대가 슬롯에서 차지하는 비율 */
const BAR_FILL_RATIO = 0.8;
/** Y축 너비(px) */
const Y_AXIS_WIDTH = 56;
/** 차트 우측 여백(px) */
const CHART_MARGIN_RIGHT = 8;

export type BarChartDataItem = {
  /** x축에 표시될 레이블 (날짜 또는 기간 값) */
  xLabel: string;
  /** 막대 높이를 결정하는 수치 값 */
  value: number;
};

export type BarChartProps = {
  /**
   * 차트에 표시할 데이터 목록.
   * `xLabel`은 x축(날짜/기간) 레이블, `value`는 막대의 수치 값입니다.
   */
  chartData: BarChartDataItem[];
  /**
   * 차트 좌측 상단에 표시될 타이틀입니다.
   */
  title?: string;
  /**
   * y축 눈금선 단위 간격.
   * @default 50
   */
  unit?: number;
  /**
   * y축 단위 레이블. 예: "개", "원", "건"
   * 차트 우측 상단에 "(단위: xx)" 형태로 표시됩니다.
   */
  unitLabel?: string;
  /**
   * 플롯 영역 높이(px).
   * @default 400
   */
  chartHeight?: number;
} & HTMLAttributes<HTMLDivElement>;

/** 막대 높이가 차트 전체 높이의 이 비율 이상일 때 값 레이블을 막대 내부에 표시 */
const INSIDE_LABEL_THRESHOLD = 0.05;

/** value=0인 막대를 투명하게 렌더링하기 위한 최소 높이(px) — LabelList 위치 기준점 확보용 */
const ZERO_BAR_MIN_SIZE = 1;

type CustomLabelProps = LabelProps & {
  chartHeight?: number;
};

function CustomBarLabel({
  x,
  y,
  width,
  height,
  value,
  chartHeight = 400,
}: CustomLabelProps) {
  if (typeof value !== "number") return null;

  const numericHeight = typeof height === "number" ? height : 0;
  const isZero = value === 0;
  const isShortBar = numericHeight / chartHeight < INSIDE_LABEL_THRESHOLD;
  const showOutside = isZero || isShortBar;

  const cx = (x as number) + (width as number) / 2;

  if (showOutside) {
    return (
      <text
        x={cx}
        y={(y as number) - 4}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill={CMS_COLORS.black}
        style={{ userSelect: "none" }}
      >
        {value.toLocaleString()}
      </text>
    );
  }

  return (
    <text
      x={cx}
      y={(y as number) + 16}
      textAnchor="middle"
      fontSize={12}
      fontWeight={600}
      fill={CMS_COLORS.white}
      style={{ userSelect: "none" }}
    >
      {value.toLocaleString()}
    </text>
  );
}

/**
 * 특정 데이터를 기간별로 비교·확인하기 위한 세로형 막대 차트 컴포넌트입니다.
 *
 * x축(가로)에는 날짜/기간 레이블이, y축(세로)에는 수치 값이 표시됩니다.
 * y축 눈금은 `unit` 간격으로 최대값을 올림하여 자동 계산됩니다.
 *
 * 각 막대는 최소 32px(w-8) 너비를 보장합니다. 데이터 수가 많아 막대가
 * 최소 너비보다 좁아지면 차트 영역이 자동으로 가로 스크롤됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - 시간 축을 기준으로 수치 데이터의 변화 추이를 비교할 때
 * - 일별·주별·월별 집계 데이터를 시각화할 때
 * - 기간 내 최대·최소값을 한눈에 파악해야 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - 카테고리 간 비율을 보여줄 때 (파이 차트 권장)
 * - 두 수치의 관계(상관관계)를 표현할 때 (산점도 권장)
 * - 데이터 항목이 1개뿐인 경우 (단순 수치 표기 권장)
 *
 *
 * ## Layout behavior
 *
 * - **막대 너비**: 컨테이너 너비에 맞게 균등 분배하되, 최소 32px(w-8)를 보장합니다.
 * - **가로 스크롤**: 막대가 최소 너비보다 좁아지면 차트 영역이 가로 스크롤됩니다.
 * - **차트 높이**: `chartHeight` prop으로 지정하며 기본값은 400px입니다.
 * - **막대 색상**: value=0이면 투명(막대 미표시), 그 외엔 CMS blue(#358fff)입니다.
 * - **값 레이블**: 막대 높이가 차트 높이의 5% 미만이면 막대 외부(상단)에 표시합니다.
 * - **x축 레이블**: -45° 기울임으로 긴 레이블도 잘리지 않게 표시합니다.
 * - **너비**: 부모 컨테이너 전체 너비를 채웁니다 (`w-full`).
 *
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - `unit`은 데이터 범위에 맞게 설정하세요. 최대값이 수천 단위라면 `unit={500}`처럼 조정하세요.
 * - `unitLabel`로 단위를 명시해 사용자가 수치의 의미를 바로 알 수 있게 하세요.
 * - x축 레이블은 짧고 일관된 형식(예: "01/01", "1월")을 사용하세요.
 * - 높이를 변경하려면 `chartHeight={300}`처럼 숫자로 지정하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - `value`에 음수를 넣지 마세요. 음수는 지원하지 않습니다.
 * - `chartData`가 빈 배열이면 빈 영역이 렌더링됩니다. 빈 상태 UI는 별도로 처리하세요.
 *
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본 사용 예시 (일별 데이터):
 *
 * ```tsx
 * <BarChart
 *   chartData={[
 *     { xLabel: "01/01", value: 120 },
 *     { xLabel: "01/02", value: 85 },
 *     { xLabel: "01/03", value: 200 },
 *     { xLabel: "01/04", value: 145 },
 *     { xLabel: "01/05", value: 310 },
 *   ]}
 *   unit={50}
 *   unitLabel="건"
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 차트 높이 커스텀:
 *
 * ```tsx
 * <BarChart
 *   chartData={monthlyRevenue}
 *   unit={500}
 *   unitLabel="만원"
 *   chartHeight={300}
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link FilterToggleGroup}, 기간별 필터 선택과 함께 사용할 때
 * - {@link Table}, 수치 데이터를 표 형태로 상세히 보여줄 때
 */
const BarChart = forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      chartData,
      title,
      unit = 50,
      unitLabel,
      chartHeight = 400,
      className,
      ...props
    },
    ref,
  ) => {
    const { yAxisMax, ticks } = useMemo(() => {
      if (!chartData.length) {
        return { yAxisMax: unit, ticks: [0, unit] };
      }

      let maxValue = 0;
      for (const d of chartData) {
        if (d.value > maxValue) maxValue = d.value;
      }

      if (maxValue === 0) {
        return { yAxisMax: unit, ticks: [0, unit] };
      }

      const numLines = Math.ceil(maxValue / unit);
      const yAxisMax = numLines * unit;
      const ticks = Array.from({ length: numLines + 1 }, (_, i) => i * unit);

      return { yAxisMax, ticks };
    }, [chartData, unit]);

    // 막대 최소 너비(32px) 기준으로 차트 전체 최소 너비 계산
    // 슬롯 너비 = 막대 너비 / BAR_FILL_RATIO (barCategoryGap 20% 보정)
    const minChartWidth =
      Math.ceil((chartData.length * MIN_BAR_WIDTH) / BAR_FILL_RATIO) +
      Y_AXIS_WIDTH +
      CHART_MARGIN_RIGHT;

    return (
      <div
        ref={ref}
        className={cn(
          "cms-cashdoc-ds w-full rounded-cms-lg bg-cms-white p-4",
          className,
        )}
        {...props}
      >
        {/* 타이틀 + 단위 레이블 */}
        {(title || unitLabel) && (
          <div className="mb-3 flex items-center justify-between gap-2">
            {title && (
              <p className="text-lg font-bold text-cms-gray-900">{title}</p>
            )}
            {unitLabel && (
              <p className="ml-auto text-xs text-cms-gray-600">
                (단위: {unitLabel})
              </p>
            )}
          </div>
        )}

        {/*
         * overflow-x: auto — 컨테이너보다 차트 최소 너비가 클 때 가로 스크롤
         * 내부 div의 min-width가 CSS 레이아웃 기준이 되고,
         * ResponsiveContainer가 그 너비를 채워 Recharts에 전달합니다.
         */}
        <div className="overflow-x-auto">
          <div style={{ minWidth: minChartWidth }}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <RechartsBarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: CHART_MARGIN_RIGHT,
                  left: 0,
                  bottom: 0,
                }}
                barCategoryGap="20%"
              >
                {/* 가로 눈금선만 표시 (세로 없음) */}
                <CartesianGrid
                  vertical={false}
                  stroke={CMS_COLORS.gray250}
                  strokeWidth={1}
                />

                {/* X축 — 레이블이 길어도 잘리지 않도록 -45° 기울임 */}
                <XAxis
                  dataKey="xLabel"
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{
                    fontSize: 12,
                    fontWeight: 700,
                    fill: CMS_COLORS.gray600,
                  }}
                />

                {/* Y축 — 3.5rem(56px) 너비, unit 간격 눈금 */}
                <YAxis
                  domain={[0, yAxisMax]}
                  ticks={ticks}
                  axisLine={false}
                  tickLine={false}
                  width={Y_AXIS_WIDTH}
                  tick={{ fontSize: 12, fill: CMS_COLORS.gray600 }}
                  tickFormatter={(v: number) => v.toLocaleString()}
                />

                <Bar
                  dataKey="value"
                  minPointSize={ZERO_BAR_MIN_SIZE}
                  shape={(shapeProps: BarShapeProps) => (
                    <Rectangle
                      {...shapeProps}
                      radius={[4, 4, 0, 0]}
                      fill={
                        shapeProps.value === 0
                          ? "transparent"
                          : CMS_COLORS.blue600
                      }
                    />
                  )}
                >

                  {/* 값 레이블 — 막대 높이에 따라 내부/외부 자동 전환 */}
                  <LabelList
                    dataKey="value"
                    content={(labelProps) => (
                      <CustomBarLabel
                        {...labelProps}
                        chartHeight={chartHeight}
                      />
                    )}
                  />
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  },
);

BarChart.displayName = "BarChart";

export { BarChart };
