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
    "rounded-cms-2xl text-cms-black text-md font-semibold",
  ),
);

const removeButtonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "w-[18px] h-[18px] p-0 border-none",
    "bg-cms-gray-300 text-cms-gray-700",
    "text-md leading-none cursor-pointer rounded-full",
    "transition-all duration-200",
    "hover:bg-cms-gray-400 hover:text-cms-black",
  ),
);

const inputVariants = cva(
  cn(
    "flex-1 min-w-[120px] outline-none border-none",
    "text-md p-1.5",
    "placeholder:text-cms-gray-500",
    "disabled:bg-transparent disabled:cursor-not-allowed",
  ),
);

const labelVariants = cva("block text-md font-medium text-cms-black mb-2");

const helperTextVariants = cva(
  "flex items-center gap-1 text-sm text-cms-gray-700 mt-1",
);

const tagCountVariants = cva("text-sm text-cms-gray-750 font-bold");

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
 * - {@link Combobox}, 목록에서 검색하여 태그를 추가하고 싶은 경우 *
 * ## 참고사진
 * ![](https://github.com/AlmSmartDoctor/ccds-screenshots/blob/main/screenshots/Forms/TagInput/All States.png?raw=true)
 */
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
      labelLayout = "vertical",
      labelWidth = "120px",
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
    const isHorizontal = labelLayout === "horizontal";

    return (
      <div className={cn("w-full", className)} ref={ref}>
        {isHorizontal && label ? (
          <div className="flex items-start gap-3">
            <label
              htmlFor={inputId}
              className={cn(labelVariants(), "mb-0 shrink-0")}
              style={{ width: labelWidth }}
            >
              {label}
              {required && <span className="text-cms-red-400 ml-1">*</span>}
            </label>
            <div className="flex-1">
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
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    );
  },
);

TagInput.displayName = "TagInput";
