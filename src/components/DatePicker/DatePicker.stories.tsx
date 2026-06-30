import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { Modal } from "../Modal";
import { Button } from "../Button";

const meta: Meta<typeof DatePicker> = {
  title: "Forms/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "TextInput 기반의 단일 날짜 선택 컴포넌트. 캘린더 팝오버로 날짜를 선택합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    min: { control: "text" },
    max: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Controlled = (props: React.ComponentProps<typeof DatePicker>) => {
  const [v, setV] = useState(props.value ?? "");
  return <DatePicker {...props} value={v} onChange={setV} />;
};

export const Showcase: Story = {
  render: () => (
    <Controlled
      label="발송 일자"
      placeholder="YYYY-MM-DD"
      helperText="캠페인 시작 날짜를 선택하세요"
    />
  ),
};

export const WithValue: Story = {
  name: "값 입력됨",
  render: () => (
    <Controlled
      label="시작일"
      value="2026-05-21"
      helperText="실시간 저장됩니다"
    />
  ),
};

export const Error: Story = {
  name: "에러",
  render: () => (
    <Controlled
      label="발송 일자"
      value="2026-05-21"
      error
      errorMessage="과거 날짜는 선택할 수 없어요"
    />
  ),
};

export const Disabled: Story = {
  name: "비활성",
  render: () => <Controlled label="자동 발송일" value="2026-05-21" disabled />,
};

export const WithMinMax: Story = {
  name: "min / max 제한",
  render: () => (
    <Controlled
      label="이번 달 발송"
      min="2026-05-01"
      max="2026-05-31"
      helperText="2026년 5월만 선택할 수 있어요"
    />
  ),
};

const InModalDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal open={open} onOpenChange={setOpen} title="발송 일자 설정">
        <Controlled label="발송 일자" placeholder="YYYY-MM-DD" />
      </Modal>
    </>
  );
};

export const InModal: Story = {
  name: "모달 내부",
  render: () => <InModalDemo />,
};

export const ForJsdoc: Story = Showcase;
