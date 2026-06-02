import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckIcon, RefreshIcon, SearchIcon } from "../icons";
import { Tag, type TagColor } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Data Display/Tag",
  component: Tag,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "짧은 메타데이터(상태, 분류, 라벨)를 표시하는 태그 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["gray", "blue", "green", "red", "orange", "yellow", "pink"],
      table: { defaultValue: { summary: "gray" } },
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      table: { defaultValue: { summary: "sm" } },
    },
    removable: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Tag",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const COLORS: TagColor[] = [
  "gray",
  "blue",
  "green",
  "red",
  "orange",
  "yellow",
  "pink",
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
    <div className="flex flex-wrap items-center gap-2">{children}</div>
  </div>
);

export const Showcase: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      <Section label="컬러 — sm">
        {COLORS.map((color) => (
          <Tag key={color} color={color}>
            {color}
          </Tag>
        ))}
      </Section>
      <Section label="컬러 — md">
        {COLORS.map((color) => (
          <Tag key={color} color={color} size="md">
            {color}
          </Tag>
        ))}
      </Section>
      <Section label="아이콘 prefix">
        <Tag color="green" leftIcon={<CheckIcon size={10} />}>
          완료
        </Tag>
        <Tag color="orange" leftIcon={<RefreshIcon size={10} />}>
          진행중
        </Tag>
        <Tag color="blue" leftIcon={<SearchIcon size={10} />} size="md">
          검토중
        </Tag>
      </Section>
      <Section label="Removable">
        <RemovableDemo />
      </Section>
      <Section label="Clickable">
        <Tag
          color="blue"
          onClick={() => alert("clicked")}
        >
          클릭 가능
        </Tag>
      </Section>
    </div>
  ),
};

type RemovableItem = { id: number; label: string; color: TagColor };

const RemovableDemo = () => {
  const [tags, setTags] = useState<RemovableItem[]>([
    { id: 1, label: "VIP", color: "red" },
    { id: 2, label: "신규", color: "blue" },
    { id: 3, label: "관리자", color: "gray" },
    { id: 4, label: "프리미엄", color: "pink" },
  ]);
  return (
    <>
      {tags.map((t) => (
        <Tag
          key={t.id}
          color={t.color}
          removable
          onRemove={() => setTags((prev) => prev.filter((x) => x.id !== t.id))}
        >
          {t.label}
        </Tag>
      ))}
      {tags.length === 0 && (
        <span className="text-[12px] text-cms-gray-500">
          모두 제거되었습니다 — 새로고침으로 복구
        </span>
      )}
    </>
  );
};

export const ForJsdoc: Story = Showcase;
