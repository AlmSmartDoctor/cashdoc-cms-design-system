"use client";

import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const popoverMenuItemVariants = cva(
  cn(
    "flex w-full items-center gap-3 rounded-md px-3 py-2",
    "text-sm font-medium transition-colors",
    "hover:bg-cms-gray-200 active:bg-cms-gray-300",
    "disabled:pointer-events-none disabled:opacity-50",
  ),
  {
    variants: {
      variant: {
        default: "text-cms-foreground",
        destructive: "text-cms-red-400 hover:text-cms-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface PopoverMenuItemProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof popoverMenuItemVariants> {
  icon?: React.ReactNode;
}

/**
 * Popover 내부에 배치되는 개별 액션 항목 컴포넌트입니다.
 *
 * {@link PopoverMenuItem}은 아이콘과 텍스트가 결합된 형태의 메뉴 버튼으로,
 * 일관된 패딩, 폰트, 호버 효과를 제공합니다.
 *
 * ## Example
 *
 * ```tsx
 * <PopoverContent>
 *   <div className="flex flex-col gap-1">
 *     <PopoverMenuItem icon={<EditIcon />} onClick={handleEdit}>
 *       수정하기
 *     </PopoverMenuItem>
 *     <PopoverMenuItem
 *       variant="destructive"
 *       icon={<TrashIcon />}
 *       onClick={handleDelete}
 *     >
 *       삭제하기
 *     </PopoverMenuItem>
 *   </div>
 * </PopoverContent>
 * ```
 */
const PopoverMenuItem = forwardRef<HTMLButtonElement, PopoverMenuItemProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(popoverMenuItemVariants({ variant }), className)}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  },
);

PopoverMenuItem.displayName = "PopoverMenuItem";

export { PopoverMenuItem, popoverMenuItemVariants };
