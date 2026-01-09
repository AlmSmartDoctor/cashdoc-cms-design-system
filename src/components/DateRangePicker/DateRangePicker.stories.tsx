import type { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker } from "./DateRangePicker";
import { useState } from "react";

const meta: Meta<typeof DateRangePicker> = {
  title: "Forms/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "사용자가 특정 기간(시작일과 종료일)을 선택할 수 있게 하는 컴포넌트입니다. 두 개의 연동된 달력과 빠른 선택(오늘, 이번주 등) 기능을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "선택된 기간 값입니다. start와 end 문자열을 포함합니다.",
      table: {
        type: { summary: "{ start: string; end: string }" },
      },
    },
    onChange: {
      description: "기간이 선택되거나 변경될 때 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(range: { start: string; end: string }) => void" },
      },
    },
    startLabel: {
      control: "text",
      description: "시작일 입력창 내부에 표시될 레이블 텍스트입니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "시작일자" },
      },
    },
    endLabel: {
      control: "text",
      description: "종료일 입력창 내부에 표시될 레이블 텍스트입니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "종료일자" },
      },
    },
    className: {
      control: "text",
      description: "컨테이너에 추가할 커스텀 CSS 클래스입니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [range, setRange] = useState({ start: "", end: "" });
    return (
      <div className="w-[600px] p-4">
        <DateRangePicker value={range} onChange={setRange} />
      </div>
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [range, setRange] = useState({
      start: "2025-01-01",
      end: "2025-01-07",
    });
    return (
      <div className="w-[600px] p-4">
        <DateRangePicker value={range} onChange={setRange} />
      </div>
    );
  },
};

export const CustomLabels: Story = {
  render: () => {
    const [range, setRange] = useState({ start: "", end: "" });
    return (
      <div className="w-[600px] p-4">
        <DateRangePicker
          startLabel="등록일"
          endLabel="마감일"
          value={range}
          onChange={setRange}
        />
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [range, setRange] = useState({
      start: "2025-12-24",
      end: "2025-12-31",
    });

    return (
      <div className="flex flex-col gap-4 w-[600px] p-4">
        <DateRangePicker value={range} onChange={setRange} />
        <div className="p-4 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm font-medium text-gray-700">실시간 데이터 상태:</p>
          <code className="text-xs block mt-2">
            {JSON.stringify(range, null, 2)}
          </code>
        </div>
        <button
          onClick={() => setRange({ start: "", end: "" })}
          className="px-4 py-2 bg-cms-gray-800 text-white rounded-md text-sm w-fit hover:bg-cms-gray-700"
        >
          기간 초기화
        </button>
      </div>
    );
  },
};

export const ForJsdoc: Story = {
  render: () => {
    const [range, setRange] = useState({ start: "2025-01-01", end: "2025-01-07" });
    return (
      <div className="flex flex-col gap-6 w-[600px]">
        <div>
          <h3 className="mb-2 font-bold">Default</h3>
          <DateRangePicker value={{ start: "", end: "" }} onChange={() => {}} />
        </div>
        <div>
          <h3 className="mb-2 font-bold">With Value</h3>
          <DateRangePicker value={range} onChange={setRange} />
        </div>
        <div>
          <h3 className="mb-2 font-bold">Custom Labels</h3>
          <DateRangePicker
            startLabel="From"
            endLabel="To"
            value={{ start: "", end: "" }}
            onChange={() => {}}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: { disable: true },
  },
};
