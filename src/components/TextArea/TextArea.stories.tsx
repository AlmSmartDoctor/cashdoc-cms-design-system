import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Forms/TextArea",
  component: TextArea,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "여러 줄 텍스트 입력 컴포넌트. TextInput과 동일한 디자인 언어.",
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
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      table: { defaultValue: { summary: "vertical" } },
    },
    label: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "boolean" },
    showCharCount: { control: "boolean" },
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
        <TextArea
          label="메시지"
          placeholder="알림 메시지 내용을 입력하세요…"
          helperText="발송 전 미리보기로 확인할 수 있어요"
        />
      </Section>
      <Section label="값 + 글자수">
        <TextArea
          label="설명"
          defaultValue="2025년 캐시닥 신규 캠페인이 시작되었습니다."
          showCharCount
          maxLength={200}
        />
      </Section>
      <Section label="에러">
        <TextArea
          label="공지 내용"
          defaultValue=""
          error
          errorMessage="필수 입력 항목이에요"
        />
      </Section>
      <Section label="비활성">
        <TextArea
          label="자동 생성 메시지"
          defaultValue="시스템에서 자동 생성됩니다."
          disabled
        />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
