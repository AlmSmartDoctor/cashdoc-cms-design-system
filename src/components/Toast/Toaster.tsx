import { Toaster as Sonner } from "sonner";
import { type ComponentProps } from "react";

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ position = "bottom-center", ...props }: ToasterProps) => {
  return (
    <Sonner
      position={position}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast w-full flex items-center gap-3 p-4 rounded-cms-lg shadow-lg bg-cms-white text-cms-gray-900 !border !border-cms-blue-600 [&_[data-content]]:!flex-row [&_[data-content]]:!items-baseline",
          title:
            "group-[.toast]:text-cms-gray-900 group-[.toast]:font-bold group-[.toast]:text-sm group-[.toast]:mr-2 group-[.toast]:!font-bold",
          description:
            "group-[.toast]:text-cms-gray-500 group-[.toast]:text-xs group-[.toast]:font-medium",
          actionButton:
            "group-[.toast]:bg-cms-gray-900 group-[.toast]:text-cms-white",
          cancelButton:
            "group-[.toast]:bg-cms-gray-100 group-[.toast]:text-cms-gray-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
