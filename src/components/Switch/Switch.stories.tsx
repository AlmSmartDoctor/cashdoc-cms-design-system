import type { Meta, StoryObj } from "@storybook/react";
import { Switch, type SwitchProps } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
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
      description: "스위치가 'On' 상태일 때의 배경 색상을 설정합니다.",
      table: {
        type: { summary: "default | green | black | blue | red" },
        defaultValue: { summary: "default" },
      },
    },
    checked: {
      control: "boolean",
      description:
        "스위치의 현재 상태(On/Off)입니다. 제어 컴포넌트로 사용할 때 이 값을 통해 상태를 주입합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onCheckedChange: {
      description: "스위치 상태가 변경될 때 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(checked: boolean) => void" },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "true일 경우 사용자의 조작을 차단하고 시각적으로 흐리게 표시합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "스위치 요소에 추가할 커스텀 CSS 클래스입니다.",
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
    <label htmlFor={props.label} className="text-cms-sm min-w-12 capitalize">
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
      <h3 className="text-cms-md mt-4 font-semibold">체크 해제</h3>
      <div className="flex flex-wrap items-center gap-4">
        <LabeledSwitch variant="default" label="기본" checked={false} />
        <LabeledSwitch variant="green" label="초록" checked={false} />
        <LabeledSwitch variant="black" label="검정" checked={false} />
        <LabeledSwitch variant="blue" label="파랑" checked={false} />
        <LabeledSwitch variant="red" label="빨강" checked={false} />
      </div>
      <h3 className="text-cms-md mt-4 font-semibold">비활성화</h3>
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

export const ForJsdoc: Story = AllVariants;
