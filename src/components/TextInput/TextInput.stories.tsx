import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchIcon } from "../icons";
import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Forms/TextInput",
  component: TextInput,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Cms Design System의 텍스트 입력 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      table: { defaultValue: { summary: "default" } },
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    showCharCount: { control: "boolean" },
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

export const Showcase: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5">
      <Section label="기본">
        <TextInput
          label="이메일"
          placeholder="example@cashdoc.io"
          helperText="고객사 관리자 계정 이메일"
        />
      </Section>
      <Section label="값 입력됨">
        <TextInput
          label="사용자 이름"
          defaultValue="김캐시"
          helperText="실시간 저장됩니다"
          showCharCount
          maxLength={12}
        />
      </Section>
      <Section label="필수">
        <TextInput
          label="비밀번호"
          required
          type="password"
          placeholder="8자 이상"
        />
      </Section>
      <Section label="에러">
        <TextInput
          label="비밀번호"
          defaultValue="abc"
          type="password"
          error
          errorMessage="최소 8자 이상이어야 합니다"
        />
      </Section>
      <Section label="비활성">
        <TextInput
          label="SSO 도메인"
          defaultValue="cashdoc.io"
          disabled
          helperText="변경하려면 관리자에게 문의"
        />
      </Section>
      <Section label="Horizontal layout">
        <TextInput
          label="이름"
          labelLayout="horizontal"
          labelWidth="80px"
          placeholder="이름 입력"
        />
      </Section>
      <Section label="Prefix (검색 아이콘)">
        <TextInput
          prefix={<SearchIcon size={16} />}
          placeholder="병원명 · 대행사명 검색"
        />
      </Section>
      <Section label="Suffix (단위)">
        <TextInput
          suffix={
            <span className="text-sm text-cms-gray-500">원</span>
          }
          placeholder="0"
          type="number"
        />
      </Section>
      <Section label="Prefix + Suffix">
        <TextInput
          label="환율"
          prefix={
            <span className="text-sm text-cms-gray-500">$</span>
          }
          suffix={
            <span className="text-sm text-cms-gray-500">KRW</span>
          }
          defaultValue="1380"
        />
      </Section>
      <Section label="Affix · disabled">
        <TextInput
          prefix={<SearchIcon size={16} />}
          placeholder="검색"
          disabled
        />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
