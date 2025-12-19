import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { DateRangePicker } from "./DateRangePicker";
import { useState } from "react";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cms Design System의 날짜 선택 컴포넌트입니다. TextInput을 기반으로 만들어졌으며, 단일 날짜 선택과 기간 선택을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "날짜 입력 필드 라벨",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    error: {
      control: "boolean",
      description: "에러 상태",
    },
    errorMessage: {
      control: "text",
      description: "에러 메시지",
    },
    helperText: {
      control: "text",
      description: "도움말 텍스트",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    min: {
      control: "text",
      description: "최소 선택 가능 날짜 (YYYY-MM-DD)",
    },
    max: {
      control: "text",
      description: "최대 선택 가능 날짜 (YYYY-MM-DD)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState("");
    return <DatePicker label="날짜 선택" value={date} onChange={setDate} />;
  },
};

export const NoLabel: Story = {
  render: () => {
    const [date, setDate] = useState("");
    return (
      <DatePicker placeholder="날짜를 선택하세요" value={date} onChange={setDate} />
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState("2025-12-31");
    return (
      <DatePicker label="예약 날짜" value={date} onChange={setDate} />
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [date, setDate] = useState("");
    return (
      <DatePicker
        label="시작일"
        value={date}
        onChange={setDate}
        helperText="오늘 이후 날짜만 선택 가능합니다"
      />
    );
  },
};

export const Error: Story = {
  render: () => {
    const [date, setDate] = useState("");
    return (
      <DatePicker
        label="날짜"
        value={date}
        onChange={setDate}
        error
        errorMessage="필수 입력 항목입니다"
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "날짜",
    value: "2025-01-01",
    disabled: true,
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [date, setDate] = useState("");
    return (
      <DatePicker
        label="예약 날짜"
        value={date}
        onChange={setDate}
        min="2025-01-01"
        max="2025-12-31"
        helperText="2025년도 내에서만 선택 가능합니다"
      />
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState("2025-12-17");
    return (
      <div className="cms-flex cms-flex-col cms-gap-4 cms-min-w-[400px]">
        <DatePicker
          label="날짜 선택"
          value={date}
          onChange={setDate}
          helperText={`선택된 날짜: ${date || "없음"}`}
        />
        <button
          onClick={() => setDate("")}
          className="cms-px-3 cms-py-2 cms-bg-gray-200 cms-rounded-sm"
        >
          날짜 초기화
        </button>
      </div>
    );
  },
};

// DateRangePicker Stories
export const RangeDefault: Story = {
  render: () => {
    return (
      <div className="cms-min-w-[600px] cms-p-8">
        <DateRangePicker />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "기간 선택 컴포넌트입니다. 시작일과 종료일을 선택할 수 있습니다. 클릭하면 달력이 나타나며, 빠른 선택 옵션을 제공합니다.",
      },
    },
  },
};

export const RangeWithValue: Story = {
  render: () => {
    return (
      <div className="cms-min-w-[600px] cms-p-8">
        <DateRangePicker
          value={{ start: "2025-01-01", end: "2025-12-31" }}
        />
      </div>
    );
  },
};

export const RangeControlled: Story = {
  render: () => {
    const [range, setRange] = useState({
      start: "2025-12-19",
      end: "2025-12-19",
    });

    return (
      <div className="cms-flex cms-flex-col cms-gap-4 cms-min-w-[600px] cms-p-8">
        <DateRangePicker
          value={range}
          onChange={setRange}
        />
        <div className="cms-text-sm cms-text-gray-600">
          선택된 기간: {range.start || "없음"} ~ {range.end || "없음"}
        </div>
        <button
          onClick={() => setRange({ start: "", end: "" })}
          className="cms-px-3 cms-py-2 cms-bg-gray-200 cms-rounded-sm cms-w-fit"
        >
          기간 초기화
        </button>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [date, setDate] = useState("2025-12-17");
    const [range, setRange] = useState({
      start: "2025-01-01",
      end: "2025-01-31",
    });

    return (
      <div className="cms-flex cms-flex-col cms-gap-6 cms-min-w-[600px]">
        <h3 className="cms-text-cms-xl cms-font-semibold">단일 날짜 선택</h3>

        <DatePicker label="기본 날짜 선택" />

        <DatePicker placeholder="라벨 없는 날짜 선택" />

        <DatePicker
          label="값이 있는 날짜"
          value={date}
          onChange={setDate}
        />

        <DatePicker
          label="도움말이 있는 날짜"
          helperText="오늘 이후 날짜만 선택 가능합니다"
        />

        <DatePicker
          label="에러 상태"
          error
          errorMessage="필수 입력 항목입니다"
        />

        <DatePicker
          label="비활성화 상태"
          value="2025-01-01"
          disabled
        />

        <div className="cms-border-t cms-pt-4 cms-mt-2">
          <h3 className="cms-text-cms-xl cms-font-semibold cms-mb-4">
            기간 선택
          </h3>

          <div className="cms-flex cms-flex-col cms-gap-4">
            <div>
              <p className="cms-text-sm cms-text-gray-600 cms-mb-2">
                기본 기간 선택
              </p>
              <DateRangePicker />
            </div>

            <div>
              <p className="cms-text-sm cms-text-gray-600 cms-mb-2">
                값이 있는 기간
              </p>
              <DateRangePicker value={range} onChange={setRange} />
            </div>

            <div>
              <p className="cms-text-sm cms-text-gray-600 cms-mb-2">
                커스텀 라벨
              </p>
              <DateRangePicker
                startLabel="체크인"
                endLabel="체크아웃"
                value={{ start: "2025-01-01", end: "2025-01-07" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "모든 DatePicker 상태를 한 번에 보여줍니다.",
      },
    },
  },
};
