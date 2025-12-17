import { cn } from '@/utils/cn';
import { forwardRef } from 'react';
import { Dropdown, DropdownProps } from './Dropdown';

export interface SelectProps extends Omit<
  DropdownProps,
  'multiple' | 'searchable' | 'clearable'
> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ label, helperText, error, required, className, ...props }, ref) => {
    return (
      <div className={cn('space-y-1', className)}>
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <Dropdown
          ref={ref}
          {...props}
          className={cn(error && 'border-red-500 focus:ring-red-500')}
        />

        {(helperText || error) && (
          <p
            className={cn(
              'text-xs',
              error ? 'text-red-500' : 'text-grayscale03'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
