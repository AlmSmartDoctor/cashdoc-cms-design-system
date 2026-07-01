import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { useEffect, useRef, useState } from "react";
import { SegmentedControls } from "./SegmentedControls";

const meta: Meta<typeof SegmentedControls> = {
  title: "Forms/SegmentedControls",
  component: SegmentedControls,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "여러 옵션 중 하나를 선택하거나 뷰를 전환할 때 사용하는 세그먼트 컨트롤입니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-4">
    <span className="w-24 shrink-0 text-[12px] font-medium text-cms-gray-550">
      {label}
    </span>
    <div className="flex flex-wrap items-center gap-4">{children}</div>
  </div>
);

const Controlled = <T extends string>({
  initial,
  options,
}: {
  initial: T;
  options: { label: string; value: T }[];
}) => {
  const [v, setV] = useState<T>(initial);
  return <SegmentedControls value={v} onChange={setV} options={options} />;
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Row label="Period">
        <Controlled
          initial="day"
          options={[
            { label: "일", value: "day" },
            { label: "주", value: "week" },
            { label: "월", value: "month" },
            { label: "분기", value: "quarter" },
          ]}
        />
      </Row>
      <Row label="View">
        <Controlled
          initial="list"
          options={[
            { label: "리스트", value: "list" },
            { label: "카드", value: "card" },
            { label: "차트", value: "chart" },
          ]}
        />
      </Row>
      <Row label="Two options">
        <Controlled
          initial="all"
          options={[
            { label: "전체", value: "all" },
            { label: "유료만", value: "paid" },
          ]}
        />
      </Row>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;

export const RefForwarding: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [tag, setTag] = useState("");
    const [view, setView] = useState<"map" | "list">("map");
    useEffect(() => setTag(ref.current?.tagName ?? "null"), []);
    return (
      <div className="flex flex-col gap-2">
        <SegmentedControls
          ref={ref}
          value={view}
          onChange={setView}
          options={[
            { label: "지도", value: "map" },
            { label: "목록", value: "list" },
          ]}
        />
        <span data-testid="ref-tag" className="text-xs">
          {tag}
        </span>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ref-tag")).toHaveTextContent("DIV");
  },
};
