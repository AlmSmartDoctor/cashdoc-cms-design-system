import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { useState } from "react";

const meta: Meta<typeof DatePicker> = {
  title: "Forms/DatePicker",
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
    value: {
      control: "text",
      description: "선택된 날짜 값입니다. (format: YYYY-MM-DD)",
      table: {
        type: { summary: "string" },
      },
    },
    onChange: {
      description: "날짜가 선택되거나 변경될 때 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(date: string) => void" },
      },
    },
    label: {
      control: "text",
      description: "입력 필드 위에 표시될 레이블 텍스트입니다.",
      table: {
        type: { summary: "string" },
      },
    },
    placeholder: {
      control: "text",
      description:
        "날짜가 선택되지 않았을 때 입력창에 표시될 힌트 텍스트입니다. 기본값은 'YYYY-MM-DD'입니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "YYYY-MM-DD" },
      },
    },
    min: {
      control: "text",
      description:
        "선택 가능한 최소 날짜를 지정합니다. (format: YYYY-MM-DD) 이 날짜 이전은 비활성화됩니다.",
      table: {
        type: { summary: "string" },
      },
    },
    max: {
      control: "text",
      description:
        "선택 가능한 최대 날짜를 지정합니다. (format: YYYY-MM-DD) 이 날짜 이후는 비활성화됩니다.",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: "boolean",
      description: "true일 경우 입력을 비활성화합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    error: {
      control: "boolean",
      description: "true일 경우 에러 상태의 스타일을 적용합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    errorMessage: {
      control: "text",
      description: "에러 상태일 때 하단에 표시될 메시지입니다.",
      table: {
        type: { summary: "string" },
      },
    },
    helperText: {
      control: "text",
      description: "입력창 하단에 표시될 도움말 텍스트입니다.",
      table: {
        type: { summary: "string" },
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
    const [date, setDate] = useState("");
    return <DatePicker label="날짜 선택" value={date} onChange={setDate} />;
  },
};

export const NoLabel: Story = {
  render: () => {
    const [date, setDate] = useState("");
    return (
      <DatePicker
        placeholder="날짜를 선택하세요"
        value={date}
        onChange={setDate}
      />
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState("2025-12-31");
    return <DatePicker label="예약 날짜" value={date} onChange={setDate} />;
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
