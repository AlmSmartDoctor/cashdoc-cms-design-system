import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { useState, useRef, useEffect, forwardRef, KeyboardEvent } from 'react';

export const dropdownTriggerVariants = cva(
  'flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-default text-foreground border border-grayscale02 hover:bg-grayscale01',
        outline:
          'border border-grayscale02 bg-transparent hover:bg-grayscale01',
        ghost: 'hover:bg-grayscale01 hover:text-foreground',
      },
      size: {
        sm: 'px-3 py-2 text-xs',
        default: 'px-4 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends VariantProps<
  typeof dropdownTriggerVariants
> {
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

const ChevronDownIcon = ({
  className,
  isOpen,
}: {
  className?: string;
  isOpen: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    className={cn(
      'transition-transform duration-200',
      isOpen && 'rotate-180',
      className
    )}
  >
    <path
      d="M8.75 0.75L4.57609 4.75L0.75 0.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ClearIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className={className}
  >
    <path
      d="M9 3L3 9M3 3L9 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      options,
      value,
      placeholder = '선택하세요',
      onValueChange,
      disabled = false,
      className,
      dropdownClassName,
      variant,
      size,
      searchable = false,
      clearable = false,
      multiple = false,
      maxHeight = 200,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValues, setSelectedValues] = useState<string[]>(
      multiple ? (value ? [value] : []) : []
    );

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const selectedOption = options.find((option) => option.value === value);
    const selectedLabel = multiple
      ? selectedValues.length > 0
        ? `${selectedValues.length}개 선택됨`
        : placeholder
      : selectedOption?.label || placeholder;

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSearchTerm('');
      }
    };

    const handleOptionClick = (option: DropdownOption) => {
      if (option.disabled) return;

      if (multiple) {
        const newSelectedValues = selectedValues.includes(option.value)
          ? selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value];

        setSelectedValues(newSelectedValues);
        onValueChange?.(newSelectedValues.join(','));
      } else {
        onValueChange?.(option.value);
        setIsOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiple) {
        setSelectedValues([]);
        onValueChange?.('');
      } else {
        onValueChange?.('');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    };

    // 외부 클릭 감지
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 드롭다운이 열릴 때 검색 입력창에 포커스
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    return (
      <div ref={dropdownRef} className="relative w-full">
        <button
          ref={ref}
          type="button"
          className={cn(
            dropdownTriggerVariants({ variant, size }),
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          {...props}
        >
          <span
            className={cn(
              'truncate flex-1 text-left',
              !selectedOption && !multiple && 'text-grayscale03'
            )}
          >
            {selectedLabel}
          </span>

          <div className="flex items-center gap-2 ml-3">
            {clearable && (value || selectedValues.length > 0) && (
              <button
                type="button"
                className="p-1 rounded text-grayscale03 hover:text-foreground transition-colors"
                onClick={handleClear}
                aria-label="선택 취소"
              >
                <ClearIcon className="w-3 h-3" />
              </button>
            )}
            <ChevronDownIcon
              isOpen={isOpen}
              className="w-4 h-4 text-grayscale03"
            />
          </div>
        </button>

        {isOpen && (
          <div
            className={cn(
              'absolute z-50 mt-1 w-full rounded-lg border border-grayscale02 bg-white shadow-lg py-1',
              dropdownClassName
            )}
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {searchable && (
              <div className="px-3 py-2 border-b border-grayscale02">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="검색..."
                  className="w-full px-2 py-1 text-sm border border-grayscale02 rounded outline-none focus:ring-1 focus:ring-foreground"
                />
              </div>
            )}

            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-grayscale03 text-center">
                  {searchTerm ? '검색 결과가 없습니다' : '옵션이 없습니다'}
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = multiple
                    ? selectedValues.includes(option.value)
                    : value === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={cn(
                        'w-full px-3 py-2 text-left text-sm transition-colors flex items-center justify-between gap-2',
                        option.disabled
                          ? 'text-grayscale03 cursor-not-allowed'
                          : 'text-foreground hover:bg-grayscale01 cursor-pointer',
                        isSelected && 'bg-grayscale02 font-medium'
                      )}
                      onClick={() => handleOptionClick(option)}
                      disabled={option.disabled}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="w-4 h-4 text-foreground flex-shrink-0"
                        >
                          <path
                            d="M13.5 4.5L6 12L2.5 8.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
