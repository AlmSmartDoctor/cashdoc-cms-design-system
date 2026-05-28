import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Cms Design System의 스위치 컴포넌트입니다. 기본 토글 외에 가변 길이(width), 내부 상태 텍스트(checkedLabel/uncheckedLabel)를 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "green", "black", "blue", "red"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    width: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
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
    <span className="w-28 shrink-0 text-[12px] font-medium text-cms-gray-550">
      {label}
    </span>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
);

const Pair = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-1.5">
    {children}
    <span className="text-[11px] text-cms-gray-550">{name}</span>
  </div>
);

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Row label="Variant · ON">
        <Pair name="default">
          <Switch checked />
        </Pair>
        <Pair name="primary">
          <Switch variant="primary" checked />
        </Pair>
        <Pair name="green">
          <Switch variant="green" checked />
        </Pair>
        <Pair name="black">
          <Switch variant="black" checked />
        </Pair>
        <Pair name="blue">
          <Switch variant="blue" checked />
        </Pair>
        <Pair name="red">
          <Switch variant="red" checked />
        </Pair>
      </Row>
      <Row label="State">
        <Pair name="off">
          <Switch />
        </Pair>
        <Pair name="on">
          <Switch checked />
        </Pair>
        <Pair name="off disabled">
          <Switch disabled />
        </Pair>
        <Pair name="on disabled">
          <Switch checked disabled />
        </Pair>
      </Row>
      <Row label="With label">
        <Switch checked checkedLabel="ON" uncheckedLabel="OFF" width={64} />
        <Switch checkedLabel="공개" uncheckedLabel="비공개" width={80} />
      </Row>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
