import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Combobox, Dropdown } from "./";

const meta: Meta<typeof Dropdown> = {
  title: "Forms/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Cms Design System의 드롭다운 컴포넌트. 단일/다중 선택, 검색, 커스텀 렌더링을 지원합니다.",
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
    disabled: { control: "boolean" },
    searchable: { control: "boolean" },
    clearable: { control: "boolean" },
    multiple: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "gatsby", label: "Gatsby" },
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

type SingleProps = Omit<
  React.ComponentProps<typeof Dropdown>,
  "value" | "onValueChange" | "multiple" | "onValuesChange" | "selectAll"
>;

const SingleCtrl = (props: SingleProps) => {
  const [v, setV] = useState("");
  return (
    <Dropdown {...props} multiple={false} value={v} onValueChange={setV} />
  );
};

const MultiCtrl = (
  props: SingleProps & { selectAll?: boolean },
) => {
  const [vs, setVs] = useState<string[]>([]);
  return (
    <Dropdown
      {...props}
      multiple
      value={vs.join(",")}
      onValuesChange={setVs}
    />
  );
};

export const Showcase: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5">
      <Section label="Variant · default">
        <SingleCtrl options={sampleOptions} placeholder="선택하세요" />
      </Section>
      <Section label="Variant · outline">
        <SingleCtrl
          options={sampleOptions}
          variant="outline"
          placeholder="Outline"
        />
      </Section>
      <Section label="Variant · ghost">
        <SingleCtrl
          options={sampleOptions}
          variant="ghost"
          placeholder="Ghost"
        />
      </Section>
      <Section label="Size sm / default / lg">
        <div className="flex flex-col gap-2">
          <SingleCtrl options={sampleOptions} size="sm" placeholder="sm" />
          <SingleCtrl options={sampleOptions} placeholder="default" />
          <SingleCtrl options={sampleOptions} size="lg" placeholder="lg" />
        </div>
      </Section>
      <Section label="Searchable + Clearable">
        <SingleCtrl
          options={sampleOptions}
          searchable
          clearable
          placeholder="검색하여 선택"
        />
      </Section>
      <Section label="Multiple + Select all">
        <MultiCtrl
          options={sampleOptions}
          selectAll
          placeholder="여러 개 선택"
        />
      </Section>
      <Section label="Disabled">
        <SingleCtrl options={sampleOptions} disabled placeholder="Disabled" />
      </Section>
      <Section label="Combobox · 단축형">
        <Combobox options={sampleOptions} placeholder="Combobox" />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
