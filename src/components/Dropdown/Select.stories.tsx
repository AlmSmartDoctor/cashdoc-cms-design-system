import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./";

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "레이블·도움말·에러 메시지를 갖춘 단일 선택 폼 필드. " +
          "Dropdown을 기반으로 폼 구성 요소(label, required, error)를 더합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      table: { defaultValue: { summary: "default" } },
    },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const gradeOptions = [
  { value: "admin", label: "관리자" },
  { value: "editor", label: "편집자" },
  { value: "viewer", label: "뷰어" },
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

type CtrlProps = Omit<
  React.ComponentProps<typeof Select>,
  "value" | "onValueChange"
>;

const Ctrl = (props: CtrlProps) => {
  const [value, setValue] = useState("");
  return <Select {...props} value={value} onValueChange={setValue} />;
};

/**
 * 레이블/필수/도움말/에러 상태와 variant·size 조합을 한눈에 보여주는
 * 쇼케이스입니다.
 */
export const Showcase: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5">
      <Section label="기본 (label)">
        <Ctrl
          label="사용자 등급"
          options={gradeOptions}
          placeholder="등급을 선택해 주세요"
        />
      </Section>
      <Section label="필수 (required)">
        <Ctrl
          label="사용자 등급"
          required
          options={gradeOptions}
          placeholder="등급을 선택해 주세요"
        />
      </Section>
      <Section label="도움말 (helperText)">
        <Ctrl
          label="사용자 등급"
          helperText="가입 후에도 변경할 수 있습니다"
          options={gradeOptions}
          placeholder="등급을 선택해 주세요"
        />
      </Section>
      <Section label="에러 (error)">
        <Ctrl
          label="국가 선택"
          error="국가를 선택하는 것은 필수입니다"
          options={gradeOptions}
          placeholder="국가를 선택해 주세요"
        />
      </Section>
      <Section label="Variant · outline">
        <Ctrl
          label="사용자 등급"
          variant="outline"
          options={gradeOptions}
          placeholder="Outline"
        />
      </Section>
      <Section label="Variant · ghost">
        <Ctrl
          label="사용자 등급"
          variant="ghost"
          options={gradeOptions}
          placeholder="Ghost"
        />
      </Section>
      <Section label="Size sm / default / lg">
        <div className="flex flex-col gap-2">
          <Ctrl options={gradeOptions} size="sm" placeholder="sm" />
          <Ctrl options={gradeOptions} placeholder="default" />
          <Ctrl options={gradeOptions} size="lg" placeholder="lg" />
        </div>
      </Section>
      <Section label="Disabled">
        <Ctrl
          label="사용자 등급"
          disabled
          options={gradeOptions}
          placeholder="Disabled"
        />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
