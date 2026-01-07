import { default as React } from 'react';
import { VariantProps } from 'class-variance-authority';

declare const tableVariants: (props?: ({
    bordered?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement>, VariantProps<typeof tableVariants> {
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
 */
export declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
}
/**
 * 테이블의 헤더 섹션을 정의하는 컴포넌트입니다.
 *
 * `<thead>` 태그를 렌더링하며, 보통 `TableRow`와 `TableHead`를 포함하여
 * 열의 제목을 표시하는 데 사용됩니다.
 */
export declare const TableHeader: React.ForwardRefExoticComponent<TableHeaderProps & React.RefAttributes<HTMLTableSectionElement>>;
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
}
/**
 * 테이블의 본문 섹션을 정의하는 컴포넌트입니다.
 *
 * `<tbody>` 태그를 렌더링하며, 실제 데이터가 포함된 `TableRow`와 `TableCell`을
 * 포함합니다.
 */
export declare const TableBody: React.ForwardRefExoticComponent<TableBodyProps & React.RefAttributes<HTMLTableSectionElement>>;
export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
}
/**
 * 테이블의 푸터 섹션을 정의하는 컴포넌트입니다.
 *
 * `<tfoot>` 태그를 렌더링하며, 합계나 요약 정보를 표시하는 데 사용됩니다.
 */
export declare const TableFooter: React.ForwardRefExoticComponent<TableFooterProps & React.RefAttributes<HTMLTableSectionElement>>;
declare const tableRowVariants: (props?: ({
    hoverable?: boolean | null | undefined;
    selected?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement>, VariantProps<typeof tableRowVariants> {
    /** 선택된 행 표시 여부 */
    selected?: boolean;
}
/**
 * 테이블의 행(Row)을 정의하는 컴포넌트입니다.
 *
 * `<tr>` 태그를 렌더링하며, `hoverable`이나 `striped` 속성이 `Table` 컴포넌트에
 * 적용되었을 때 이에 따른 스타일을 자동으로 적용합니다.
 */
export declare const TableRow: React.ForwardRefExoticComponent<TableRowProps & React.RefAttributes<HTMLTableRowElement>>;
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
export declare const TableHead: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
declare const tableCellVariants: (props?: ({
    align?: "center" | "right" | "left" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof tableCellVariants> {
    /** 텍스트 정렬 방식 */
    align?: "left" | "center" | "right";
}
/**
 * 테이블의 데이터 셀을 정의하는 컴포넌트입니다.
 *
 * `<td>` 태그를 렌더링하며, 실제 데이터를 표시합니다.
 * 텍스트 정렬(`align`)을 설정할 수 있습니다.
 */
export declare const TableCell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;
export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
}
/**
 * 테이블의 캡션(설명)을 정의하는 컴포넌트입니다.
 *
 * `<caption>` 태그를 렌더링하며, 스크린 리더 사용자에게 테이블의 목적을
 * 설명하는 데 중요한 역할을 합니다.
 */
export declare const TableCaption: React.ForwardRefExoticComponent<TableCaptionProps & React.RefAttributes<HTMLTableCaptionElement>>;
export {};
