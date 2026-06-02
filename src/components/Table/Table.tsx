"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { useScrollIndicator } from "@/hooks/useScrollIndicator";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../Button";

const tableVariants = cva(
  "w-full caption-bottom [border-spacing:0] bg-cms-white text-[13px]",
  {
    variants: {
      bordered: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      bordered: false,
    },
  },
);

type TableContextValue = {
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
};

const TableContext = React.createContext<TableContextValue>({});

export type TableProps = {
  /** zebra stripe 패턴 적용 여부 */
  striped?: boolean;
  /** row hover 효과 적용 여부 */
  hoverable?: boolean;
  /** 테두리 표시 여부 */
  bordered?: boolean;
  /** 좁은 padding 적용 여부 */
  compact?: boolean;
} & React.TableHTMLAttributes<HTMLTableElement> &
  VariantProps<typeof tableVariants>;

/**
 * 데이터를 행과 열로 구조화하여 표시하는 테이블 컴포넌트입니다.
 *
 * {@link Table}은 Compound Component 패턴을 사용하여 구성되며,
 * TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption
 * 등의 하위 컴포넌트를 조합하여 유연한 테이블 레이아웃을 만들 수 있습니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **데이터 목록**: 사용자 목록, 주문 내역, 제품 리스트 등 구조화된 데이터를 표시할 때
 * - **비교**: 여러 항목의 속성을 나란히 비교해야 할 때
 * - **정렬 및 필터**: 데이터를 정렬하거나 필터링해서 보여줄 때
 * - **대량 데이터**: 많은 양의 정보를 조직적으로 표시해야 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **레이아웃 목적**: 단순히 레이아웃을 만들기 위해서는 CSS Grid나 Flexbox를 사용하세요.
 * - **소량 데이터**: 2-3개의 간단한 정보는 리스트나 카드 형태가 더 적합할 수 있습니다.
 * - **복잡한 인터랙션**: 각 행마다 많은 버튼이나 입력이 필요하다면 카드 레이아웃을 고려하세요.
 *
 * ## Layout behavior
 *
 * - **Responsive**: 기본적으로 스크롤 가능한 컨테이너로 래핑되어 모바일에서도 사용 가능합니다.
 * - **Full Width**: 부모 컨테이너의 전체 너비를 차지합니다.
 * - **Auto Height**: 내용에 따라 높이가 자동으로 조정됩니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확한 헤더**: TableHead를 사용하여 각 열의 의미를 명확히 표시하세요.
 * - **일관된 정렬**: 숫자는 오른쪽, 텍스트는 왼쪽 정렬하는 것이 일반적입니다.
 * - **적절한 variant**: 데이터가 많을 때는 `striped`나 `hoverable`을 사용하여 가독성을 높이세요.
 * - **Caption 활용**: 테이블의 목적을 설명하는 caption을 추가하면 접근성이 향상됩니다.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **과도한 열**: 너무 많은 열은 가독성을 해칩니다. 중요한 정보만 표시하세요.
 * - **중첩 테이블(직접 삽입)**: `TableCell` 안에 또 다른 `Table`을 직접 넣지 마세요.
 *   상세 데이터를 표 형태로 함께 보여줘야 한다면 `TableExpandableRow`를 사용해
 *   펼침 행으로 표현하세요.
 * - **빈 셀 남용**: 빈 셀이 많으면 데이터 구조를 다시 검토하세요.
 *
 * ## Accessibility
 *
 * - **Semantic HTML**: 적절한 `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` 태그를 사용합니다.
 * - **Scope Attribute**: TableHead는 `scope="col"`을 자동으로 가집니다.
 * - **ARIA Attributes**: 정렬, 선택 등의 상태는 `aria-sort`, `aria-selected`로 표현됩니다.
 * - **Caption**: 테이블의 목적을 설명하는 `<caption>`을 사용할 수 있습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본 테이블 사용:
 *
 * ```tsx
 * <Table>
 *   <TableCaption>사용자 목록</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>이름</TableHead>
 *       <TableHead>이메일</TableHead>
 *       <TableHead align="right">역할</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>홍길동</TableCell>
 *       <TableCell>hong@example.com</TableCell>
 *       <TableCell align="right">관리자</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 *
 * Striped 테이블:
 *
 * ```tsx
 * <Table striped hoverable>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>제품명</TableHead>
 *       <TableHead align="right">가격</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     {products.map((product) => (
 *       <TableRow key={product.id}>
 *         <TableCell>{product.name}</TableCell>
 *         <TableCell align="right">{product.price}</TableCell>
 *       </TableRow>
 *     ))}
 *   </TableBody>
 * </Table>
 * ```
 * {@end-tool}
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Data Display/Table/For%20Jsdoc.png?raw=true)
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, striped, hoverable, bordered, compact, ...props }, ref) => {
    const {
      ref: containerRef,
      showStart: showLeftScroll,
      showEnd: showRightScroll,
    } = useScrollIndicator<HTMLDivElement>("x");
    const tableState = React.useMemo(
      () => ({
        striped: Boolean(striped),
        hoverable: Boolean(hoverable),
        compact: Boolean(compact),
      }),
      [striped, hoverable, compact],
    );

    return (
      <TableContext.Provider value={tableState}>
        <div
          className={cn(
            "relative w-full",
            bordered && "rounded-cms-lg border border-cms-gray-200",
          )}
        >
          {showLeftScroll && (
            <div
              className={cn(
                "flex items-center justify-center",
                "absolute inset-y-0 left-0 z-10 w-8",
                "bg-linear-to-r from-cms-white to-transparent",
                "pointer-events-none",
              )}
            >
              <ChevronLeft className="size-6 text-cms-gray-400" />
            </div>
          )}
          <div ref={containerRef} className="overflow-auto rounded-cms-lg">
            <table
              ref={ref}
              className={cn(tableVariants({ bordered }), className)}
              data-striped={striped}
              data-hoverable={hoverable}
              data-compact={compact}
              {...props}
            />
          </div>
          {showRightScroll && (
            <div
              className={cn(
                "absolute inset-y-0 right-0 z-10 w-8",
                "flex items-center justify-center",
                "bg-linear-to-l from-cms-white to-transparent",
                "pointer-events-none",
              )}
            >
              <ChevronRight className="size-6 text-cms-gray-400" />
            </div>
          )}
        </div>
      </TableContext.Provider>
    );
  },
);
Table.displayName = "Table";

/* --------------------------------- TableHeader --------------------------------- */

export type TableHeaderProps =
  {} & React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * 테이블의 헤더 섹션을 정의하는 컴포넌트입니다.
 *
 * `<thead>` 태그를 렌더링하며, 보통 `TableRow`와 `TableHead`를 포함하여
 * 열의 제목을 표시하는 데 사용됩니다.
 */
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "[&>tr]:border-0",
      "bg-cms-gray-50",
      "[&>tr>th:first-child]:rounded-tl-cms-lg",
      "[&>tr>th:last-child]:rounded-tr-cms-lg",
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/* --------------------------------- TableBody --------------------------------- */

export type TableBodyProps = {} & React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * 테이블의 본문 섹션을 정의하는 컴포넌트입니다.
 *
 * `<tbody>` 태그를 렌더링하며, 실제 데이터가 포함된 `TableRow`와 `TableCell`을
 * 포함합니다.
 */
export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&>tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/* --------------------------------- TableFooter --------------------------------- */

export type TableFooterProps =
  {} & React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * 테이블의 푸터 섹션을 정의하는 컴포넌트입니다.
 *
 * `<tfoot>` 태그를 렌더링하며, 합계나 요약 정보를 표시하는 데 사용됩니다.
 */
export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-cms-gray-50 font-medium",
      "[&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/* --------------------------------- TableRow --------------------------------- */

const tableRowVariants = cva(
  "border-b border-cms-gray-150 transition-colors",
  {
    variants: {
      hoverable: {
        true: "hover:bg-cms-gray-50",
        false: "",
      },
      selected: {
        true: "bg-cms-gray-100",
        false: "",
      },
    },
    defaultVariants: {
      hoverable: false,
      selected: false,
    },
  },
);

export type TableRowProps = {
  /** 선택된 행 표시 여부 */
  selected?: boolean;
} & React.HTMLAttributes<HTMLTableRowElement> &
  VariantProps<typeof tableRowVariants>;

/**
 * 테이블의 행(Row)을 정의하는 컴포넌트입니다.
 *
 * `<tr>` 태그를 렌더링하며, `hoverable`이나 `striped` 속성이 `Table` 컴포넌트에
 * 적용되었을 때 이에 따른 스타일을 자동으로 적용합니다.
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref) => {
    const { hoverable, striped } = React.useContext(TableContext);

    return (
      <tr
        ref={ref}
        className={cn(
          tableRowVariants({ hoverable, selected }),
          striped && "even:bg-cms-gray-50",
          className,
        )}
        aria-selected={selected}
        {...props}
      />
    );
  },
);
TableRow.displayName = "TableRow";

/* --------------------------------- TableHead --------------------------------- */

export type TableHeadProps = {
  /** 정렬 가능 여부 */
  sortable?: boolean;
  /** 정렬 방향 */
  sortDirection?: "asc" | "desc" | null;
  /** 정렬 클릭 핸들러 */
  onSort?: () => void;
  /** 텍스트 정렬 방식 (default: "left") */
  align?: "left" | "center" | "right";
} & Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align">;

/**
 * 테이블의 헤더 셀을 정의하는 컴포넌트입니다.
 *
 * `<th>` 태그를 렌더링하며, 열의 제목을 표시합니다.
 * 정렬 기능(`sortable`)을 지원하며, 정렬 방향에 따라 아이콘을 표시할 수 있습니다.
 */
const TABLE_HEAD_TEXT_ALIGN = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

const TABLE_HEAD_JUSTIFY = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
} as const;

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      children,
      sortable,
      sortDirection,
      onSort,
      align = "left",
      scope = "col",
      ...props
    },
    ref,
  ) => {
    const getSortIcon = () => {
      if (!sortable) return null;
      if (sortDirection === "asc") return <ChevronUp className="ml-2 size-4" />;
      if (sortDirection === "desc")
        return <ChevronDown className="ml-2 size-4" />;
      return <ChevronsUpDown className="ml-2 size-4 opacity-50" />;
    };

    return (
      <th
        ref={ref}
        scope={scope}
        className={cn(
          "h-10 px-3.5 align-middle",
          TABLE_HEAD_TEXT_ALIGN[align],
          "text-[12px] font-semibold text-cms-gray-600",
          "whitespace-nowrap",
          "border-0 border-b border-cms-gray-200",
          "[&:has([role=checkbox])]:pr-0",
          sortable && "cursor-pointer hover:bg-cms-gray-100",
          className,
        )}
        aria-sort={
          sortDirection === "asc" ? "ascending"
          : sortDirection === "desc" ?
            "descending"
          : undefined
        }
        {...props}
      >
        {sortable ?
          <button
            type="button"
            onClick={onSort}
            className={cn(
              "flex w-full items-center",
              TABLE_HEAD_JUSTIFY[align],
              "cursor-pointer border-0 bg-transparent p-0 select-none",
              "font-[inherit] text-inherit",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-cms-primary-400",
            )}
          >
            {children}
            {getSortIcon()}
          </button>
        : <>
            {children}
            {getSortIcon()}
          </>
        }
      </th>
    );
  },
);
TableHead.displayName = "TableHead";

/* --------------------------------- TableCell --------------------------------- */

const tableCellVariants = cva(
  cn(
    "px-3.5 py-3 align-middle text-cms-gray-850",
    "[&:has([role=checkbox])]:pr-0",
  ),
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      align: "left",
    },
  },
);

export type TableCellProps = {
  /** 텍스트 정렬 방식 */
  align?: "left" | "center" | "right";
} & React.TdHTMLAttributes<HTMLTableCellElement> &
  VariantProps<typeof tableCellVariants>;

/**
 * 테이블의 데이터 셀을 정의하는 컴포넌트입니다.
 *
 * `<td>` 태그를 렌더링하며, 실제 데이터를 표시합니다.
 * 텍스트 정렬(`align`)을 설정할 수 있습니다.
 */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align, ...props }, ref) => {
    const { compact } = React.useContext(TableContext);

    return (
      <td
        ref={ref}
        className={cn(
          tableCellVariants({ align }),
          compact && "px-2.5 py-1.5",
          className,
        )}
        {...props}
      />
    );
  },
);
TableCell.displayName = "TableCell";

/* --------------------------------- TableExpandableRow --------------------------------- */

export type TableExpandableRowProps = {
  /** 펼침 시 렌더할 콘텐츠. nested Table, 상세 패널 등 자유롭게 구성합니다. */
  expandedContent: React.ReactNode;
  /** controlled 펼침 상태. 생략 시 내부 상태 사용 (uncontrolled) */
  expanded?: boolean;
  /** uncontrolled 사용 시 초기 펼침 여부 */
  defaultExpanded?: boolean;
  /** 펼침 상태 변경 콜백 */
  onExpandedChange?: (expanded: boolean) => void;
  /**
   * 토글 컨트롤 위치.
   * - "leading"(기본): 첫 번째 셀로 chevron 버튼이 자동 삽입됩니다.
   *   헤더에 빈 `<TableHead/>`를 하나 추가해야 컬럼 수가 맞습니다.
   * - "none": 사용자가 직접 토글 컨트롤을 배치합니다.
   */
  toggleSlot?: "leading" | "none";
  /**
   * 펼침 행의 colSpan. 생략 시 children의 React 요소 개수와
   * `toggleSlot`에 따라 자동 계산됩니다.
   */
  colSpan?: number;
  /** 토글 버튼 접근성 레이블 */
  toggleAriaLabel?: string;
  /** 선택된 행 표시 여부 */
  selected?: boolean;
  /** 데이터 행의 셀들 */
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLTableRowElement>, "children">;

/**
 * 펼침 가능한 테이블 행 컴포넌트입니다.
 *
 * 데이터 행 아래에 추가 `<tr>`을 렌더링하여 상세 정보, sub-table,
 * 설명 패널 등을 표시합니다. 실제 HTML 중첩 테이블이 아니므로
 * 시맨틱·접근성 문제 없이 안전합니다.
 *
 * ## When
 *
 * - 행마다 상세 데이터를 펼쳐서 보여줘야 할 때
 * - 마스터-디테일 구조를 한 테이블에 표현해야 할 때
 *
 * ## Example
 *
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead />
 *       <TableHead>이름</TableHead>
 *       <TableHead>역할</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableExpandableRow
 *       expandedContent={
 *         <Table compact bordered>
 *           ...
 *         </Table>
 *       }
 *     >
 *       <TableCell>홍길동</TableCell>
 *       <TableCell>관리자</TableCell>
 *     </TableExpandableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export const TableExpandableRow = React.forwardRef<
  HTMLTableRowElement,
  TableExpandableRowProps
>(
  (
    {
      expandedContent,
      expanded: expandedProp,
      defaultExpanded = false,
      onExpandedChange,
      toggleSlot = "leading",
      colSpan,
      toggleAriaLabel,
      selected,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const [internalExpanded, setInternalExpanded] =
      React.useState(defaultExpanded);
    const isControlled = expandedProp !== undefined;
    const expanded = isControlled ? expandedProp : internalExpanded;

    const handleToggle = React.useCallback(() => {
      const next = !expanded;
      if (!isControlled) setInternalExpanded(next);
      onExpandedChange?.(next);
    }, [expanded, isControlled, onExpandedChange]);

    const dataCellCount = React.Children.toArray(children).filter(
      React.isValidElement,
    ).length;
    const totalColSpan =
      colSpan ?? dataCellCount + (toggleSlot === "leading" ? 1 : 0);

    return (
      <>
        <TableRow
          ref={ref}
          selected={selected}
          className={className}
          data-expanded={expanded || undefined}
          {...rest}
        >
          {toggleSlot === "leading" && (
            <TableCell className="w-10 pr-0">
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={handleToggle}
                aria-expanded={expanded}
                aria-label={
                  toggleAriaLabel ?? (expanded ? "행 접기" : "행 펼치기")
                }
                className="size-8 text-cms-gray-600"
              >
                <ChevronRight
                  className={cn(
                    "size-4 transition-transform duration-200 ease-out",
                    expanded && "rotate-90",
                  )}
                />
              </Button>
            </TableCell>
          )}
          {children}
        </TableRow>
        <tr
          data-expanded-content
          aria-hidden={!expanded}
          className={cn(
            "bg-cms-gray-50",
            expanded && "border-b border-cms-gray-200",
          )}
        >
          <td colSpan={totalColSpan} className="p-0">
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="p-4">{expandedContent}</div>
              </div>
            </div>
          </td>
        </tr>
      </>
    );
  },
);
TableExpandableRow.displayName = "TableExpandableRow";

/* --------------------------------- TableCaption --------------------------------- */

export type TableCaptionProps =
  {} & React.HTMLAttributes<HTMLTableCaptionElement>;

/**
 * 테이블의 캡션(설명)을 정의하는 컴포넌트입니다.
 *
 * `<caption>` 태그를 렌더링하며, 스크린 리더 사용자에게 테이블의 목적을
 * 설명하는 데 중요한 역할을 합니다.
 */
export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-cms-gray-600", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
