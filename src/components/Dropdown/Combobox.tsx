import { cn } from "@/utils/cn";
import { useState, forwardRef } from "react";
import { Dropdown, DropdownProps } from "./Dropdown";

export interface ComboboxProps extends Omit<DropdownProps, "searchable"> {
  loading?: boolean;
  createable?: boolean;
  onCreateOption?: (value: string) => void;
}

/**
 * 텍스트 입력과 드롭다운 선택 기능이 결합되어, 목록에서 검색하거나 새로운 옵션을 생성할 수 있는 컴포넌트입니다.
 *
 * {@link Combobox}는 사용자가 방대한 목록에서 원하는 항목을 빠르게 찾을 수 있도록 돕고,
 * 만약 찾는 항목이 없을 경우 즉석에서 새로운 값을 추가할 수 있는 유연성을 제공합니다.
 *
 * {@link Dropdown}의 확장 버전으로, 기본적으로 `searchable` 기능이 활성화되어 있습니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **대량 데이터 검색**: 옵션이 수백 개 이상이어서 단순 스크롤로는 찾기 어려운 경우
 * - **동적 옵션 추가**: 목록에 없는 값을 사용자가 직접 입력하여 데이터베이스에 추가해야 할 때 (예: 태그 입력, 신규 제조사 추가 등)
 * - **빠른 필터링**: 사용자가 정확한 명칭을 입력하여 필터링된 결과만 보고 싶어 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **옵션이 고정된 경우**: 새로운 값을 추가할 필요가 없고 옵션 개수가 적다면 일반 `Dropdown`이나 `Select`가 더 단순합니다.
 * - **자유 텍스트 입력**: 미리 정의된 옵션 없이 자유로운 입력을 받는 것이 주 목적이라면 `TextInput`을 사용하세요.
 *
 * ## Layout behavior
 *
 * - **Auto-filtering**: 사용자가 입력할 때마다 목록이 즉시 필터링되어 업데이트됩니다.
 * - **Create Option**: `createable` 설정 시, 검색 결과가 없을 경우 최하단에 '생성' 옵션이 나타납니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **로딩 상태 표시**: 대규모 데이터를 원격에서 가져오는 경우 `loading` 속성을 통해 사용자에게 진행 상황을 알리세요.
 * - **명확한 생성 문구**: 새로운 항목을 생성할 때 무엇이 생성되는지 사용자에게 명확히 전달하세요.
 * - **검색 최적화**: 대소문자 구분 없는 검색 등 사용자가 입력하기 편한 검색 환경을 제공하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **검색창 없는 콤보박스**: 콤보박스의 핵심은 검색입니다. 검색이 필요 없다면 일반 드롭다운을 사용하세요.
 * - **복잡한 생성 과정**: `onCreateOption`에서 너무 복잡한 로직을 처리하면 UI가 멈춘 것처럼 보일 수 있습니다. 비동기 처리 시 로딩 상태를 적절히 활용하세요.
 *
 * ## Accessibility
 *
 * - **Aria Roles**: `role="combobox"`를 사용하여 입력과 선택이 가능한 요소임을 스크린 리더에 알립니다.
 * - **Live Regions**: 필터링 결과의 개수 변화 등을 시각 장애 사용자에게 알릴 수 있도록 설계되었습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 새로운 옵션을 생성할 수 있는 콤보박스:
 *
 * ```tsx
 * <Combobox
 *   options={existingTags}
 *   createable={true}
 *   onCreateOption={(newTag) => {
 *     // 서버에 태그 추가 요청 후 목록 업데이트
 *     handleCreateTag(newTag);
 *   }}
 *   placeholder="태그를 검색하거나 새로 추가하세요"
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 데이터를 로딩 중인 콤보박스:
 *
 * ```tsx
 * <Combobox
 *   options={[]}
 *   loading={true}
 *   placeholder="데이터를 불러오는 중..."
 * />
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Dropdown}, 기본 검색/선택 기능이 필요한 경우
 * - {@link TagInput}, 여러 개의 값을 검색하여 추가해야 할 때
 * - {@link TextInput}, 단순한 텍스트 입력만 필요한 경우
 */
export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    { options, loading = false, createable = false, onCreateOption, ...props },
    ref,
  ) => {
    const [searchTerm] = useState("");

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const hasExactMatch = filteredOptions.some(
      (option) => option.label.toLowerCase() === searchTerm.toLowerCase(),
    );

    // 검색어가 있고 createable이며 정확히 일치하는 옵션이 없을 때 생성 옵션 추가
    const optionsWithCreate = [
      ...filteredOptions,
      ...(createable && searchTerm && !hasExactMatch
        ? [
            {
              value: `__create__${searchTerm}`,
              label: `"${searchTerm}" 생성`,
              disabled: false,
            },
          ]
        : []),
    ];

    return (
      <Dropdown
        ref={ref}
        {...props}
        options={optionsWithCreate}
        searchable={true}
        dropdownClassName={cn(loading && "opacity-75", props.dropdownClassName)}
        onValueChange={(value) => {
          if (value.startsWith("__create__")) {
            const createValue = value.replace("__create__", "");
            onCreateOption?.(createValue);
          } else {
            props.onValueChange?.(value);
          }
        }}
      />
    );
  },
);

Combobox.displayName = "Combobox";
