import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "./BarChart";

const meta: Meta<typeof BarChart> = {
  title: "Charts/BarChart",
  component: BarChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "특정 데이터를 기간별로 비교·확인하기 위한 세로형 막대 차트 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "차트 좌측 상단에 표시될 타이틀입니다.",
      table: {
        type: { summary: "string" },
      },
    },
    chartData: {
      description:
        "차트에 표시할 데이터 목록입니다. `xLabel`은 x축(날짜/기간) 레이블, `value`는 막대의 수치 값입니다.",
      table: {
        type: {
          summary: "Array<{ xLabel: string; value: number }>",
        },
      },
    },
    unit: {
      control: { type: "number", min: 1, step: 1 },
      description: "y축 눈금선 단위 간격입니다. 데이터 범위에 맞게 설정하세요.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "50" },
      },
    },
    unitLabel: {
      control: "text",
      description:
        "y축 단위 레이블입니다. 예: '개', '원', '건'. 차트 우측 상단에 '(단위: xx)' 형태로 표시됩니다.",
      table: {
        type: { summary: "string" },
      },
    },
    chartHeight: {
      control: { type: "number", min: 100, step: 50 },
      description: "플롯 영역 높이(px)입니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "400" },
      },
    },
    className: {
      control: "text",
      description: "컴포넌트에 추가할 커스텀 CSS 클래스입니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseData = [
  { xLabel: "01/01", value: 120 },
  { xLabel: "01/02", value: 85 },
  { xLabel: "01/03", value: 60 },
  { xLabel: "01/04", value: 0 },
  { xLabel: "01/05", value: 100 },
  { xLabel: "01/06", value: 45 },
  { xLabel: "01/07", value: 75 },
  { xLabel: "01/08", value: 55 },
  { xLabel: "01/09", value: 98 },
  { xLabel: "01/10", value: 10 },
];

export const Default: Story = {
  args: {
    chartData: baseData,
  },
  tags: ["!dev"],
};

export const WithTitle: Story = {
  args: {
    chartData: baseData,
    title: "일별 처리 건수",
  },
  parameters: {
    docs: {
      description: {
        story: "title을 지정하면 차트 좌측 상단에 타이틀이 표시됩니다.",
      },
    },
  },
};

export const WithUnitLabel: Story = {
  args: {
    chartData: baseData,
    unitLabel: "건",
  },
  parameters: {
    docs: {
      description: {
        story:
          "unitLabel을 지정하면 차트 우측 상단에 '(단위: 건)' 형태로 표시됩니다.",
      },
    },
  },
};

export const CustomHeight: Story = {
  args: {
    chartData: baseData,
    chartHeight: 250,
    unitLabel: "건",
  },
  parameters: {
    docs: {
      description: {
        story: "chartHeight로 플롯 영역 높이를 변경할 수 있습니다.",
      },
    },
  },
};

export const LotsOfData: Story = {
  args: {
    chartData: [...baseData, ...baseData, ...baseData],
  },
  tags: ["!dev"],
};

export const ForJsdoc: Story = {
  ...Default,
  tags: ["!dev", "!autodocs"],
};
