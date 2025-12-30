import { cn } from "@/utils/cn";

export interface FileIconProps {
  className?: string;
  type: string;
}

export const FileIcon = ({ className, type }: FileIconProps) => {
  const getColor = () => {
    if (type.includes("pdf")) return "text-cms-red-500";
    if (type.includes("word") || type.includes("document")) return "text-cms-blue-500";
    if (type.includes("excel") || type.includes("sheet")) return "text-cms-green-500";
    if (type.includes("zip") || type.includes("compressed")) return "text-cms-orange-500";
    if (type.includes("image")) return "text-cms-pink-500";
    return "text-cms-gray-500";
  };

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(getColor(), className)}
    >
      <path
        d="M22.5 5H10C8.89543 5 8 5.89543 8 7V33C8 34.1046 8.89543 35 10 35H30C31.1046 35 32 34.1046 32 33V14.5L22.5 5Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 5V15H32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
