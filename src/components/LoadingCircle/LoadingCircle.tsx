import { cn } from "@/utils/cn";

interface LoadingCircleProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16",
};

export function LoadingCircle({ size = "lg", className }: LoadingCircleProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          sizeClasses[size],
          "animate-spin rounded-full border-2 border-cms-gray-500 border-b-transparent",
          className
        )}
      />
    </div>
  );
}
