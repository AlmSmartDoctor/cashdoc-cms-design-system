import type { Meta, StoryObj } from "@storybook/react";
import { LoadingCircle } from "./LoadingCircle";

const meta: Meta<typeof LoadingCircle> = {
  title: "Loading/LoadingCircle",
  component: LoadingCircle,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "로딩 상태를 나타내는 스피너 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "lg" } },
    },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Cell = ({
  size,
  label,
}: {
  size: "sm" | "md" | "lg";
  label: string;
}) => (
  <div className="flex flex-col items-center gap-2">
    <LoadingCircle size={size} />
    <span className="text-[12px] text-cms-gray-550">{label}</span>
  </div>
);

export const Showcase: Story = {
  render: () => (
    <div className="flex items-center gap-10">
      <Cell size="sm" label="sm · 16" />
      <Cell size="md" label="md · 24" />
      <Cell size="lg" label="lg · 36" />
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
