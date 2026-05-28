import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./RadioButton";

const meta: Meta<typeof RadioGroupItem> = {
  title: "Forms/RadioButton",
  component: RadioGroupItem,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Cms Design System의 라디오 버튼 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["black", "default", "green", "blue", "red"],
      table: { defaultValue: { summary: "black" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
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
    <div className="flex flex-wrap items-center gap-4">{children}</div>
  </div>
);

const Item = ({
  value,
  label,
  ...rest
}: React.ComponentProps<typeof RadioGroupItem> & { label: string }) => (
  <label className="flex cursor-pointer items-center gap-2 text-sm text-cms-gray-900">
    <RadioGroupItem value={value} {...rest} />
    {label}
  </label>
);

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Row label="Size">
        <RadioGroup defaultValue="md" className="flex items-center gap-4">
          <Item value="sm" size="sm" label="sm" />
          <Item value="md" size="md" label="md" />
          <Item value="lg" size="lg" label="lg" />
        </RadioGroup>
      </Row>
      <Row label="Variant">
        <RadioGroup
          defaultValue="black"
          className="flex flex-wrap items-center gap-4"
        >
          <Item value="black" variant="black" label="black" />
          <Item value="default" variant="default" label="default" />
          <Item value="green" variant="green" label="green" />
          <Item value="blue" variant="blue" label="blue" />
          <Item value="red" variant="red" label="red" />
        </RadioGroup>
      </Row>
      <Row label="Group">
        <RadioGroup defaultValue="now" className="flex flex-col gap-2">
          <Item value="now" label="즉시 발송" />
          <Item value="schedule" label="예약 발송" />
          <Item value="draft" label="임시저장" />
        </RadioGroup>
      </Row>
      <Row label="Disabled">
        <RadioGroup defaultValue="a" className="flex items-center gap-4">
          <Item value="a" label="활성" />
          <Item value="b" label="비활성" disabled />
        </RadioGroup>
      </Row>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
