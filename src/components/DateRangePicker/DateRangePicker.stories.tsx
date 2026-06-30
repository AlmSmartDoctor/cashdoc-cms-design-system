import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangePicker, type DateRange } from "./DateRangePicker";
import { Modal } from "../Modal";
import { Button } from "../Button";

const meta: Meta<typeof DateRangePicker> = {
  title: "Forms/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "기간(시작·종료일) 선택 컴포넌트. 두 개의 연동된 달력과 빠른 선택(오늘, 이번주 등)을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    quickSelectMode: {
      control: "radio",
      options: ["past", "future"],
      table: { defaultValue: { summary: "past" } },
    },
    mondayStart: { control: "boolean" },
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

const Controlled = (props: React.ComponentProps<typeof DateRangePicker>) => {
  const [range, setRange] = useState<DateRange>(
    props.value ?? { start: "", end: "" },
  );
  return <DateRangePicker {...props} value={range} onChange={setRange} />;
};

export const Showcase: Story = {
  render: () => <Controlled />,
};

export const WithInitialValue: Story = {
  name: "값 입력됨",
  render: () => (
    <Controlled value={{ start: "2026-05-01", end: "2026-05-15" }} />
  ),
};

export const FutureMode: Story = {
  name: "Future 모드",
  render: () => <Controlled quickSelectMode="future" />,
};

export const SundayStart: Story = {
  name: "Sunday start",
  render: () => <Controlled mondayStart={false} />,
};

export const WithMinMax: Story = {
  name: "min / max 제한 (이번 달)",
  render: () => <Controlled min="2026-05-01" max="2026-05-31" />,
};

const InModalDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="조회 기간 설정"
        size="lg"
      >
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
