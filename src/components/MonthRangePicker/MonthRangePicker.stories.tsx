import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { DateRange } from "../DateRangePicker";
import { MonthRangePicker } from "./MonthRangePicker";

const meta: Meta<typeof MonthRangePicker> = {
  title: "Forms/MonthRangePicker",
  component: MonthRangePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "월 단위로 기간을 선택하는 컴포넌트. 두 개의 연도 섹션(4×3 그리드)으로 구성됩니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
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

const Controlled = (props: React.ComponentProps<typeof MonthRangePicker>) => {
  const [range, setRange] = useState<DateRange>(
    props.value ?? { start: "", end: "" },
  );
  return <MonthRangePicker {...props} value={range} onChange={setRange} />;
};

export const Showcase: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <Section label="기본">
        <Controlled />
      </Section>
      <Section label="초기값 (2024-09 ~ 2025-03)">
        <Controlled value={{ start: "2024-09-01", end: "2025-03-31" }} />
      </Section>
      <Section label="min / max 제한">
        <Controlled min="2022-01-01" max="2026-03-13" />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
