import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TimePicker } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "Forms/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "시간 선택 컴포넌트. 24시간/12시간(AM/PM) 형식을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    format: {
      control: "radio",
      options: ["24h", "12h"],
      table: { defaultValue: { summary: "24h" } },
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    minuteStep: { control: "number" },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Controlled = (props: React.ComponentProps<typeof TimePicker>) => {
  const [v, setV] = useState(props.value ?? "");
  return <TimePicker {...props} value={v} onChange={setV} />;
};

export const Showcase: Story = {
  render: () => <Controlled label="발송 시간" placeholder="HH:MM" />,
};

export const TwelveHourFormat: Story = {
  name: "12h 포맷",
  render: () => <Controlled label="발송 시간" value="2:30 PM" format="12h" />,
};

export const MinuteStep: Story = {
  name: "15분 단위",
  render: () => (
    <Controlled
      label="회의 시작"
      minuteStep={15}
      helperText="15분 단위로 선택할 수 있어요"
    />
  ),
};

export const Error: Story = {
  name: "에러",
  render: () => (
    <Controlled
      label="발송 시간"
      value="09:00"
      error
      errorMessage="22시 이후만 선택 가능합니다"
    />
  ),
};

export const Disabled: Story = {
  name: "비활성",
  render: () => <Controlled label="고정 시간" value="08:00" disabled />,
};

export const ForJsdoc: Story = Showcase;
