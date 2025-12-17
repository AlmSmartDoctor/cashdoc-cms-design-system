import { default as React } from 'react';
import { VariantProps } from 'class-variance-authority';

declare const textInputVariants: (props?: ({
    variant?: "default" | "error" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof textInputVariants> {
    label?: string;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    showCharCount?: boolean;
}
export declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;
export {};
