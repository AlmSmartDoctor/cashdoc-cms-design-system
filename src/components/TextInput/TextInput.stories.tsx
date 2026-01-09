import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Forms/TextInput",
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
      description:
        "입력 필드의 스타일 변형입니다. 일반적으로 error prop과 함께 자동으로 처리되므로 직접 설정할 필요가 없습니다.",
      table: {
        type: { summary: "default | error" },
        defaultValue: { summary: "default" },
      },
    },
    fullWidth: {
      control: "boolean",
      description:
        "true일 경우 부모 요소의 전체 너비를 차지합니다. false일 경우 내용에 맞춰 조절됩니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "true일 경우 입력을 비활성화하고 회색으로 표시합니다. 포커스를 받지 않으며 클릭할 수 없습니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description:
        "입력 필드 위에 표시되는 라벨 텍스트입니다. 무엇을 입력해야 하는지 명확하게 표시하세요.",
      table: {
        type: { summary: "string" },
      },
    },
    required: {
      control: "boolean",
      description:
        "true일 경우 필수 입력 표시(*)를 라벨 옆에 표시하고 HTML input의 required 속성을 활성화합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      control: "text",
      description:
        "입력 필드가 비어있을 때 표시되는 힌트 텍스트입니다. 입력 형식의 예시를 보여주는 용도로 사용하세요.",
      table: {
        type: { summary: "string" },
      },
    },
    error: {
      control: "boolean",
      description:
        "true일 경우 에러 상태로 전환되어 빨간색 테두리와 errorMessage를 표시합니다. 유효성 검증 실패 시 사용하세요.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    errorMessage: {
      control: "text",
      description:
        "error={true}일 때 입력 필드 하단에 표시되는 에러 메시지입니다. 사용자가 문제를 해결할 수 있도록 구체적으로 작성하세요.",
      table: {
        type: { summary: "string" },
      },
    },
    helperText: {
      control: "text",
      description:
        "입력 필드 하단에 표시되는 도움말 텍스트입니다. 입력 형식이나 제약사항을 안내할 때 사용합니다. error 상태에서는 표시되지 않습니다.",
      table: {
        type: { summary: "string" },
      },
    },
    showCharCount: {
      control: "boolean",
      description:
        "true일 경우 우측 상단에 현재 입력된 글자 수와 최대 글자 수(maxLength)를 표시합니다. maxLength가 설정되어야 작동합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    maxLength: {
      control: "number",
      description:
        "입력 가능한 최대 글자 수를 제한합니다. showCharCount={true}와 함께 사용하여 사용자에게 제한을 알려주세요.",
      table: {
        type: { summary: "number" },
      },
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "date"],
      description:
        "HTML input type입니다. 입력 데이터에 맞는 type을 지정하면 모바일에서 적절한 키보드가 표시됩니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text" },
      },
    },
    value: {
      description:
        "제어 컴포넌트로 사용할 때의 입력 값입니다. onChange와 함께 사용하여 상태를 관리하세요.",
      table: {
        type: { summary: "string" },
      },
    },
    onChange: {
      description:
        "입력 값이 변경될 때 호출되는 콜백 함수입니다. 제어 컴포넌트로 사용할 때 필수입니다.",
      table: {
        type: { summary: "(e: ChangeEvent<HTMLInputElement>) => void" },
      },
    },
    labelLayout: {
      control: "select",
      options: ["vertical", "horizontal"],
      description:
        "레이블의 배치 방향입니다. vertical은 위에, horizontal은 왼쪽에 레이블이 배치됩니다.",
      table: {
        type: { summary: "vertical | horizontal" },
        defaultValue: { summary: "vertical" },
      },
    },
    labelWidth: {
      control: "text",
      description:
        "horizontal 레이아웃일 때 레이블의 너비입니다. CSS 단위로 지정합니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "120px" },
      },
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

export const Required: Story = {
  args: {
    label: "필수 입력 항목",
    required: true,
    placeholder: "내용을 입력해주세요",
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
    value: "비활성화된 사용자",
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

export const HorizontalLayout: Story = {
  args: {
    label: "상호(법인명)",
    required: true,
    labelLayout: "horizontal",
    labelWidth: "150px",
    placeholder: "회사명을 입력하세요",
  },
};

export const HorizontalLayoutForm: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[600px]">
      <TextInput
        label="상호(법인명)"
        required
        labelLayout="horizontal"
        labelWidth="150px"
        placeholder="회사명을 입력하세요"
      />
      <TextInput
        label="대표자"
        required
        labelLayout="horizontal"
        labelWidth="150px"
        placeholder="대표자명을 입력하세요"
      />
      <TextInput
        label="사업자 등록번호"
        required
        labelLayout="horizontal"
        labelWidth="150px"
        placeholder="000-00-00000"
      />
      <TextInput
        label="업태"
        labelLayout="horizontal"
        labelWidth="150px"
        placeholder="업태를 입력하세요"
      />
      <TextInput
        label="사업장 소재지"
        required
        labelLayout="horizontal"
        labelWidth="150px"
        placeholder="주소를 입력하세요"
      />
      <TextInput
        label="종목"
        labelLayout="horizontal"
        labelWidth="150px"
        placeholder="종목을 입력하세요"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "가로 배치 레이아웃을 사용한 폼 예시입니다. 레이블 너비가 일정하게 유지되어 정렬된 모습을 보여줍니다.",
      },
    },
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

export const ForJsdoc: Story = AllStates;
