import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Combobox, Dropdown } from "./";
import type { DropdownItem } from "./";

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

/* ── 그룹 서브메뉴 ── */

const groupOptions: DropdownItem[] = [
  { label: "전체", value: "" },
  {
    label: "상담 관련",
    group: [
      {
        label: "상담 예약",
        value: "CONSULT_RESERVED",
        displayLabel: "예약",
      },
      { label: "상담 완료", value: "CONSULT_DONE", displayLabel: "완료" },
    ],
  },
  {
    label: "수술 관련",
    group: [
      { label: "수술 예약", value: "SURGERY_RESERVED" },
      { label: "수술 완료", value: "SURGERY_DONE" },
    ],
  },
  { label: "취소", value: "CANCELLED" },
];

const GroupCtrl = () => {
  const [v, setV] = useState("");
  return (
    <Dropdown
      options={groupOptions}
      value={v}
      onValueChange={setV}
      placeholder="상태 선택"
    />
  );
};

const GroupDisabledCtrl = () => {
  const [v, setV] = useState("");
  return (
    <Dropdown
      options={[
        { label: "전체", value: "" },
        {
          label: "비활성 그룹",
          disabled: true,
          group: [
            { label: "옵션 A", value: "A" },
            { label: "옵션 B", value: "B" },
          ],
        },
        {
          label: "활성 그룹",
          group: [
            { label: "옵션 C", value: "C" },
            { label: "옵션 D (비활성)", value: "D", disabled: true },
          ],
        },
      ]}
      value={v}
      onValueChange={setV}
      placeholder="상태 선택"
    />
  );
};

export const GroupSubmenu: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5">
      <Section label="그룹 서브메뉴">
        <GroupCtrl />
      </Section>
      <Section label="비활성 그룹 + 비활성 아이템">
        <GroupDisabledCtrl />
      </Section>
    </div>
  ),
};

/* ── 스크롤된 리스트에서 서브메뉴 위치 (#34 regression) ── */

const scrollGroupOptions: DropdownItem[] = Array.from(
  { length: 10 },
  (_, i) => ({
    label: `그룹 ${i + 1}`,
    group: [
      { label: `그룹 ${i + 1} · 옵션 A`, value: `g${i}-a` },
      { label: `그룹 ${i + 1} · 옵션 B`, value: `g${i}-b` },
    ],
  }),
);

const ScrollGroupCtrl = () => {
  const [v, setV] = useState("");
  return (
    <Dropdown
      options={scrollGroupOptions}
      value={v}
      onValueChange={setV}
      placeholder="그룹 선택"
    />
  );
};

/**
 * 옵션이 많아 목록이 스크롤되는 상태에서 그룹에 hover 했을 때 서브메뉴가
 * 스크롤량만큼 아래로 밀리지 않고 해당 그룹 옆에 정확히 붙어야 합니다(#34).
 *
 * 확인 방법: 드롭다운을 연 뒤 목록을 아래로 스크롤하고 임의의 그룹에
 * hover하세요.
 */
export const GroupSubmenuScroll: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-2">
      <p className="text-[12px] text-cms-gray-550">
        목록을 스크롤한 뒤 그룹에 hover — 서브메뉴가 그룹 옆에 붙어야 합니다.
      </p>
      <ScrollGroupCtrl />
    </div>
  ),
};
