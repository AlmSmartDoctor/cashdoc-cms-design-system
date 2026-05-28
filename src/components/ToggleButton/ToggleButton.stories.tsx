import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ToggleButton } from "./ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  title: "Forms/ToggleButton",
  component: ToggleButton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Button과 동일한 박스 외형을 갖지만 클릭 시 pressed 상태가 유지되는 토글 버튼입니다. aria-pressed로 토글 시맨틱을 노출합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary"],
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      table: { defaultValue: { summary: "md" } },
    },
    disabled: { control: "boolean" },
    pressed: { table: { disable: true } },
    onPressedChange: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-4">
    <span className="w-24 shrink-0 text-[12px] font-medium text-cms-gray-550">
      {label}
    </span>
    <div className="flex flex-wrap items-center gap-2">{children}</div>
  </div>
);

const Controlled = ({
  variant,
  size,
  disabled,
  initial = false,
  children,
}: {
  variant?: "default" | "primary";
  size?: "sm" | "md";
  disabled?: boolean;
  initial?: boolean;
  children: React.ReactNode;
}) => {
  const [pressed, setPressed] = useState(initial);
  return (
    <ToggleButton
      variant={variant}
      size={size}
      disabled={disabled}
      pressed={pressed}
      onPressedChange={setPressed}
    >
      {children}
    </ToggleButton>
  );
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Row label="Variant">
        <Controlled initial>Default · ON</Controlled>
        <Controlled>Default · OFF</Controlled>
        <Controlled variant="primary" initial>
          Primary · ON
        </Controlled>
        <Controlled variant="primary">Primary · OFF</Controlled>
      </Row>
      <Row label="Size">
        <Controlled size="sm" initial>
          Small · ON
        </Controlled>
        <Controlled size="sm">Small · OFF</Controlled>
        <Controlled size="md" initial>
          Medium · ON
        </Controlled>
        <Controlled size="md">Medium · OFF</Controlled>
      </Row>
      <Row label="Disabled">
        <Controlled disabled>OFF disabled</Controlled>
        <Controlled disabled initial>
          ON disabled
        </Controlled>
      </Row>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
