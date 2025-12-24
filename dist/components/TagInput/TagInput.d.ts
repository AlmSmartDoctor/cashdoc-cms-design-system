import { default as React } from 'react';
import { VariantProps } from 'class-variance-authority';

declare const tagInputContainerVariants: (props?: ({
    readOnly?: boolean | null | undefined;
    layout?: "row" | "column" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TagInputProps extends Omit<VariantProps<typeof tagInputContainerVariants>, "readOnly"> {
    label?: string;
    required?: boolean;
    maxTags?: number;
    placeholder?: string;
    value?: string[];
    onChange?: (tags: string[]) => void;
    readOnly?: boolean;
    noLimit?: boolean;
    validateTag?: (tag: string, currentTags: string[]) => boolean | string | undefined;
    className?: string;
    id?: string;
    labelLayout?: "vertical" | "horizontal";
    labelWidth?: string;
}
/**
 * 사용자가 텍스트를 입력하여 여러 개의 태그(키워드) 목록을 생성하고 관리할 수 있는 컴포넌트입니다.
 *
 * {@link TagInput}은 입력창 내부에 시각적인 태그를 표시하며,
 * 엔터(Enter) 키를 통해 새로운 태그를 추가하고 'x' 버튼을 눌러 기존 태그를 제거할 수 있습니다.
 * 주로 게시글의 태그, 검색 필터 조건, 수신자 목록 등을 입력받을 때 사용됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **키워드 입력**: 게시글의 해시태그나 카테고리를 입력받을 때
 * - **다중 항목 수집**: 여러 개의 이메일 주소나 사용자 아이디를 한꺼번에 입력받아야 할 때
 * - **제한된 개수의 항목 선택**: 최대 N개까지의 조건을 입력받아야 할 때 (`maxTags` 활용)
 *
 * **사용하지 말아야 하는 경우:**
 * - **단일 텍스트 입력**: 하나의 값만 필요한 경우 일반 `TextInput`을 사용하세요.
 * - **미리 정의된 옵션**: 고정된 목록에서만 선택해야 한다면 `Dropdown`이나 `Combobox`가 더 적합합니다.
 *
 * ## Layout behavior
 *
 * - **Flow Layout**: 태그들은 가로 방향으로 나열되며, 공간이 부족하면 자동으로 다음 줄로 넘어갑니다 (`layout="row"`).
 * - **Column Layout**: 태그들을 수직으로 쌓고 싶을 경우 `layout="column"` 설정을 사용할 수 있습니다.
 * - **Constraint**: `maxTags`에 도달하면 추가 입력이 차단되며 시각적으로 안내됩니다.
 *
 * 레이블 배치는 `labelLayout` prop으로 제어됩니다:
 * - **vertical** (기본값): Label이 태그 입력 필드 위에 세로로 배치됩니다.
 * - **horizontal**: Label과 태그 입력 필드가 가로로 나란히 배치됩니다. `labelWidth`로 Label 너비를 조정할 수 있습니다 (기본값: 120px).
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **유효성 검사 활용**: `validateTag`를 통해 이메일 형식 확인이나 글자 수 제한 등 비즈니스 로직을 적용하세요.
 * - **중복 방지**: 동일한 태그가 입력되지 않도록 자동으로 처리되지만, 필요에 따라 사용자에게 알림을 줄 수 있습니다.
 * - **가로 배치 활용**: 폼에서 여러 입력 필드를 정렬할 때는 `labelLayout="horizontal"`을 사용하여 일관된 레이아웃을 유지하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **너무 긴 태그**: 태그 하나에 너무 긴 문장이 들어가는 것은 피하세요. 가급적 단어나 짧은 구문으로 제한하는 것이 좋습니다.
 * - **복잡한 인터페이스**: 태그 내부에 너무 많은 기능을 넣지 마세요. 태그는 가볍고 빠르게 훑어볼 수 있어야 합니다.
 *
 * ## Accessibility
 *
 * - **Keyboard Management**: `Enter`로 추가, `Backspace`(구현 예정) 또는 'x' 버튼 클릭으로 삭제가 가능합니다.
 * - **Screen Reader**: 추가된 각 태그의 내용과 삭제 버튼의 역할을 음성으로 안내합니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 태그 입력 예시:
 *
 * ```tsx
 * <TagInput
 *   label="게시글 태그"
 *   maxTags={5}
 *   placeholder="태그 입력 후 Enter"
 *   value={['React', 'Next.js']}
 *   onChange={(tags) => console.log(tags)}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 커스텀 유효성 검사가 포함된 태그 입력:
 *
 * ```tsx
 * <TagInput
 *   validateTag={(tag) => {
 *     if (tag.length < 2) return "태그는 2글자 이상이어야 합니다.";
 *     return true;
 *   }}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 가로 배치 레이아웃:
 *
 * ```tsx
 * <TagInput
 *   label="키워드"
 *   required={true}
 *   labelLayout="horizontal"
 *   labelWidth="150px"
 *   placeholder="태그 입력 후 Enter"
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link TextInput}, 단순 텍스트 입력이 필요한 경우
 * - {@link Combobox}, 목록에서 검색하여 태그를 추가하고 싶은 경우
 */
export declare const TagInput: React.ForwardRefExoticComponent<TagInputProps & React.RefAttributes<HTMLDivElement>>;
export {};
