import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "체크박스 컴포넌트입니다. Radix UI 기반으로 접근성을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
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
  <div className="flex items-start gap-4">
    <span className="w-24 shrink-0 pt-0.5 text-[12px] font-medium text-cms-gray-550">
      {label}
    </span>
    <div className="flex flex-wrap items-center gap-5">{children}</div>
  </div>
);

export const Showcase: Story = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
      <div className="flex flex-col gap-5">
        <Row label="State">
          <Checkbox label="기본" />
          <Checkbox label="체크됨" defaultChecked />
          <Checkbox label="비활성" disabled />
          <Checkbox label="체크 + 비활성" defaultChecked disabled />
        </Row>
        <Row label="Without label">
          <Checkbox />
          <Checkbox defaultChecked />
          <Checkbox disabled />
          <Checkbox defaultChecked disabled />
        </Row>
        <Row label="Controlled">
          <Checkbox
            label="푸시 알림"
            checked={a}
            onCheckedChange={(v) => setA(v === true)}
          />
          <Checkbox
            label="이메일 수신"
            checked={b}
            onCheckedChange={(v) => setB(v === true)}
          />
        </Row>
      </div>
    );
  },
};

export const ForJsdoc: Story = Showcase;
