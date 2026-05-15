import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ToggleButton } from "./ToggleButton";

const noop = () => undefined;

const meta: Meta<typeof ToggleButton> = {
  title: "Forms/ToggleButton",
  component: ToggleButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button과 동일한 박스 외형을 갖지만 클릭 시 눌림(pressed) 상태가" +
          " 유지되는 토글 버튼입니다. `aria-pressed`로 토글 시맨틱을 노출합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary"],
      description:
        "눌림 시 강조 색상. 'default'는 회색 톤, 'primary'는 브랜드 컬러.",
      table: {
        type: { summary: "default | primary" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Button의 'sm' / 'default' 사이즈와 동일한 높이입니다.",
      table: {
        type: { summary: "sm | md" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: "boolean",
      description: "true일 경우 상호작용이 비활성화됩니다.",
      table: { type: { summary: "boolean" } },
    },
    pressed: { table: { disable: true } },
    onPressedChange: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledToggleButton = (
  args: Omit<
    Parameters<typeof ToggleButton>[0],
    "pressed" | "onPressedChange" | "children"
  >,
) => {
  const [pressed, setPressed] = useState(false);
  return (
    <ToggleButton {...args} pressed={pressed} onPressedChange={setPressed}>
      {pressed ? "좋아요 취소" : "좋아요"}
    </ToggleButton>
  );
};

export const Default: Story = {
  render: (args) => <ControlledToggleButton {...args} />,
};

export const Primary: Story = {
  args: { variant: "primary" },
  render: (args) => <ControlledToggleButton {...args} />,
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => <ControlledToggleButton {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <ControlledToggleButton {...args} />,
};

export const Matrix: Story = {
  parameters: {
    layout: "padded",
    docs: {
      description: { story: "variant × size × pressed × disabled 매트릭스" },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <ToggleButton
          variant="default"
          size="md"
          pressed={false}
          onPressedChange={noop}
        >
          좋아요
        </ToggleButton>
        <ToggleButton
          variant="default"
          size="md"
          pressed
          onPressedChange={noop}
        >
          좋아요 취소
        </ToggleButton>
        <ToggleButton
          variant="default"
          size="sm"
          pressed={false}
          onPressedChange={noop}
        >
          팔로우
        </ToggleButton>
        <ToggleButton
          variant="default"
          size="sm"
          pressed
          onPressedChange={noop}
        >
          팔로잉
        </ToggleButton>
      </div>
      <div className="flex items-center gap-3">
        <ToggleButton
          variant="primary"
          size="md"
          pressed={false}
          onPressedChange={noop}
        >
          알림 받기
        </ToggleButton>
        <ToggleButton
          variant="primary"
          size="md"
          pressed
          onPressedChange={noop}
        >
          알림 받는 중
        </ToggleButton>
        <ToggleButton
          variant="primary"
          size="sm"
          pressed={false}
          onPressedChange={noop}
        >
          저장
        </ToggleButton>
        <ToggleButton
          variant="primary"
          size="sm"
          pressed
          onPressedChange={noop}
        >
          저장됨
        </ToggleButton>
      </div>
      <div className="flex items-center gap-3">
        <ToggleButton
          variant="default"
          size="md"
          pressed={false}
          onPressedChange={noop}
          disabled
        >
          비활성
        </ToggleButton>
        <ToggleButton
          variant="primary"
          size="md"
          pressed
          onPressedChange={noop}
          disabled
        >
          비활성(눌림)
        </ToggleButton>
      </div>
    </div>
  ),
};

export const ForJsdoc: Story = Matrix;
