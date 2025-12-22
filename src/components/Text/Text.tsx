import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textVariants = cva("cms-font-pretendard cms-text-black", {
  variants: {
    variant: {
      h1: "text-3xl font-bold",
      h2: "text-2xl font-semibold",
      h3: "text-lg font-semibold",
      subtitle: "text-base font-medium",
      body: "text-sm font-normal",
      emphasis: "text-sm font-semibold",
      caption: "text-xs font-normal",
      price: "text-xs font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    decoration: {
      underline: "underline",
      lineThrough: "line-through",
      none: "no-underline",
    },
  },
  defaultVariants: {
    variant: "body",
    align: "left",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";
  children: React.ReactNode;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      variant,
      align,
      decoration,
      as: Component = "p",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        className={cn(textVariants({ variant, align, decoration }), className)}
        ref={ref as any}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";
