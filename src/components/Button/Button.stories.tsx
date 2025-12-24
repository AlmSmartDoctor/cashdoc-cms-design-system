import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Cms Design System의 기본 버튼 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "link"],
      description:
        "버튼의 스타일 변형입니다. 페이지 내 버튼의 중요도와 맥락에 따라 선택하세요. default는 주요 액션, secondary는 보조 액션에 사용합니다.",
      table: {
        type: { summary: "default | secondary | outline | ghost | link" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description:
        "버튼의 크기입니다. 'icon'은 아이콘 전용 정사각형 버튼(10x10)에 사용합니다. 일반 버튼에는 default, sm, lg를 사용하세요.",
      table: {
        type: { summary: "default | sm | lg | icon" },
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "true일 경우 버튼을 비활성화합니다. 클릭할 수 없으며 시각적으로 흐리게 표시됩니다. 로딩 중이거나 조건이 충족되지 않았을 때 사용하세요.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      description:
        "버튼 내부에 표시될 콘텐츠입니다. 텍스트, 아이콘 또는 둘의 조합을 포함할 수 있습니다.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    onClick: {
      description:
        "사용자가 버튼을 클릭하거나 키보드의 Enter/Space로 활성화했을 때 실행되는 콜백 함수입니다.",
      table: {
        type: { summary: "(e: MouseEvent<HTMLButtonElement>) => void" },
      },
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description:
        "HTML button type입니다. 폼 제출 시 'submit', 일반 동작은 'button'을 사용하세요.",
      table: {
        type: { summary: "button | submit | reset" },
        defaultValue: { summary: "button" },
      },
    },
    className: {
      control: "text",
      description: "버튼에 추가할 커스텀 CSS 클래스입니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 버튼 변형을 한 번에 보여줍니다.",
      },
    },
  },
};
