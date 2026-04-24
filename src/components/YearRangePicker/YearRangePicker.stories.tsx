import type { Meta, StoryObj } from "@storybook/react";
import { YearRangePicker } from "./YearRangePicker";
import type { DateRange } from "../DateRangePicker";
import { useState } from "react";

const meta: Meta<typeof YearRangePicker> = {
  title: "Forms/YearRangePicker",
  component: YearRangePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "사용자가 연도 단위로 기간을 선택할 수 있는 컴포넌트입니다. 두 개의 섹션(각 10년)으로 총 20년을 노출합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "선택된 기간 값입니다.",
      table: { type: { summary: "{ start: string; end: string }" } },
    },
    onChange: {
      description: "기간이 선택되거나 변경될 때 호출되는 콜백 함수입니다.",
      table: { type: { summary: "(range: DateRange) => void" } },
    },
    startLabel: {
      control: "text",
      description: "시작일 입력창 레이블입니다.",
      table: { type: { summary: "string" }, defaultValue: { summary: "시작일자" } },
    },
    endLabel: {
      control: "text",
      description: "종료일 입력창 레이블입니다.",
      table: { type: { summary: "string" }, defaultValue: { summary: "종료일자" } },
    },
    min: {
      control: "text",
      description: "선택 가능한 최소 날짜 (YYYY-MM-DD)입니다.",
      table: { type: { summary: "string" } },
    },
    max: {
      control: "text",
      description: "선택 가능한 최대 날짜 (YYYY-MM-DD)입니다.",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({ start: "", end: "" });
    return (
      <div className="w-150 p-4">
        <YearRangePicker value={range} onChange={setRange} />
      </div>
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({
      start: "2020-01-01",
      end: "2025-12-31",
    });
    return (
      <div className="w-150 p-4">
        <YearRangePicker value={range} onChange={setRange} />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  name: "With Min Max (2022-01-01 ~ 2026-03-13)",
  render: () => {
    const [range, setRange] = useState<DateRange>({ start: "", end: "" });
    return (
      <div className="w-150 p-4">
        <YearRangePicker
          value={range}
          onChange={setRange}
          min="2022-01-01"
          max="2026-03-13"
        />
      </div>
    );
  },
};
