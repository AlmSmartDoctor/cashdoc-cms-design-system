import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRightIcon } from "./ChevronRightIcon";

const meta: Meta<typeof ChevronRightIcon> = {
  title: "Components/Icons",
  component: ChevronRightIcon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "디자인 시스템에서 공통으로 사용되는 SVG 아이콘 컴포넌트들입니다. 모든 아이콘은 SVG 속성을 상속받아 크기(width, height)와 색상(color, fill)을 자유롭게 조절할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Tailwind CSS 클래스를 통해 크기와 색상을 조절할 때 사용합니다.",
      table: {
        type: { summary: "string" },
      },
    },
    stroke: {
      control: "color",
      description: "아이콘의 선 색상을 지정합니다.",
      table: {
        type: { summary: "string" },
      },
    },
    width: {
      control: "text",
      description: "아이콘의 너비를 설정합니다.",
      table: {
        type: { summary: "string | number" },
      },
    },
    height: {
      control: "text",
      description: "아이콘의 높이를 설정합니다.",
      table: {
        type: { summary: "string | number" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ChevronRight: Story = {
  render: (args) => <ChevronRightIcon {...args} />,
};