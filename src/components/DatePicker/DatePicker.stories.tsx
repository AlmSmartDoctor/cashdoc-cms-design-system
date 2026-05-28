import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Forms/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "TextInput 기반의 단일 날짜 선택 컴포넌트. 캘린더 팝오버로 날짜를 선택합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    min: { control: "text" },
    max: { control: "text" },
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

const Controlled = (props: React.ComponentProps<typeof DatePicker>) => {
  const [v, setV] = useState(props.value ?? "");
  return <DatePicker {...props} value={v} onChange={setV} />;
};

export const Showcase: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5">
      <Section label="기본">
        <Controlled label="발송 일자" placeholder="YYYY-MM-DD" />
      </Section>
      <Section label="값 + helper">
        <Controlled
          label="시작일"
          value="2026-05-21"
          helperText="캠페인 시작 날짜를 선택하세요"
        />
      </Section>
      <Section label="에러">
        <Controlled
          label="발송 일자"
          value="2026-05-21"
          error
          errorMessage="과거 날짜는 선택할 수 없어요"
        />
      </Section>
      <Section label="비활성">
        <Controlled label="자동 발송일" value="2026-05-21" disabled />
      </Section>
      <Section label="min / max 제한">
        <Controlled
          label="이번 달 발송"
          min="2026-05-01"
          max="2026-05-31"
          helperText="2026년 5월만 선택할 수 있어요"
        />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
