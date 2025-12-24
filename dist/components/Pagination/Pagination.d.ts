import { default as React } from 'react';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
    showPrevNext?: boolean;
    disabled?: boolean;
    className?: string;
}
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
 */
export declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLDivElement>>;
