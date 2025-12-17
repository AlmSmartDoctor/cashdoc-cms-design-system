import type { Meta, StoryObj } from "@storybook/react";
import { Switch, type SwitchProps } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "green", "black", "blue", "red"],
      description: "The color variant of the switch.",
    },
    checked: {
      control: "boolean",
      description: "The controlled state of the switch.",
    },
    disabled: {
      control: "boolean",
      description: "Prevents user interaction with the switch.",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
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
  },
};
