import { default as React } from 'react';
import { VariantProps } from 'class-variance-authority';

import * as SwitchPrimitives from "@radix-ui/react-switch";
declare const switchVariants: (props?: ({
    variant?: "default" | "green" | "black" | "blue" | "red" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, VariantProps<typeof switchVariants> {
}
/**
 * 두 가지 상반된 상태(On/Off, 활성/비활성)를 즉각적으로 전환할 때 사용하는 컴포넌트입니다.
 *
 * {@link Switch}는 실제 전등 스위치와 같은 직관적인 시각적 모델을 제공하며,
 * 체크박스보다 더 '즉각적인 반영'의 의미를 가집니다.
 *
 * Radix UI의 Switch 컴포넌트를 기반으로 구현되어 접근성과 애니메이션이
 * 자동으로 처리됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **즉각적 설정 반영**: 클릭 즉시 시스템 설정이 변경되거나 저장되어야 할 때 (예: 다크모드 켜기, 알림 수신 동의)
 * - **상태 전환**: 특정 기능의 사용 여부를 결정할 때
 * - **단순 토글**: 복잡한 입력 없이 켜고 끄는 행위만 필요할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **제출 버튼 필요**: 여러 정보를 입력하고 '확인' 버튼을 눌러야 결과가 반영되는 폼 내에서는 `Checkbox`를 사용하세요.
 * - **다중 선택**: 여러 항목 중 일부를 골라야 할 때도 `Checkbox`가 더 적합합니다.
 *
 * ## Layout behavior
 *
 * - **Inline Component**: 주변 텍스트나 다른 요소와 자연스럽게 어우러지는 인라인 블록 형태입니다.
 * - **Thumb Animation**: 클릭 시 스위치의 '손잡이(Thumb)'가 부드럽게 좌우로 이동하며 상태 변화를 시각화합니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확한 현재 상태 표시**: 색상 변화(회색 vs 색상)를 통해 켜져 있는지 꺼져 있는지 한눈에 알 수 있게 하세요.
 * - **레이블과 함께 사용**: 스위치 옆에 무엇을 제어하는지 설명하는 텍스트를 반드시 배치하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **모호한 의미**: 상태 전환 후에 어떤 변화가 생길지 명확하지 않은 경우에는 사용을 지양하세요.
 * - **긴 대기 시간**: 서버 통신 등으로 인해 상태 반영에 시간이 걸리는 경우, 로딩 인디케이터를 함께 보여주거나 즉시 반응을 우선 처리하세요.
 *
 * ## Accessibility
 *
 * - **Keyboard Support**: `Space` 키를 사용하여 상태를 전환할 수 있습니다.
 * - **Roles**: `role="switch"` 속성을 사용하여 스크린 리더에서 토글 상태를 읽어줍니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 레이블과 함께 사용하는 기본적인 스위치:
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Switch id="airplane-mode" />
 *   <label htmlFor="airplane-mode">비행기 모드</label>
 * </div>
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Checkbox}, 제출 전까지 상태를 유지해야 하는 경우
 * - {@link RadioButton}, 여러 선택지 중 하나를 고르는 경우
 */
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
export { Switch };
