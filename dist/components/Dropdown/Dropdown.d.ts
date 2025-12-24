import { VariantProps } from 'class-variance-authority';

export declare const dropdownTriggerVariants: (props?: ({
    variant?: "default" | "outline" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface DropdownOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface DropdownProps extends VariantProps<typeof dropdownTriggerVariants> {
    options: DropdownOption[];
    value?: string;
    placeholder?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
    dropdownClassName?: string;
    searchable?: boolean;
    clearable?: boolean;
    multiple?: boolean;
    maxHeight?: number;
}
/**
 * 사용자가 목록에서 하나 또는 여러 개의 옵션을 선택할 수 있게 하는 컴포넌트입니다.
 *
 * {@link Dropdown}은 공간이 제한적인 UI에서 다양한 선택지를 효율적으로 제공합니다.
 * 검색 기능, 다중 선택(Multiple), 선택 해제(Clearable) 등 복잡한 선택 시나리오를 지원합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **단일/다중 선택**: 5개 이상의 옵션 중 하나 또는 여러 개를 선택해야 할 때
 * - **공간 절약**: 라디오 버튼이나 체크박스 그룹을 표시하기엔 화면 공간이 부족할 때
 * - **동적 필터링**: 옵션이 너무 많아 검색을 통해 원하는 항목을 찾아야 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **옵션이 적은 경우(2-4개)**: 사용자가 모든 옵션을 한눈에 볼 수 있는 `RadioButton`이나 `Checkbox`가 더 좋습니다.
 * - **설정 토글**: 단순히 On/Off를 전환하는 것이라면 `Switch`를 사용하세요.
 * - **단순 내비게이션**: 클릭 시 다른 페이지로 이동만 하는 기능이라면 `Button`이나 `SideNavigation` 아이템이 더 적절합니다.
 *
 * ## Layout behavior
 *
 * - **Popover Menu**: 클릭 시 버튼 아래(또는 위)에 옵션 목록이 나타나며, 다른 요소들 위에 오버레이됩니다.
 * - **Flexible Width**: 부모 컨테이너의 너비에 맞춰지거나, `className`을 통해 고정 너비를 가질 수 있습니다.
 * - **Scrolling**: 옵션이 많아지면 `maxHeight` 설정에 따라 목록 내부에 스크롤이 발생합니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **논리적 정렬**: 옵션 목록은 가나다순, 사용 빈도순 등 사용자가 예측 가능한 순서로 정렬하세요.
 * - **검색 기능 활용**: 옵션이 10개 이상인 경우 `searchable` 속성을 활성화하여 편의성을 높이세요.
 * - **상태 표시**: `placeholder`를 통해 무엇을 선택해야 하는지 안내하고, 선택 후에는 선택된 항목을 명확히 표시하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **너무 많은 텍스트**: 각 옵션의 레이블은 가급적 한 줄에 들어오도록 짧게 작성하세요.
 * - **중첩 드롭다운 지양**: 드롭다운 안에서 또 다른 드롭다운이 열리는 복잡한 계층 구조는 피하는 것이 좋습니다.
 *
 * ## Accessibility
 *
 * - **Keyboard Interaction**: `Enter`나 `Space`로 열고, 화살표 키로 이동하며, `Esc`로 닫을 수 있습니다.
 * - **Screen Reader**: `aria-expanded`, `aria-haspopup` 등의 속성을 통해 드롭다운의 상태와 역할을 스크린 리더에 전달합니다.
 * - **Focus Management**: 드롭다운이 열리면 검색창이나 첫 번째 옵션으로 포커스가 이동합니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 단일 선택 드롭다운:
 *
 * ```tsx
 * <Dropdown
 *   options={[
 *     { value: 'ko', label: '한국어' },
 *     { value: 'en', label: '영어' },
 *     { value: 'ja', label: '일본어' },
 *   ]}
 *   placeholder="언어를 선택하세요"
 *   onValueChange={(val) => console.log(val)}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 검색과 다중 선택이 가능한 드롭다운:
 *
 * ```tsx
 * <Dropdown
 *   options={largeOptionList}
 *   multiple={true}
 *   searchable={true}
 *   clearable={true}
 *   placeholder="태그 선택"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Select}, 기본적인 HTML select 스타일의 컴포넌트
 * - {@link Combobox}, 입력과 선택이 결합된 컴포넌트
 * - {@link Popover}, 더 자유로운 형태의 팝오버가 필요한 경우
 */
export declare const Dropdown: import('react').ForwardRefExoticComponent<DropdownProps & import('react').RefAttributes<HTMLButtonElement>>;
