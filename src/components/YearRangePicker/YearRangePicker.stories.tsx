import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { DateRange } from "../DateRangePicker";
import { YearRangePicker } from "./YearRangePicker";

const meta: Meta<typeof YearRangePicker> = {
  title: "Forms/YearRangePicker",
  component: YearRangePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "연도 단위 기간 선택 컴포넌트. 두 개의 섹션(각 10년)으로 총 20년을 노출합니다.",
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

const Controlled = (props: React.ComponentProps<typeof YearRangePicker>) => {
  const [range, setRange] = useState<DateRange>(
    props.value ?? { start: "", end: "" },
  );
  return <YearRangePicker {...props} value={range} onChange={setRange} />;
};

export const Showcase: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <Section label="기본">
        <Controlled />
      </Section>
      <Section label="초기값 (2020 ~ 2025)">
        <Controlled value={{ start: "2020-01-01", end: "2025-12-31" }} />
      </Section>
      <Section label="min / max 제한">
        <Controlled min="2022-01-01" max="2026-03-13" />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
