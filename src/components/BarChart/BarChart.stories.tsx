import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart } from "./BarChart";

const meta: Meta<typeof BarChart> = {
  title: "Charts/BarChart",
  component: BarChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "특정 데이터를 기간별로 비교·확인하기 위한 세로형 막대 차트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    unitLabel: { control: "text" },
    unit: { control: { type: "number", min: 1, step: 1 } },
    chartHeight: { control: { type: "number", min: 100, step: 50 } },
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

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Section label="기본">
        <BarChart chartData={baseData} />
      </Section>
      <Section label="Title + unit label">
        <BarChart chartData={baseData} title="일별 처리 건수" unitLabel="건" />
      </Section>
      <Section label="작은 높이 (250)">
        <BarChart chartData={baseData} unitLabel="건" chartHeight={250} />
      </Section>
      <Section label="많은 데이터 (30개)">
        <BarChart
          chartData={[...baseData, ...baseData, ...baseData]}
          unitLabel="건"
        />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
