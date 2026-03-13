import { cn } from "@/utils/cn";

type Option<T extends string | number> = {
  label: string;
  value: T;
};

type SegmentedControlsProps<T extends string | number> = {
  options: Option<T>[];
  value: string | number;
  onChange: (value: T) => void;
  className?: string;
};

const SegmentedControls = <T extends string | number>({
  options,
  value,
  onChange,
  className = "",
}: SegmentedControlsProps<T>) => {
  return (
    <div
      className={cn(
        "my-3 flex overflow-hidden rounded-lg",
        "border border-gray-300",
        className,
      )}
    >
      {options.map((option, index) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 py-2.5 text-sm transition-all duration-150 ease-in-out",
              "border border-transparent",
              "outline-none",
              "hover:opacity-90",
              "cursor-pointer",
              isActive ?
                "border-r-[#222] bg-[#222] font-semibold text-white"
              : "bg-gray-100 font-normal text-[#666]",
              index !== options.length - 1 && !isActive ?
                "border-r-gray-300"
              : "",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControls;
