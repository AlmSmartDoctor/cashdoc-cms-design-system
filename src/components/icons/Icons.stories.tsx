import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRightIcon } from "./ChevronRightIcon";

const meta: Meta<typeof ChevronRightIcon> = {
  title: "Components/Icons",
  component: ChevronRightIcon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Cms Design System의 아이콘 컴포넌트들입니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ChevronRight: Story = {
  render: (args) => <ChevronRightIcon {...args} />,
};