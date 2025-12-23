import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onOpenChange,
      icon,
      title,
      children,
      footer,
      className,
      showCloseButton = true,
      size = "md",
    },
    ref,
  ) => {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              "fixed inset-0 z-50 bg-black/50",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            )}
          />
          <DialogPrimitive.Content
            ref={ref}
            className={cn(
              "fixed left-[50%] top-[50%] z-50",
              "translate-x-[-50%] translate-y-[-50%]",
              "w-full",
              sizeClasses[size],
              "bg-white rounded-lg shadow-lg",
              "p-6",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              className,
            )}
          >
            {showCloseButton && (
              <DialogPrimitive.Close
                className={cn(
                  "absolute right-4 top-4 rounded-sm opacity-70",
                  "transition-opacity hover:opacity-100",
                  "focus:outline-none focus:ring-2 focus:ring-cms-gray-400",
                  "disabled:pointer-events-none",
                )}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}

            {icon && <div className="flex justify-center mb-4">{icon}</div>}

            {title && (
              <DialogPrimitive.Title
                className={cn(
                  "text-lg font-bold text-cms-gray-900 mb-2",
                  "flex items-center justify-center",
                )}
              >
                {title}
              </DialogPrimitive.Title>
            )}

            <DialogPrimitive.Description className="text-sm text-cms-gray-700 text-center">
              {children}
            </DialogPrimitive.Description>

            {footer && <div className="mt-6">{footer}</div>}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  },
);

Modal.displayName = "Modal";
