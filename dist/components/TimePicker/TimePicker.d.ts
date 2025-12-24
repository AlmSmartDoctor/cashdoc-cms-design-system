import { default as React } from 'react';

export interface TimePickerProps {
    value?: string;
    onChange?: (time: string) => void;
    label?: string;
    placeholder?: string;
    format?: "24h" | "12h";
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    className?: string;
    minuteStep?: number;
    showIcon?: boolean;
}
/**
 * 사용자가 시간을 선택할 수 있게 하는 컴포넌트입니다.
 *
 * {@link TimePicker}는 직관적인 스크롤 인터페이스를 통해 시간과 분을 선택할 수 있으며,
 * 24시간 형식과 12시간(AM/PM) 형식을 모두 지원합니다.
 *
 * `@radix-ui/react-popover`를 기반으로 구현되었으며, 사용자가 잘못된 시간을 입력하는 것을 방지합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **특정 시간 입력**: 예약 시간, 알림 시간, 업무 시작/종료 시간 등을 선택해야 할 때
 * - **정확한 시간 선택**: 사용자가 직접 타이핑하여 발생할 수 있는 형식 오류를 방지하고 싶을 때
 * - **제한된 간격 선택**: 5분, 10분, 15분 단위로만 선택이 필요한 경우 (minuteStep 사용)
 *
 * **사용하지 말아야 하는 경우:**
 * - **대략적인 시간**: '오전', '오후', '저녁' 등 상대적인 시간 선택이 필요한 경우 `Dropdown`이나 `RadioButton`이 더 적절할 수 있습니다.
 * - **초 단위 정밀도**: 현재는 시간과 분까지만 지원하므로, 초 단위가 필요한 경우 다른 컴포넌트를 고려하세요.
 *
 * ## Layout behavior
 *
 * - **Popover 기반**: 클릭 시 입력창 아래에 시간 선택 팝오버가 나타나며, 화면 공간을 효율적으로 사용합니다.
 * - **스크롤 선택**: 시간과 분을 각각 스크롤하여 선택할 수 있어 직관적입니다.
 * - **Full Width**: `className`을 통해 부모 요소의 너비에 맞게 조절할 수 있습니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **적절한 Format**: 사용자가 익숙한 형식(한국: 24시간, 미국: 12시간)을 선택하세요.
 * - **Minute Step 활용**: 일정 간격으로만 선택이 필요한 경우 `minuteStep`을 활용하여 UX를 개선하세요.
 * - **레이블 및 헬퍼 텍스트**: 입력 항목의 용도를 명확히 하고, 필요한 경우 보충 설명을 제공하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **Read-only 입력**: 사용자가 직접 타이핑하여 입력하는 기능은 지원하지 않으므로, 반드시 UI를 통해 선택하도록 안내하세요.
 * - **과도한 Step**: `minuteStep`이 너무 크면 정확한 시간을 선택하기 어려울 수 있습니다.
 *
 * ## Accessibility
 *
 * - **Keyboard Navigation**: 팝오버는 키보드로 열고 닫을 수 있으며, `Esc` 키로 취소할 수 있습니다.
 * - **Focus Management**: 시간 선택기가 열려 있는 동안 포커스가 적절히 관리됩니다.
 * - **Aria Labels**: 각 버튼에는 스크린 리더를 위한 적절한 레이블이 포함되어 있습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 시간 선택 예시 (24시간 형식):
 *
 * ```tsx
 * const [time, setTime] = useState("");
 *
 * <TimePicker
 *   label="출근 시간"
 *   value={time}
 *   onChange={setTime}
 *   placeholder="시간을 선택하세요"
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 12시간 형식 및 15분 단위 선택:
 *
 * ```tsx
 * <TimePicker
 *   label="회의 시간"
 *   format="12h"
 *   minuteStep={15}
 *   value="2:30 PM"
 *   onChange={setTime}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 에러 상태:
 *
 * ```tsx
 * <TimePicker
 *   label="마감 시간"
 *   error={true}
 *   errorMessage="업무 시간(9:00-18:00) 내에서 선택해주세요"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link DatePicker}, 날짜를 선택해야 하는 경우
 * - {@link DateRangePicker}, 날짜 범위를 선택해야 하는 경우
 * - {@link TextInput}, 단순한 텍스트 입력이 필요한 경우
 */
export declare const TimePicker: React.ForwardRefExoticComponent<TimePickerProps & React.RefAttributes<HTMLDivElement>>;
