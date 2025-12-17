import { VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

export declare const buttonVariants: (props?: ({
    variant?: "primary" | "default" | "secondary" | "outline" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}
declare const Button: import('react').ForwardRefExoticComponent<ButtonProps & import('react').RefAttributes<HTMLButtonElement>>;
export { Button };
