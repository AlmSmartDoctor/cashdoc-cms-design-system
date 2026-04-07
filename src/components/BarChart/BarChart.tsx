import { cn } from "@/utils/cn";
import type { HTMLAttributes } from "react";
import { forwardRef, useMemo } from "react";

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
} & HTMLAttributes<HTMLDivElement>;

/**
 * 특정 데이터를 기간별로 비교·확인하기 위한 세로형 막대 차트 컴포넌트입니다.
 *
 * x축(가로)에는 날짜/기간 레이블이, y축(세로)에는 수치 값이 표시됩니다.
 * 입력된 데이터의 최대값이 차트 높이의 80%에 위치하도록 y축 눈금 간격이 자동 조정됩니다.
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
 * - **차트 높이**: 플롯 영역의 기본 높이는 400px이며, `className="[--chart-height:400px]"`으로 재정의할 수 있습니다.
 * - **막대 높이**: 가장 큰 value가 플롯 영역 높이의 80%가 되도록 비례 계산됩니다.
 * - **y축 눈금**: `unit` 간격으로 눈금선이 생성되며, 데이터 범위에 따라 선 수가 조정됩니다.
 * - **y축 레이블**: 좌측에 수직 고정, 눈금선과 수평으로 정렬됩니다.
 * - **x축 레이블**: 각 막대 하단에 줄바꿈(wrap) 가능하게 표시됩니다.
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
 * - 높이를 변경하려면 `className="[--chart-height:300px]"`처럼 CSS 변수로 지정하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - `value`에 음수를 넣지 마세요. 음수는 지원하지 않습니다.
 * - `chartData`가 빈 배열이면 빈 영역이 렌더링됩니다. 빈 상태 UI는 별도로 처리하세요.
 * - 막대 수가 매우 많을 때(20개 이상)는 가로 스크롤 컨테이너를 감싸서 사용하세요.
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
 *   className="[--chart-height:300px]"
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
  ({ chartData, title, unit = 50, unitLabel, className, ...props }, ref) => {
    const { yLines, getBarHeightPercent } = useMemo(() => {
      if (!chartData.length) {
        return { yLines: [], getBarHeightPercent: () => 0 };
      }

      const maxValue = Math.max(...chartData.map((d) => d.value), 0);

      if (maxValue === 0) {
        return {
          yLines: [{ label: "0", bottomPercent: 0 }],
          getBarHeightPercent: () => 0,
        };
      }

      // 가장 큰 value가 차트 높이의 80%가 되도록 비례 계산
      const toPercent = (value: number) => (value / maxValue) * 80;

      const numLines = Math.ceil(maxValue / unit);
      const lines = [
        { label: "0", bottomPercent: 0 },
        ...Array.from({ length: numLines }, (_, i) => ({
          label: ((i + 1) * unit).toLocaleString(),
          bottomPercent: toPercent((i + 1) * unit),
        })),
      ];

      return { yLines: lines, getBarHeightPercent: toPercent };
    }, [chartData, unit]);

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
        {(title ?? unitLabel) && (
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

        {/* grid: Y축 레이블 열과 플롯 열이 같은 행 높이를 공유 */}
        <div
          className="grid gap-x-2"
          style={{ gridTemplateColumns: "3.5rem 1fr" }}
        >
          {/* Y축 레이블 영역 */}
          <div className="relative">
            {yLines.map((line, i) => (
              <span
                key={i}
                className={cn(
                  "absolute right-0 text-right",
                  "text-xs leading-none text-cms-gray-600",
                )}
                // 0 눈금은 베이스라인 위에 바짝 붙여 표시,
                // 나머지는 눈금선 중앙(translateY 50%)에 정렬
                style={
                  line.bottomPercent === 0 ?
                    { bottom: "0.125rem" }
                  : {
                      bottom: `${line.bottomPercent}%`,
                      transform: "translateY(50%)",
                    }
                }
              >
                {line.label}
              </span>
            ))}
          </div>

          {/* 플롯 영역 (눈금선 + 막대) */}
          <div
            className="relative"
            style={{ height: "var(--chart-height, 400px)" }}
          >
            {/* Y축 눈금선 — z-0 (막대 뒤에 위치) */}
            {yLines.map((line, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-x-0 z-0",
                  "border-t border-cms-gray-250",
                )}
                style={{ bottom: `${line.bottomPercent}%` }}
              />
            ))}

            {/* 막대 — z-10 (눈금선 앞에 위치) */}
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 z-10 h-full",
                // items-stretch: 각 열이 플롯 높이(h-full)를 채워야 막대 % 높이가 chart 기준으로 맞음
                "flex items-stretch gap-1 px-2",
              )}
            >
              {chartData.map((item, i) => {
                const barHeightPercent = getBarHeightPercent(item.value);
                const isZero = item.value === 0;
                // 막대 높이가 플롯 영역의 5% 이상일 때만 내부에 값 표시
                const showInside = !isZero && barHeightPercent >= 5;
                const showOutside = isZero || !showInside;

                return (
                  <div
                    key={i}
                    className={cn(
                      "relative flex min-h-0 min-w-0 flex-1",
                      "h-full flex-col items-center justify-end px-1",
                    )}
                  >
                    {/* 외부 값 레이블 (value=0 또는 막대가 짧을 때) */}
                    {showOutside && (
                      <span
                        className={cn(
                          "mb-0.5 text-center select-none",
                          "text-xs leading-none font-semibold",
                          "text-cms-black",
                        )}
                      >
                        {item.value.toLocaleString()}
                      </span>
                    )}
                    {/* 막대 본체 (value=0이면 렌더링하지 않음) */}
                    {!isZero && (
                      <div
                        className={cn(
                          "flex w-full flex-col",
                          "items-center justify-start",
                          "rounded-t-cms-sm bg-cms-blue-600",
                        )}
                        style={{ height: `${barHeightPercent}%` }}
                      >
                        {/* 내부 값 레이블 (막대가 충분히 클 때) */}
                        {showInside && (
                          <span
                            className={cn(
                              "overflow-hidden px-0.5 pt-2 select-none",
                              "text-center text-xs leading-none",
                              "font-semibold text-cms-white",
                            )}
                          >
                            {item.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 빈 셀 (Y축 레이블 열 하단 여백 정렬용) */}
          <div />

          {/* X축 레이블 */}
          <div className="flex gap-1 px-2 pt-1.5">
            {chartData.map((item, i) => (
              <div key={i} className="min-w-0 flex-1 text-center">
                <span
                  className={cn(
                    "text-xs/tight font-bold",
                    "wrap-break-word whitespace-pre-line text-cms-gray-600",
                  )}
                >
                  {item.xLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

BarChart.displayName = "BarChart";

export { BarChart };
