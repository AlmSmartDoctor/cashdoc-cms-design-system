import type { Meta, StoryObj } from "@storybook/react";
import * as Icons from "./index";

const meta: Meta = {
  title: "Icons/Icons",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Lucide-react 기반으로 표준화된 아이콘 세트입니다. 모든 아이콘은 기본적으로 40x40 크기와 1.5px의 선 굵기를 가지며, text color를 통해 색상을 자유롭게 조절할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const AllIconsStory = () => {
  const IconSection = ({
    title,
    icons,
  }: {
    title: string;
    icons: [string, React.ComponentType<any>][];
  }) => (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-4 text-cms-gray-800 border-b pb-2">
        {title}
      </h3>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {icons.map(([name, Icon]) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 p-4 border border-cms-gray-200 rounded-lg hover:bg-cms-gray-50 transition-colors"
          >
            <Icon className="text-cms-black" />
            <p className="text-[10px] text-cms-gray-500 text-center font-mono leading-tight">
              {name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const iconEntries = Object.entries(Icons);

  const categories = {
    "Navigation & Layout": iconEntries.filter(
      ([name]) =>
        name.includes("Chevron") ||
        name.includes("Arrow") ||
        name.includes("Menu") ||
        name.includes("Align"),
    ),
    "Status & Feedback": iconEntries.filter(
      ([name]) =>
        name.includes("XIcon") ||
        name.includes("Check") ||
        name.includes("Info") ||
        name.includes("Error") ||
        name.includes("Warning") ||
        name.includes("Help"),
    ),
    Actions: iconEntries.filter(([name]) =>
      [
        "PlusIcon",
        "PlusCircleIcon",
        "TrashIcon",
        "SaveIcon",
        "RefreshIcon",
        "LinkIcon",
        "PinIcon",
        "CloseIcon",
        "SettingsIcon",
      ].includes(name),
    ),
    Communication: iconEntries.filter(([name]) => name.includes("Message")),
    "Files & Content": iconEntries.filter(
      ([name]) =>
        name.includes("File") ||
        name.includes("Excel") ||
        name.includes("Image") ||
        name.includes("Calendar"),
    ),
    "Brand & Custom": iconEntries.filter(
      ([name]) => name.includes("Medicash") || name.includes("Badge"),
    ),
  };

  return (
    <div className="p-4 w-full max-w-6xl">
      {Object.entries(categories).map(([title, icons]) => (
        <IconSection key={title} title={title} icons={icons as any} />
      ))}
    </div>
  );
};

export const AllIcons: Story = {
  render: () => <AllIconsStory />,
};

export const Colors: Story = {
  render: () => (
    <div className="flex gap-6">
      <Icons.CheckCircleIcon className="text-cms-green-500" />
      <Icons.ErrorIcon className="text-cms-red-500" />
      <Icons.InfoIcon className="text-cms-blue-500" />
      <Icons.WarningIcon className="text-cms-orange-500" />
      <Icons.MedicashIcon className="text-cms-pink-500" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Icons.ChevronRightIcon size={20} className="text-cms-gray-400" />
      <Icons.ChevronRightIcon size={40} className="text-cms-gray-600" />
      <Icons.ChevronRightIcon size={60} className="text-cms-gray-800" />
    </div>
  ),
};
