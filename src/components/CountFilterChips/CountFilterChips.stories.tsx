import type { Meta, StoryObj } from "@storybook/react";
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
        component:
          "라벨 + 카운트 뱃지를 가진 콤팩트한 가로 필터 chip 그룹.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    items: visitItems,
    value: "all",
    size: "md",
    ariaLabel: "내원 유형 필터",
  },
};

export default meta;
type Story = StoryObj<typeof CountFilterChips>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<VisitType>(args.value as VisitType);
    return (
      <CountFilterChips
        {...args}
        value={value}
        onValueChange={(next) => {
          setValue(next as VisitType);
          args.onValueChange(next);
        }}
      />
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    const [value, setValue] = useState<VisitType>(args.value as VisitType);
    return (
      <div className="flex flex-col gap-4">
        {(["sm", "md", "lg"] as const).map((size) => (
          <CountFilterChips
            {...args}
            key={size}
            size={size}
            value={value}
            onValueChange={(next) => {
              setValue(next as VisitType);
              args.onValueChange(next);
            }}
          />
        ))}
      </div>
    );
  },
};

export const WithDisabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<VisitType>(args.value as VisitType);
    return (
      <CountFilterChips
        {...args}
        items={[
          { value: "all", label: "전체", count: 107 },
          { value: "event", label: "이벤트 내원", count: 73 },
          {
            value: "reservation",
            label: "접수/예약 내원",
            count: 0,
            disabled: true,
          },
          { value: "receipt", label: "영수증 인증", count: 34 },
        ]}
        value={value}
        onValueChange={(next) => {
          setValue(next);
          args.onValueChange(next);
        }}
      />
    );
  },
};

export const ForJsdoc: Story = {
  render: (args) => {
    const [value, setValue] = useState<VisitType>("all");
    return (
      <CountFilterChips
        {...args}
        value={value}
        onValueChange={(next) => {
          setValue(next as VisitType);
          args.onValueChange(next);
        }}
      />
    );
  },
};
