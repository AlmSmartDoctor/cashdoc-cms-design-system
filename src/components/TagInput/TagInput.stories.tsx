import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TagInput } from "./TagInput";

const meta: Meta<typeof TagInput> = {
  title: "Forms/TagInput",
  component: TagInput,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "여러 개의 태그를 입력하고 관리할 수 있는 컴포넌트. Enter로 추가, x로 제거합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    maxTags: { control: "number" },
    noLimit: { control: "boolean" },
    placeholder: { control: "text" },
    readOnly: { control: "boolean" },
    labelLayout: { control: "select", options: ["vertical", "horizontal"] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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

const Controlled = (props: React.ComponentProps<typeof TagInput>) => {
  const [tags, setTags] = useState<string[]>(props.defaultValue ?? []);
  return <TagInput {...props} value={tags} onChange={setTags} />;
};

export const Showcase: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      <Section label="기본">
        <Controlled
          label="관심 카테고리"
          defaultValue={["보험", "건강검진", "리워드"]}
          maxTags={5}
          placeholder="태그 입력 후 Enter"
        />
      </Section>

      <Section label="빈 상태">
        <Controlled
          label="담당자"
          maxTags={5}
          placeholder="이름 입력 후 Enter"
        />
      </Section>

      <Section label="검증 (이메일)">
        <Controlled
          label="수신자 이메일"
          defaultValue={["kim@cashdoc.io", "park@cashdoc.io"]}
          maxTags={10}
          placeholder="이메일 입력 후 Enter"
          validateTag={(tag) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tag) || "올바른 이메일 형식이 아니에요"
          }
        />
      </Section>

      <Section label="ReadOnly">
        <TagInput
          label="고정 태그"
          value={["VIP", "신규"]}
          onChange={() => {}}
          readOnly
        />
      </Section>

      <Section label="Horizontal label">
        <Controlled
          label="키워드"
          labelLayout="horizontal"
          labelWidth="120px"
          defaultValue={["React"]}
          maxTags={5}
          placeholder="태그 추가"
        />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
