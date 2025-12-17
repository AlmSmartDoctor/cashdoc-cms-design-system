import { default as React } from 'react';
import { VariantProps } from 'class-variance-authority';

declare const textVariants: (props?: ({
    variant?: "h2" | "h3" | "body" | "caption" | "h1" | "subtitle" | "emphasis" | "price" | null | undefined;
    align?: "center" | "right" | "left" | null | undefined;
    decoration?: "none" | "underline" | "lineThrough" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
    as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";
    children: React.ReactNode;
}
export declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLElement>>;
export {};
