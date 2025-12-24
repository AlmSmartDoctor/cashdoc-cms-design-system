import { default as React } from 'react';

export interface DatePickerProps {
    value?: string;
    onChange?: (date: string) => void;
    label?: string;
    placeholder?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    className?: string;
}
/**
 * 사용자가 달력 인터페이스를 통해 특정 날짜를 선택할 수 있게 하는 컴포넌트입니다.
 *
 * {@link DatePicker}는 직접적인 텍스트 입력 대신 시각적인 달력을 제공하여
 * 날짜 형식의 오류를 방지하고 사용자 편의성을 높입니다.
 *
 * `react-day-picker`와 `dayjs`를 기반으로 구현되었으며, 한국어 로케일을 기본으로 지원합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **특정일 선택**: 생년월일, 예약일, 마감일 등 단일 날짜를 입력받아야 할 때
 * - **제한된 범위 내 선택**: 과거 날짜만 선택 가능하거나, 특정 기간 내에서만 선택해야 할 때
 * - **정확한 날짜 입력**: 텍스트 입력 시 발생할 수 있는 포맷 오류를 방지하고 싶을 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **기간 선택**: 시작일과 종료일을 함께 선택해야 하는 경우 `DateRangePicker`를 사용하세요.
 * - **대략적인 시간/날짜**: '방금 전', '1주일 내' 등 상대적인 시간 선택이 필요한 경우 `Dropdown`이나 `RadioButton`이 더 적절할 수 있습니다.
 * - **빠른 연도 이동**: 수십 년 전의 날짜를 선택해야 하는 경우(예: 생년월일) 달력보다는 직접 입력이나 연도 선택 기능이 포함된 별도 UI를 고려하세요.
 *
 * ## Layout behavior
 *
 * - **Popover 기반**: 클릭 시 입력창 아래에 달력 팝오버가 나타나며, 화면 공간을 효율적으로 사용합니다.
 * - **Responsive**: 팝오버는 화면 경계 내에서 최적의 위치를 자동으로 찾아 표시됩니다.
 * - **Full Width**: `className`을 통해 부모 요소의 너비에 맞게 조절할 수 있습니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **적절한 Placeholder**: "YYYY-MM-DD"와 같이 기대하는 날짜 형식을 명시하세요.
 * - **최소/최대 날짜 설정**: 비즈니스 로직에 따라 `min`, `max` 속성을 사용하여 유효하지 않은 날짜 선택을 방지하세요.
 * - **레이블 및 헬퍼 텍스트**: 입력 항목의 용도를 명확히 하고, 필요한 경우 보충 설명을 제공하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **Read-only 입력**: 사용자가 직접 타이핑하여 입력하는 기능은 현재 지원하지 않으므로, 반드시 달력을 통해 선택하도록 안내하세요.
 * - **복잡한 로직**: 너무 많은 날짜 제한 로직은 사용자에게 혼란을 줄 수 있습니다. 필요한 경우 에러 메시지로 명확히 안내하세요.
 *
 * ## Accessibility
 *
 * - **Keyboard Navigation**: 팝오버는 키보드로 열고 닫을 수 있으며, `Esc` 키로 취소할 수 있습니다.
 * - **Focus Trap**: 달력이 열려 있는 동안 포커스가 달력 내부에 머무르도록 관리됩니다.
 * - **Aria Labels**: 달력의 각 요소에는 스크린 리더를 위한 적절한 레이블이 포함되어 있습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 날짜 선택 예시:
 *
 * ```tsx
 * const [date, setDate] = useState("");
 *
 * <DatePicker
 *   label="방문 예약일"
 *   value={date}
 *   onChange={setDate}
 *   placeholder="예약 날짜를 선택하세요"
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 날짜 범위 제한 및 에러 상태:
 *
 * ```tsx
 * <DatePicker
 *   label="종료일"
 *   min="2024-01-01"
 *   max="2024-12-31"
 *   error={true}
 *   errorMessage="2024년 내의 날짜만 선택 가능합니다"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link DateRangePicker}, 기간을 선택해야 하는 경우
 * - {@link TextInput}, 단순한 텍스트 입력이 필요한 경우
 * - {@link Popover}, 일반적인 팝오버 컴포넌트
 */
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLDivElement>>;
