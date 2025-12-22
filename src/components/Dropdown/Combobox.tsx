import { cn } from "@/utils/cn";
import { useState, forwardRef } from "react";
import { Dropdown, DropdownProps } from "./Dropdown";

export interface ComboboxProps extends Omit<DropdownProps, "searchable"> {
  loading?: boolean;
  createable?: boolean;
  onCreateOption?: (value: string) => void;
}

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
