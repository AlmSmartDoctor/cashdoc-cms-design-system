"use client";

import React, { useEffect, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const tableVariants = cva(
  cn("w-full caption-bottom text-sm [border-spacing:0]"),
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

export interface TableProps
  extends
    React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  /** zebra stripe 패턴 적용 여부 */
  striped?: boolean;
  /** row hover 효과 적용 여부 */
  hoverable?: boolean;
  /** 테두리 표시 여부 */
  bordered?: boolean;
  /** 좁은 padding 적용 여부 */
  compact?: boolean;
}

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
 * - **중첩 테이블**: 테이블 안에 테이블을 넣지 마세요. 복잡도가 급격히 증가합니다.
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
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    const checkScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
    };

    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        checkScroll();
        container.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        return () => {
          container.removeEventListener("scroll", checkScroll);
          window.removeEventListener("resize", checkScroll);
        };
      }
    }, []);

    return (
      <div
        className={cn(
          "relative w-full",
          bordered && "rounded-lg border border-cms-gray-300",
        )}
      >
        {showLeftScroll && (
          <div
            className={cn(
              "flex items-center justify-center",
              "absolute top-0 bottom-0 left-0 z-10 w-8",
              "bg-linear-to-r from-white to-transparent",
            )}
          >
            <ChevronLeft className="h-6 w-6 text-cms-gray-400" />
          </div>
        )}
        <div ref={containerRef} className="overflow-auto rounded-lg">
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
              "absolute top-0 right-0 bottom-0 z-10 w-8",
              "flex items-center justify-center",
              "bg-linear-to-l from-white to-transparent",
            )}
          >
            <ChevronRight className="h-6 w-6 text-cms-gray-400" />
          </div>
        )}
      </div>
    );
  },
);
Table.displayName = "Table";

/* --------------------------------- TableHeader --------------------------------- */

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

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
      "[&_tr]:border-0",
      "[&_th:first-child]:rounded-tl-lg",
      "[&_th:last-child]:rounded-tr-lg",
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/* --------------------------------- TableBody --------------------------------- */

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

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
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/* --------------------------------- TableFooter --------------------------------- */

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

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
      "border-t bg-cms-gray-50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/* --------------------------------- TableRow --------------------------------- */

const tableRowVariants = cva(cn("border-b border-cms-gray-200"), {
  variants: {
    hoverable: {
      true: "hover:bg-cms-gray-100",
      false: "",
    },
    selected: {
      true: "bg-cms-primary-100",
      false: "",
    },
  },
  defaultVariants: {
    hoverable: false,
    selected: false,
  },
});

export interface TableRowProps
  extends
    React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {
  /** 선택된 행 표시 여부 */
  selected?: boolean;
}

/**
 * 테이블의 행(Row)을 정의하는 컴포넌트입니다.
 *
 * `<tr>` 태그를 렌더링하며, `hoverable`이나 `striped` 속성이 `Table` 컴포넌트에
 * 적용되었을 때 이에 따른 스타일을 자동으로 적용합니다.
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref) => {
    const table =
      typeof ref === "object" && ref && "current" in ref
        ? ref.current?.closest("table")
        : null;
    const hoverable = table?.dataset?.hoverable === "true";
    const striped = table?.dataset?.striped === "true";

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

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** 정렬 가능 여부 */
  sortable?: boolean;
  /** 정렬 방향 */
  sortDirection?: "asc" | "desc" | null;
  /** 정렬 클릭 핸들러 */
  onSort?: () => void;
}

/**
 * 테이블의 헤더 셀을 정의하는 컴포넌트입니다.
 *
 * `<th>` 태그를 렌더링하며, 열의 제목을 표시합니다.
 * 정렬 기능(`sortable`)을 지원하며, 정렬 방향에 따라 아이콘을 표시할 수 있습니다.
 */
export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      children,
      sortable,
      sortDirection,
      onSort,
      scope = "col",
      ...props
    },
    ref,
  ) => {
    const getSortIcon = () => {
      if (!sortable) return null;
      if (sortDirection === "asc")
        return <ChevronUp className="ml-2 h-4 w-4" />;
      if (sortDirection === "desc")
        return <ChevronDown className="ml-2 h-4 w-4" />;
      return <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />;
    };

    const content = (
      <>
        {children}
        {getSortIcon()}
      </>
    );

    return (
      <th
        ref={ref}
        scope={scope}
        className={cn(
          "h-12 px-4 text-left align-middle font-semibold text-cms-gray-800",
          "border-0 bg-amber-50",
          "[&:has([role=checkbox])]:pr-0",
          sortable && "cursor-pointer select-none hover:bg-amber-100",
          className,
        )}
        onClick={sortable ? onSort : undefined}
        aria-sort={
          sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
              ? "descending"
              : undefined
        }
        {...props}
      >
        {sortable ? (
          <div className="flex items-center">{content}</div>
        ) : (
          content
        )}
      </th>
    );
  },
);
TableHead.displayName = "TableHead";

/* --------------------------------- TableCell --------------------------------- */

const tableCellVariants = cva(
  cn("p-4 align-middle [&:has([role=checkbox])]:pr-0"),
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

export interface TableCellProps
  extends
    React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableCellVariants> {
  /** 텍스트 정렬 방식 */
  align?: "left" | "center" | "right";
}

/**
 * 테이블의 데이터 셀을 정의하는 컴포넌트입니다.
 *
 * `<td>` 태그를 렌더링하며, 실제 데이터를 표시합니다.
 * 텍스트 정렬(`align`)을 설정할 수 있습니다.
 */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align, ...props }, ref) => {
    const table =
      typeof ref === "object" && ref && "current" in ref
        ? ref.current?.closest("table")
        : null;
    const compact = table?.dataset?.compact === "true";

    return (
      <td
        ref={ref}
        className={cn(
          tableCellVariants({ align }),
          compact && "p-2",
          className,
        )}
        {...props}
      />
    );
  },
);
TableCell.displayName = "TableCell";

/* --------------------------------- TableCaption --------------------------------- */

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

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
