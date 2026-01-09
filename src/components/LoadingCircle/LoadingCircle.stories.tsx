import type { Meta, StoryObj } from '@storybook/react';
import { LoadingCircle } from './LoadingCircle';

const meta: Meta<typeof LoadingCircle> = {
  title: 'Loading/LoadingCircle',
  component: LoadingCircle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '로딩 상태를 나타내는 스피너 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "로딩 스피너의 크기입니다. sm은 버튼 내부, md는 카드 내부, lg는 페이지 전체 로딩 등에 적합합니다.",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "lg" },
      },
    },
    className: {
      control: "text",
      description: "추가적인 스타일링을 위한 커스텀 CSS 클래스입니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <LoadingCircle size="sm" />
        <span className="text-sm">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingCircle size="md" />
        <span className="text-sm">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingCircle size="lg" />
        <span className="text-sm">Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 크기의 로딩 스피너를 보여줍니다.',
      },
    },
  },
};

export const ForJsdoc: Story = AllSizes;
