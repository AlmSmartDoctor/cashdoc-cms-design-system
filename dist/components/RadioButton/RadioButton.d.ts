import { default as React } from 'react';
import { VariantProps } from 'class-variance-authority';

import * as RadioGroupPrimitives from "@radix-ui/react-radio-group";
/**
 * 상호 배타적인 옵션 목록 중 단 하나만을 선택해야 할 때 사용하는 컴포넌트입니다.
 *
 * {@link RadioGroup}은 여러 개의 {@link RadioGroupItem}을 포함하는 컨테이너이며,
 * 한 번에 하나의 아이템만 선택될 수 있도록 상태를 관리합니다.
 *
 * Radix UI의 Radio Group 컴포넌트를 기반으로 구현되어 방향키를 이용한 내비게이션 등
 * 표준 라디오 그룹 동작을 지원합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **단일 선택**: 성별 선택, 배송 방법 선택 등 여러 옵션 중 하나만 골라야 할 때
 * - **옵션 노출**: 모든 선택지가 사용자에게 한눈에 보여야 할 때 (옵션이 5개 이하인 경우 권장)
 *
 * **사용하지 말아야 하는 경우:**
 * - **다중 선택**: 여러 개를 동시에 선택할 수 있어야 하는 경우 `Checkbox`를 사용하세요.
 * - **옵션이 많은 경우**: 선택지가 5-6개를 넘어간다면 화면 공간을 위해 `Dropdown`을 사용하는 것이 좋습니다.
 * - **독립적 On/Off**: 단순히 하나의 항목을 켜고 끄는 것이라면 `Checkbox`나 `Switch`가 더 적절합니다.
 *
 * ## Layout behavior
 *
 * - **asChild**: `asChild` 속성을 사용하면 기본 렌더링 요소 대신 자식 요소를 렌더링하고 속성을 병합합니다.
 *   커스텀 컴포넌트나 다른 라이브러리와 연동할 때 유용합니다.
 *
 * ## Accessibility
 *
 * - **Keyboard Navigation**: `Tab` 키로 그룹에 진입한 후, 화살표 키(`Up`, `Down`, `Left`, `Right`)를 사용하여 옵션 간 이동 및 선택이 가능합니다.
 * - **Roles**: `role="radiogroup"` 및 `role="radio"` 속성이 자동으로 부여됩니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 라디오 그룹 사용 예시:
 *
 * ```tsx
 * <RadioGroup defaultValue="apple" onValueChange={(val) => console.log(val)}>
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem value="apple" id="apple" />
 *     <label htmlFor="apple">사과</label>
 *   </div>
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem value="banana" id="banana" />
 *     <label htmlFor="banana">바나나</label>
 *   </div>
 * </RadioGroup>
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * `asChild`를 사용한 커스텀 렌더링 예시:
 *
 * ```tsx
 * <RadioGroup asChild>
 *   <section className="my-custom-group">
 *     <RadioGroupItem asChild value="custom">
 *       <button type="button" className="custom-radio-trigger">
 *         커스텀 라디오
 *       </button>
 *     </RadioGroupItem>
 *   </section>
 * </RadioGroup>
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Checkbox}, 다중 선택이 필요한 경우
 * - {@link Dropdown}, 옵션이 많아 리스트로 숨겨야 하는 경우
 * - {@link Switch}, 단순 활성화/비활성화를 토글할 때
 */
declare const RadioGroup: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitives.RadioGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const radioGroupItemVariants: (props?: ({
    variant?: "default" | "black" | "green" | "blue" | "red" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Item>, VariantProps<typeof radioGroupItemVariants> {
}
declare const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
export { RadioGroup, RadioGroupItem };
