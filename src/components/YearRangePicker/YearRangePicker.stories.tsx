import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { DateRange } from "../DateRangePicker";
import { YearRangePicker } from "./YearRangePicker";
import { Modal } from "../Modal";
import { Button } from "../Button";

const meta: Meta<typeof YearRangePicker> = {
  title: "Forms/YearRangePicker",
  component: YearRangePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "연도 단위 기간 선택 컴포넌트. 두 개의 섹션(각 10년)으로 총 20년을 노출합니다.",
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

const Controlled = (props: React.ComponentProps<typeof YearRangePicker>) => {
  const [range, setRange] = useState<DateRange>(
    props.value ?? { start: "", end: "" },
  );
  return <YearRangePicker {...props} value={range} onChange={setRange} />;
};

export const Showcase: Story = {
  render: () => <Controlled />,
};

export const WithInitialValue: Story = {
  name: "초기값 (2020 ~ 2025)",
  render: () => (
    <Controlled value={{ start: "2020-01-01", end: "2025-12-31" }} />
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
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="조회 연도 설정"
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
