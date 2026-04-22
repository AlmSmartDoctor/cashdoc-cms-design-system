import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showPrevNext?: boolean;
  disabled?: boolean;
  className?: string;
};

const paginationButtonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "h-10 min-w-10 px-2",
    "rounded-md",
    "text-sm font-medium",
    "transition-colors",
    "cursor-pointer",
    "focus-visible:ring-2 focus-visible:outline-none",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border border-cms-gray-400 bg-transparent",
          "text-cms-gray-700",
          "hover:bg-cms-gray-200",
        ),
        active: cn(
          "border border-cms-primary-400 bg-cms-primary-400",
          "text-cms-black",
          "hover:bg-cms-primary-300",
        ),
        ellipsis: cn(
          "border-0 bg-transparent",
          "text-cms-gray-700",
          "pointer-events-none cursor-default",
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type PageItem = number | "...";

const usePagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
}: {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
}): PageItem[] => {
  return useMemo(() => {
    const range = (start: number, end: number): number[] => {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    // 총 표시할 페이지 번호 개수 계산
    const totalPageNumbers = siblingCount * 2 + 5;

    // 모든 페이지를 표시할 수 있으면 ellipsis 없이 표시
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

    // Case 1: 오른쪽만 ellipsis
    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftRange = range(1, 3 + 2 * siblingCount);
      return [...leftRange, "...", totalPages];
    }

    // Case 2: 왼쪽만 ellipsis
    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightRange = range(totalPages - (2 + 2 * siblingCount), totalPages);
      return [1, "...", ...rightRange];
    }

    // Case 3: 양쪽 모두 ellipsis
    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return [];
  }, [currentPage, totalPages, siblingCount]);
};

/**
 * 사용자가 여러 페이지로 나뉜 콘텐츠를 탐색할 수 있게 하는 페이지네이션 컴포넌트입니다.
 *
 * {@link Pagination}은 이전/다음 버튼과 페이지 번호를 제공하며,
 * 많은 페이지가 있을 때 중간 페이지를 생략(ellipsis)하여 UI를 깔끔하게 유지합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **긴 목록**: 많은 항목을 여러 페이지로 나누어 표시할 때
 * - **검색 결과**: 검색 결과가 여러 페이지에 걸쳐 있을 때
 * - **데이터 테이블**: 대량의 데이터를 페이지 단위로 보여줄 때
 * - **명확한 페이지 구분**: 사용자가 특정 페이지로 직접 이동할 필요가 있을 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **무한 스크롤**: 지속적으로 콘텐츠가 로드되는 피드 형태가 더 적절한 경우
 * - **적은 항목**: 한 페이지에 모두 표시할 수 있는 소량의 데이터
 * - **단계별 프로세스**: 순차적인 단계를 나타낼 때는 Stepper 컴포넌트 사용
 *
 * ## Layout behavior
 *
 * - **Responsive**: 모바일에서는 siblingCount를 줄여 더 적은 페이지 번호를 표시하는 것을 권장
 * - **Centered**: 일반적으로 페이지 하단 중앙에 배치
 * - **Ellipsis**: 많은 페이지가 있을 때 자동으로 중간 페이지를 생략 (...으로 표시)
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **적절한 페이지당 항목 수**: 10-50개 사이가 적절 (콘텐츠 유형에 따라 조정)
 * - **현재 페이지 명확히 표시**: 활성 페이지는 시각적으로 구분되어야 함
 * - **충분한 클릭 영역**: 모바일에서도 쉽게 탭할 수 있도록 버튼 크기 유지
 * - **첫/마지막 페이지 비활성화**: 이동할 수 없는 경우 버튼을 비활성화하여 명확히 표시
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **너무 많은 페이지 번호**: siblingCount를 너무 크게 설정하지 마세요
 * - **불명확한 상태**: 로딩 중이거나 에러 상태일 때도 적절한 피드백 제공 필요
 *
 * ## Accessibility
 *
 * - **ARIA Labels**: 각 버튼에 명확한 레이블 제공 (aria-label, aria-current)
 * - **Keyboard Navigation**: Tab 키로 버튼 간 이동, Enter/Space로 페이지 변경
 * - **Screen Reader**: 현재 페이지와 전체 페이지 수를 읽어주도록 설정
 * - **Disabled State**: 비활성화된 버튼은 포커스할 수 없도록 처리
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 페이지네이션 사용:
 *
 * ```tsx
 * const [currentPage, setCurrentPage] = useState(1);
 * const totalPages = 10;
 *
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={setCurrentPage}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 많은 페이지와 커스텀 siblingCount:
 *
 * ```tsx
 * <Pagination
 *   currentPage={25}
 *   totalPages={100}
 *   siblingCount={2}
 *   onPageChange={handlePageChange}
 * />
 * // 결과: 1 ... 23 24 25 26 27 ... 100
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 비활성화 상태:
 *
 * ```tsx
 * <Pagination
 *   currentPage={5}
 *   totalPages={10}
 *   onPageChange={handlePageChange}
 *   disabled={isLoading}
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Button}, 단일 버튼 컴포넌트
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Data Display/Pagination/For%20Jsdoc.png?raw=true)
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showPrevNext = true,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const pages = usePagination({ currentPage, totalPages, siblingCount });

    const handlePrevious = () => {
      if (currentPage > 1 && !disabled) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages && !disabled) {
        onPageChange(currentPage + 1);
      }
    };

    const handlePageClick = (page: number) => {
      if (!disabled && page !== currentPage) {
        onPageChange(page);
      }
    };

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="페이지네이션"
        className={cn("flex items-center gap-1", className)}
      >
        {/* Previous Button */}
        {showPrevNext && (
          <button
            onClick={handlePrevious}
            disabled={disabled || currentPage === 1}
            aria-label="이전 페이지"
            className={cn(
              paginationButtonVariants({ variant: "default" }),
              (disabled || currentPage === 1) &&
                "pointer-events-none cursor-not-allowed opacity-50",
            )}
          >
            <ChevronLeft className="size-4" />
          </button>
        )}

        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className={cn(
                  paginationButtonVariants({ variant: "ellipsis" }),
                )}
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              disabled={disabled}
              aria-label={`페이지 ${page}${isActive ? " (현재 페이지)" : "로 이동"}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                paginationButtonVariants({
                  variant: isActive ? "active" : "default",
                }),
                disabled && "pointer-events-none cursor-not-allowed opacity-50",
              )}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        {showPrevNext && (
          <button
            onClick={handleNext}
            disabled={disabled || currentPage === totalPages}
            aria-label="다음 페이지"
            className={cn(
              paginationButtonVariants({ variant: "default" }),
              (disabled || currentPage === totalPages) &&
                "pointer-events-none cursor-not-allowed opacity-50",
            )}
          >
            <ChevronRight className="size-4" />
          </button>
        )}
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
