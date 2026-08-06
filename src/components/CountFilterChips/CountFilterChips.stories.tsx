import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  CountFilterChips,
  type CountFilterChipsItem,
} from "./CountFilterChips";

type VisitType = "all" | "event" | "reservation" | "receipt";

const visitItems: CountFilterChipsItem<VisitType>[] = [
  { value: "all", label: "전체", count: 107 },
  { value: "event", label: "이벤트 내원", count: 73 },
  { value: "reservation", label: "접수/예약 내원", count: 0 },
  { value: "receipt", label: "영수증 인증", count: 34 },
];

const meta: Meta<typeof CountFilterChips> = {
  title: "Forms/CountFilterChips",
  component: CountFilterChips,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "라벨 + 카운트 뱃지를 가진 콤팩트한 가로 필터 chip 그룹.",
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
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
);

const Controlled = (props: {
  size: "sm" | "md" | "lg";
  items?: CountFilterChipsItem<VisitType>[];
}) => {
  const [v, setV] = useState<VisitType>("all");
  return (
    <CountFilterChips
      items={props.items ?? visitItems}
      value={v}
      onValueChange={setV}
      size={props.size}
      ariaLabel="내원 유형 필터"
    />
  );
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Row label="Size sm">
        <Controlled size="sm" />
      </Row>
      <Row label="Size md">
        <Controlled size="md" />
      </Row>
      <Row label="Size lg">
        <Controlled size="lg" />
      </Row>
      <Row label="Disabled">
        <Controlled
          size="md"
          items={[
            ...visitItems.slice(0, 2),
            {
              value: "reservation",
              label: "접수/예약 내원",
              count: 0,
              disabled: true,
            },
            visitItems[3],
          ]}
        />
      </Row>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
