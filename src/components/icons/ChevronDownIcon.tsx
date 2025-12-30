import { cn } from "@/utils/cn";

export interface ChevronDownIconProps {
  className?: string;
  isOpen?: boolean;
}

export const ChevronDownIcon = ({ className, isOpen }: ChevronDownIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="5"
    viewBox="0 0 8 5"
    fill="none"
    className={cn(
      "transition-transform duration-200",
      isOpen && "rotate-180",
      className
    )}
  >
    <path d="M4 5L0 0H8L4 5Z" fill="#000000" />
  </svg>
);
