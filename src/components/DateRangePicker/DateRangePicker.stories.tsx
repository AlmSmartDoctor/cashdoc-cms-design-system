import type { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker } from "./DateRangePicker";
import type { DateRange } from "./DateRangePicker";
import { useState } from "react";
import { cn } from "@/utils/cn";

const emptyRangeChangeHandler: (range: DateRange) => void = () => undefined;

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
    quickSelectMode: {
      control: "radio",
      options: ["past", "future"],
      description:
        "빠른 선택 옵션 모드. `past`(기본): 오늘/어제/이번주/이번달/7일(과거)/30일(과거)/지난주/지난달. `future`: 오늘/내일/이번주/이번달/7일(미래)/30일(미래)/다음주/다음달. 오늘·내일·다음주 옵션은 `future` 모드를 명시해야 표시됩니다.",
      table: {
        type: { summary: '"past" | "future"' },
        defaultValue: { summary: '"past"' },
      },
    },
    mondayStart: {
      control: "boolean",
      description:
        "이번주·지난주·다음주 빠른 선택의 주 시작 기준. true(기본)이면 월요일 시작(월~일), false이면 일요일 시작(일~토)으로 동작합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    min: {
      control: "text",
      description:
        "선택 가능한 최소 날짜 (YYYY-MM-DD). 미설정 시 1970-01-01부터 선택 가능합니다.",
      table: {
        type: { summary: "string" },
      },
    },
    max: {
      control: "text",
      description:
        "선택 가능한 최대 날짜 (YYYY-MM-DD). 미설정 시 2099-12-31까지 선택 가능합니다.",
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
      <div className="w-150 p-4">
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
      <div className="w-150 p-4">
        <DateRangePicker value={range} onChange={setRange} />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  name: "With Min Max (2022-01-01 ~ 2026-04-01)",
  render: () => {
    const [range, setRange] = useState({ start: "", end: "" });
    return (
      <div className="w-150 p-4">
        <DateRangePicker
          value={range}
          onChange={setRange}
          min="2022-01-01"
          max="2026-04-01"
        />
      </div>
    );
  },
};

export const FutureMode: Story = {
  name: "Future Mode (미래 모드)",
  render: () => {
    const [range, setRange] = useState({ start: "", end: "" });
    return (
      <div className="w-150 p-4">
        <DateRangePicker
          value={range}
          onChange={setRange}
          quickSelectMode="future"
        />
      </div>
    );
  },
};

export const SundayStart: Story = {
  name: "Sunday Start (일요일 시작 주)",
  render: () => {
    const [range, setRange] = useState({ start: "", end: "" });
    return (
      <div className="w-150 p-4">
        <DateRangePicker
          value={range}
          onChange={setRange}
          mondayStart={false}
        />
      </div>
    );
  },
};

export const CustomLabels: Story = {
  render: () => {
    const [range, setRange] = useState({ start: "", end: "" });
    return (
      <div className="w-150 p-4">
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
      <div className="flex w-150 flex-col gap-4 p-4">
        <DateRangePicker value={range} onChange={setRange} />
        <div className="rounded-sm border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700">
            실시간 데이터 상태:
          </p>
          <code className="mt-2 block text-xs">
            {JSON.stringify(range, null, 2)}
          </code>
        </div>
        <button
          onClick={() => setRange({ start: "", end: "" })}
          className={cn(
            "w-fit rounded-md bg-cms-gray-800 px-4 py-2",
            "text-sm text-white",
            "hover:bg-cms-gray-700",
          )}
        >
          기간 초기화
        </button>
      </div>
    );
  },
};

export const ForJsdoc: Story = {
  render: () => {
    const [range, setRange] = useState({
      start: "2025-01-01",
      end: "2025-01-07",
    });
    return (
      <div className="flex w-150 flex-col gap-6">
        <div>
          <h3 className="mb-2 font-bold">Default</h3>
          <DateRangePicker
            value={{ start: "", end: "" }}
            onChange={emptyRangeChangeHandler}
          />
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
            onChange={emptyRangeChangeHandler}
          />
        </div>
        <div>
          <h3 className="mb-2 font-bold">With Min/Max</h3>
          <DateRangePicker
            value={{ start: "", end: "" }}
            onChange={emptyRangeChangeHandler}
            min="2022-01-01"
            max="2026-04-01"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: { disable: true },
  },
};
