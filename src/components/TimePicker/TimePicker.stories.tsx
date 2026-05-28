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
};

export default meta;
type Story = StoryObj<typeof meta>;

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <span className="text-[12px] font-medium text-cms-gray-550">{label}</span>
    {children}
  </div>
);

const Controlled = (props: React.ComponentProps<typeof TimePicker>) => {
  const [v, setV] = useState(props.value ?? "");
  return <TimePicker {...props} value={v} onChange={setV} />;
};

export const Showcase: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5">
      <Section label="24h 기본">
        <Controlled label="발송 시간" placeholder="HH:MM" />
      </Section>
      <Section label="12h 포맷">
        <Controlled label="발송 시간" value="2:30 PM" format="12h" />
      </Section>
      <Section label="15분 단위">
        <Controlled
          label="회의 시작"
          minuteStep={15}
          helperText="15분 단위로 선택할 수 있어요"
        />
      </Section>
      <Section label="에러">
        <Controlled
          label="발송 시간"
          value="09:00"
          error
          errorMessage="22시 이후만 선택 가능합니다"
        />
      </Section>
      <Section label="비활성">
        <Controlled label="고정 시간" value="08:00" disabled />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
