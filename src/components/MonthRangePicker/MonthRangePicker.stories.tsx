import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { DateRange } from "../DateRangePicker";
import { MonthRangePicker } from "./MonthRangePicker";
import { Modal } from "../Modal";
import { Button } from "../Button";

const meta: Meta<typeof MonthRangePicker> = {
  title: "Forms/MonthRangePicker",
  component: MonthRangePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "월 단위로 기간을 선택하는 컴포넌트. 두 개의 연도 섹션(4×3 그리드)으로 구성됩니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    min: { control: "text" },
    max: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Controlled = (props: React.ComponentProps<typeof MonthRangePicker>) => {
  const [range, setRange] = useState<DateRange>(
    props.value ?? { start: "", end: "" },
  );
  return <MonthRangePicker {...props} value={range} onChange={setRange} />;
};

export const Showcase: Story = {
  render: () => <Controlled />,
};

export const WithInitialValue: Story = {
  name: "초기값 (2024-09 ~ 2025-03)",
  render: () => (
    <Controlled value={{ start: "2024-09-01", end: "2025-03-31" }} />
  ),
};

export const WithMinMax: Story = {
  name: "min / max 제한",
  render: () => <Controlled min="2022-01-01" max="2026-03-13" />,
};

const InModalDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal open={open} onOpenChange={setOpen} title="조회 월 설정" size="lg">
        <Controlled />
      </Modal>
    </>
  );
};

export const InModal: Story = {
  name: "모달 내부",
  render: () => <InModalDemo />,
};

export const ForJsdoc: Story = Showcase;
