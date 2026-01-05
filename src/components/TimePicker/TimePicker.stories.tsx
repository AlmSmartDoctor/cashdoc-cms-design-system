import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "./TimePicker";
import { Button } from "../Button";
import { useState } from "react";

const meta: Meta<typeof TimePicker> = {
  title: "Forms/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cms Design System의 시간 선택 컴포넌트입니다. 24시간 형식과 12시간(AM/PM) 형식을 지원하며, 직관적인 스크롤 인터페이스로 시간과 분을 선택할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description:
        "선택된 시간 값입니다. (24h format: HH:MM, 12h format: H:MM AM/PM)",
      table: {
        type: { summary: "string" },
      },
    },
    onChange: {
      description: "시간이 선택되거나 변경될 때 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(time: string) => void" },
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
        "시간이 선택되지 않았을 때 입력창에 표시될 힌트 텍스트입니다. 기본값은 'HH:MM'입니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "HH:MM" },
      },
    },
    format: {
      control: "radio",
      options: ["24h", "12h"],
      description:
        "시간 표시 형식을 지정합니다. '24h'는 0-23시 형식, '12h'는 1-12시 + AM/PM 형식입니다.",
      table: {
        type: { summary: "'24h' | '12h'" },
        defaultValue: { summary: "'24h'" },
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
    minuteStep: {
      control: "number",
      description:
        "분 선택 시 간격을 지정합니다. 예: 5로 설정하면 0, 5, 10, 15... 분만 선택 가능합니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
    showIcon: {
      control: "boolean",
      description: "true일 경우 입력창 오른쪽에 시계 아이콘을 표시합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
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
    const [time, setTime] = useState("");
    return (
      <TimePicker label="시간 선택 (24시간)" value={time} onChange={setTime} />
    );
  },
};

export const Format12Hour: Story = {
  render: () => {
    const [time, setTime] = useState("");
    return (
      <TimePicker
        label="시간 선택 (12시간)"
        format="12h"
        value={time}
        onChange={setTime}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "12시간 형식(AM/PM)으로 시간을 선택할 수 있습니다.",
      },
    },
  },
};

export const NoLabel: Story = {
  render: () => {
    const [time, setTime] = useState("");
    return (
      <TimePicker
        placeholder="시간을 선택하세요"
        value={time}
        onChange={setTime}
      />
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [time, setTime] = useState("14:30");
    return <TimePicker label="출근 시간" value={time} onChange={setTime} />;
  },
  parameters: {
    docs: {
      description: {
        story: "초기값이 설정된 TimePicker입니다.",
      },
    },
  },
};

export const WithValue12h: Story = {
  render: () => {
    const [time, setTime] = useState("2:30 PM");
    return (
      <TimePicker
        label="회의 시간"
        format="12h"
        value={time}
        onChange={setTime}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "12시간 형식으로 초기값이 설정된 TimePicker입니다.",
      },
    },
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [time, setTime] = useState("");
    return (
      <TimePicker
        label="업무 시작 시간"
        value={time}
        onChange={setTime}
        helperText="업무 시간은 9:00부터 18:00까지입니다"
      />
    );
  },
};

export const Error: Story = {
  render: () => {
    const [time, setTime] = useState("");
    return (
      <TimePicker
        label="시간"
        value={time}
        onChange={setTime}
        error={!time}
        errorMessage="필수 입력 항목입니다"
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "시간",
    value: "14:30",
    disabled: true,
  },
};

export const MinuteStep5: Story = {
  render: () => {
    const [time, setTime] = useState("");
    return (
      <TimePicker
        label="예약 시간 (5분 단위)"
        value={time}
        onChange={setTime}
        minuteStep={5}
        helperText="5분 단위로 선택 가능합니다"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "minuteStep을 5로 설정하여 5분 단위로만 시간을 선택할 수 있습니다. (00, 05, 10, 15...)",
      },
    },
  },
};

export const MinuteStep15: Story = {
  render: () => {
    const [time, setTime] = useState("");
    return (
      <TimePicker
        label="회의 시간 (15분 단위)"
        value={time}
        onChange={setTime}
        minuteStep={15}
        helperText="15분 단위로 선택 가능합니다"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "minuteStep을 15로 설정하여 15분 단위로만 시간을 선택할 수 있습니다. (00, 15, 30, 45)",
      },
    },
  },
};

export const NoIcon: Story = {
  render: () => {
    const [time, setTime] = useState("");
    return (
      <TimePicker
        label="시간 선택"
        value={time}
        onChange={setTime}
        showIcon={false}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "showIcon을 false로 설정하여 시계 아이콘을 숨길 수 있습니다.",
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [time, setTime] = useState("09:00");
    return (
      <div className="flex flex-col gap-4 min-w-[400px]">
        <TimePicker
          label="시간 선택"
          value={time}
          onChange={setTime}
          helperText={`선택된 시간: ${time || "없음"}`}
        />
        <div className="flex gap-2">
          <Button
            onClick={() => setTime("09:00")}
            variant="secondary"
            size="sm"
          >
            09:00 설정
          </Button>
          <Button
            onClick={() => setTime("14:30")}
            variant="secondary"
            size="sm"
          >
            14:30 설정
          </Button>
          <Button
            onClick={() => setTime("")}
            variant="secondary"
            size="sm"
          >
            초기화
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "프로그래밍 방식으로 시간을 제어할 수 있는 Controlled 컴포넌트 예시입니다.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6 min-w-[400px]">
        <div>
          <h3 className="text-sm font-semibold mb-2">24시간 형식</h3>
          <TimePicker label="기본" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">12시간 형식</h3>
          <TimePicker label="AM/PM" format="12h" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">값이 있는 상태</h3>
          <TimePicker label="출근 시간" value="09:00" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">헬퍼 텍스트</h3>
          <TimePicker label="업무 시간" helperText="업무 시간을 선택해주세요" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">에러 상태</h3>
          <TimePicker label="시간" error errorMessage="필수 입력입니다" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">비활성화</h3>
          <TimePicker label="시간" value="14:30" disabled />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">15분 단위</h3>
          <TimePicker label="예약 시간" minuteStep={15} />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">아이콘 없음</h3>
          <TimePicker label="시간" showIcon={false} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "TimePicker 컴포넌트의 모든 상태를 한눈에 볼 수 있습니다.",
      },
    },
  },
};
