import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cms Design System의 텍스트 입력 컴포넌트입니다. cashdoc-hospital-event 프로젝트의 TextField 스타일을 기반으로 만들어졌습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "입력 필드의 스타일 변형",
    },
    fullWidth: {
      control: "boolean",
      description: "전체 너비 사용 여부",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    label: {
      control: "text",
      description: "입력 필드 라벨",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    error: {
      control: "boolean",
      description: "에러 상태",
    },
    errorMessage: {
      control: "text",
      description: "에러 메시지",
    },
    helperText: {
      control: "text",
      description: "도움말 텍스트",
    },
    showCharCount: {
      control: "boolean",
      description: "글자 수 카운터 표시 여부",
    },
    maxLength: {
      control: "number",
      description: "최대 입력 글자 수",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
  },
};

export const WithLabel: Story = {
  args: {
    label: "이름",
    placeholder: "이름을 입력하세요",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "이메일",
    placeholder: "example@email.com",
    helperText: "이메일 형식으로 입력해주세요",
  },
};

export const Error: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    error: true,
    errorMessage: "비밀번호는 8자 이상이어야 합니다",
  },
};

export const Disabled: Story = {
  args: {
    label: "사용자명",
    placeholder: "사용자명",
    disabled: true,
    value: "disabled-user",
  },
};

export const WithValue: Story = {
  args: {
    label: "주소",
    value: "서울시 강남구",
  },
};

export const Password: Story = {
  args: {
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력하세요",
  },
};

export const Email: Story = {
  args: {
    label: "이메일",
    type: "email",
    placeholder: "example@email.com",
  },
};

export const Number: Story = {
  args: {
    label: "나이",
    type: "number",
    placeholder: "나이를 입력하세요",
  },
};

export const WithCharCount: Story = {
  args: {
    label: "자기소개",
    placeholder: "자기소개를 입력하세요",
    maxLength: 100,
    showCharCount: true,
  },
};

export const CharCountOnly: Story = {
  args: {
    placeholder: "최대 50자",
    maxLength: 50,
    showCharCount: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 min-w-[400px]">
      <TextInput label="기본 상태" placeholder="텍스트를 입력하세요" />

      <TextInput
        label="헬퍼 텍스트"
        placeholder="이메일을 입력하세요"
        helperText="example@email.com 형식으로 입력해주세요"
      />

      <TextInput
        label="에러 상태"
        placeholder="비밀번호를 입력하세요"
        error
        errorMessage="비밀번호는 8자 이상이어야 합니다"
      />

      <TextInput label="비활성화 상태" value="disabled-value" disabled />

      <TextInput label="값이 있는 상태" value="입력된 텍스트" />

      <div className="border-t pt-4 mt-2">
        <h3 className="text-cms-lg font-semibold mb-4">다양한 타입</h3>

        <div className="flex flex-col gap-4">
          <TextInput label="비밀번호" type="password" placeholder="비밀번호" />

          <TextInput
            label="이메일"
            type="email"
            placeholder="example@email.com"
          />

          <TextInput label="숫자" type="number" placeholder="0" />

          <TextInput label="날짜" type="date" />
        </div>
      </div>

      <div className="border-t pt-4 mt-2">
        <h3 className="text-cms-lg font-semibold mb-4">글자 수 제한</h3>

        <div className="flex flex-col gap-4">
          <TextInput
            label="자기소개"
            placeholder="자기소개를 입력하세요"
            maxLength={100}
            showCharCount
          />

          <TextInput
            placeholder="라벨 없이 글자 수 제한"
            maxLength={50}
            showCharCount
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 TextInput 상태와 타입을 한 번에 보여줍니다.",
      },
    },
  },
};
