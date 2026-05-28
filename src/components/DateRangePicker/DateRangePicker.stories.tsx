import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangePicker, type DateRange } from "./DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Forms/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "기간(시작·종료일) 선택 컴포넌트. 두 개의 연동된 달력과 빠른 선택(오늘, 이번주 등)을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    quickSelectMode: {
      control: "radio",
      options: ["past", "future"],
      table: { defaultValue: { summary: "past" } },
    },
    mondayStart: { control: "boolean" },
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

const Controlled = (props: React.ComponentProps<typeof DateRangePicker>) => {
  const [range, setRange] = useState<DateRange>(
    props.value ?? { start: "", end: "" },
  );
  return <DateRangePicker {...props} value={range} onChange={setRange} />;
};

export const Showcase: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <Section label="기본 (past)">
        <Controlled />
      </Section>
      <Section label="값 입력됨">
        <Controlled value={{ start: "2026-05-01", end: "2026-05-15" }} />
      </Section>
      <Section label="Future 모드">
        <Controlled quickSelectMode="future" />
      </Section>
      <Section label="Sunday start">
        <Controlled mondayStart={false} />
      </Section>
      <Section label="min/max 제한 (이번 달)">
        <Controlled min="2026-05-01" max="2026-05-31" />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
