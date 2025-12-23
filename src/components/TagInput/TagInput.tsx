import React, { useState, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const tagInputContainerVariants = cva(
  cn(
    "flex items-center gap-2 p-2 border border-solid rounded-cms-sm",
    "min-h-[40px] w-full transition-colors duration-200",
  ),
  {
    variants: {
      readOnly: {
        true: cn("bg-cms-gray-150 cursor-default", "border-cms-gray-450"),
        false: cn(
          "bg-cms-white cursor-text",
          "border-cms-gray-450",
          "hover:border-cms-gray-800",
          "focus-within:border-cms-gray-800",
        ),
      },
      layout: {
        row: "flex-row flex-wrap",
        column: "flex-col items-stretch",
      },
    },
    defaultVariants: {
      readOnly: false,
      layout: "row",
    },
  },
);

const tagVariants = cva(
  cn(
    "inline-flex items-center gap-2 px-3 py-1",
    "bg-cms-primary-100 border border-solid border-cms-primary-200",
    "rounded-cms-2xl text-cms-black text-xs font-semibold",
  ),
);

const removeButtonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "w-[18px] h-[18px] p-0 border-none",
    "bg-cms-gray-300 text-cms-gray-700",
    "text-xs leading-none cursor-pointer rounded-full",
    "transition-all duration-200",
    "hover:bg-cms-gray-400 hover:text-cms-black",
  ),
);

const inputVariants = cva(
  cn(
    "flex-1 min-w-[120px] outline-none border-none",
    "text-xs p-1.5",
    "placeholder:text-cms-gray-500",
    "disabled:bg-transparent disabled:cursor-not-allowed",
  ),
);

const labelVariants = cva("block text-xs font-medium text-cms-black mb-2");

const helperTextVariants = cva(
  "flex items-center gap-1 text-xs text-cms-gray-700 mt-1",
);

const tagCountVariants = cva("text-xs text-cms-gray-750 font-bold");

export interface TagInputProps extends Omit<
  VariantProps<typeof tagInputContainerVariants>,
  "readOnly"
> {
  label?: string;
  required?: boolean;
  maxTags?: number;
  placeholder?: string;
  value?: string[];
  onChange?: (tags: string[]) => void;
  readOnly?: boolean;
  noLimit?: boolean;
  validateTag?: (
    tag: string,
    currentTags: string[],
  ) => boolean | string | undefined;
  className?: string;
  id?: string;
}

export const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      label,
      required = false,
      maxTags = 2,
      placeholder = "태그를 입력하세요",
      value = [],
      onChange,
      readOnly = false,
      layout = "row",
      noLimit = false,
      validateTag,
      className,
      id,
    },
    ref,
  ) => {
    const [tags, setTags] = useState<string[]>(value);
    const [inputValue, setInputValue] = useState("");
    const [isComposing, setIsComposing] = useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const inputId =
      id || `tag-input-${Math.random().toString(36).substr(2, 9)}`;

    useEffect(() => {
      setTags(value);
    }, [value]);

    const handleCompositionStart = () => {
      setIsComposing(true);
    };

    const handleCompositionEnd = () => {
      setIsComposing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isComposing && inputValue.trim()) {
        e.preventDefault();
        const newTag = inputValue.trim();

        if (!noLimit && tags.length >= maxTags) {
          alert(`최대 ${maxTags}개까지만 추가할 수 있습니다.`);
          return;
        }

        if (tags.includes(newTag)) {
          alert("이미 존재하는 태그입니다.");
          return;
        }

        if (validateTag) {
          const validationResult = validateTag(newTag, tags);
          if (typeof validationResult === "string") {
            alert(validationResult);
            return;
          }
          if (validationResult === false) {
            return;
          }
        }

        const newTags = [...tags, newTag];
        setTags(newTags);
        setInputValue("");
        onChange?.(newTags);
      }
    };

    const removeTag = (indexToRemove: number) => {
      const newTags = tags.filter((_, index) => index !== indexToRemove);
      setTags(newTags);
      onChange?.(newTags);
    };

    const handleContainerClick = () => {
      if (!readOnly && inputRef.current) {
        inputRef.current.focus();
      }
    };

    const isInputDisabled = readOnly || (!noLimit && tags.length >= maxTags);

    return (
      <div className={cn("w-full", className)} ref={ref}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              labelVariants(),
              required &&
                "after:content-['*'] after:ml-1 after:text-cms-red-400",
            )}
          >
            {label}
          </label>
        )}
        <div
          className={tagInputContainerVariants({ readOnly, layout })}
          onClick={handleContainerClick}
        >
          {tags.map((tag, index) => (
            <div
              key={`${tag}-${index}`}
              className="inline-flex items-center gap-2"
            >
              <span className={tagVariants()}>{tag}</span>
              {!readOnly && (
                <button
                  type="button"
                  className={removeButtonVariants()}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(index);
                  }}
                  aria-label={`${tag} 제거`}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <input
            id={inputId}
            ref={inputRef}
            type="text"
            className={inputVariants()}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder={tags.length === 0 ? placeholder : ""}
            disabled={isInputDisabled}
          />
        </div>
        {!noLimit && (
          <div className={helperTextVariants()}>
            최대 {maxTags}개 까지 선택할 수 있습니다.
            <span className={tagCountVariants()}>
              ({tags.length} / {maxTags})
            </span>
          </div>
        )}
      </div>
    );
  },
);

TagInput.displayName = "TagInput";
