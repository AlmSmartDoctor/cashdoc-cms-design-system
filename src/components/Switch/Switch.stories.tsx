import type { Meta, StoryObj } from "@storybook/react";
import { Switch, type SwitchProps } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Cms Design System의 스위치 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "green", "black", "blue", "red"],
      description: "스위치 색상 변형",
    },
    checked: {
      control: "boolean",
      description: "체크 상태",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Green: Story = {
  args: {
    variant: "green",
    checked: true,
  },
};

export const Black: Story = {
  args: {
    variant: "black",
    checked: true,
  },
};

export const Blue: Story = {
  args: {
    variant: "blue",
    checked: true,
  },
};

export const Red: Story = {
  args: {
    variant: "red",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

const LabeledSwitch = (props: SwitchProps & { label: string }) => (
  <div className="flex items-center space-x-2">
    <Switch {...props} id={props.label} />
    <label
      htmlFor={props.label}
      className="text-cms-sm capitalize min-w-[50px]"
    >
      {props.label}
    </label>
  </div>
);

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-cms-md font-semibold">체크</h3>
      <div className="flex flex-wrap items-center gap-4">
        <LabeledSwitch variant="default" label="기본" checked />
        <LabeledSwitch variant="green" label="초록" checked />
        <LabeledSwitch variant="black" label="검정" checked />
        <LabeledSwitch variant="blue" label="파랑" checked />
        <LabeledSwitch variant="red" label="빨강" checked />
      </div>
      <h3 className="text-cms-md font-semibold mt-4">체크 해제</h3>
      <div className="flex flex-wrap items-center gap-4">
        <LabeledSwitch variant="default" label="기본" checked={false} />
        <LabeledSwitch variant="green" label="초록" checked={false} />
        <LabeledSwitch variant="black" label="검정" checked={false} />
        <LabeledSwitch variant="blue" label="파랑" checked={false} />
        <LabeledSwitch variant="red" label="빨강" checked={false} />
      </div>
      <h3 className="text-cms-md font-semibold mt-4">비활성화</h3>
      <div className="flex flex-wrap items-center gap-4">
        <LabeledSwitch variant="default" label="체크 해제" disabled />
        <LabeledSwitch variant="default" label="체크" disabled checked />
      </div>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story: "모든 스위치 변형을 한 번에 보여줍니다.",
      },
    },
  },
};
