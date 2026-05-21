import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Forms/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cms Design System의 여러 줄 텍스트 입력 컴포넌트입니다. TextInput과 동일한 디자인 언어를 공유합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
      description:
        "입력 필드의 스타일 변형입니다. 일반적으로 error prop과 함께 자동으로 처리됩니다.",
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
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description:
        "사용자가 textarea 크기를 조절할 수 있는 방향입니다.",
      table: {
        type: { summary: "none | vertical | horizontal | both" },
        defaultValue: { summary: "vertical" },
      },
    },
    rows: {
      control: "number",
      description: "표시되는 줄 수의 기본값입니다. (native rows attribute)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "4" },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "true일 경우 입력을 비활성화하고 회색으로 표시합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "입력 필드 위에 표시되는 라벨 텍스트입니다.",
      table: { type: { summary: "string" } },
    },
    required: {
      control: "boolean",
      description:
        "true일 경우 필수 입력 표시(*)를 라벨 옆에 표시하고 HTML required 속성을 활성화합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      control: "text",
      description:
        "입력 필드가 비어있을 때 표시되는 힌트 텍스트입니다.",
      table: { type: { summary: "string" } },
    },
    error: {
      control: "boolean",
      description:
        "true일 경우 에러 상태로 전환되어 빨간색 테두리와 errorMessage를 표시합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    errorMessage: {
      control: "text",
      description:
        "error={true}일 때 입력 필드 하단에 표시되는 에러 메시지입니다.",
      table: { type: { summary: "string" } },
    },
    helperText: {
      control: "text",
      description:
        "입력 필드 하단에 표시되는 도움말 텍스트입니다. error 상태에서는 표시되지 않습니다.",
      table: { type: { summary: "string" } },
    },
    showCharCount: {
      control: "boolean",
      description:
        "true일 경우 현재 입력된 글자 수와 최대 글자 수(maxLength)를 표시합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    maxLength: {
      control: "number",
      description: "입력 가능한 최대 글자 수를 제한합니다.",
      table: { type: { summary: "number" } },
    },
    value: {
      description:
        "제어 컴포넌트로 사용할 때의 입력 값입니다.",
      table: { type: { summary: "string" } },
    },
    onChange: {
      description: "입력 값이 변경될 때 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(e: ChangeEvent<HTMLTextAreaElement>) => void" },
      },
    },
    labelLayout: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "레이블의 배치 방향입니다.",
      table: {
        type: { summary: "vertical | horizontal" },
        defaultValue: { summary: "vertical" },
      },
    },
    labelWidth: {
      control: "text",
      description:
        "horizontal 레이아웃일 때 레이블의 너비입니다.",
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
    label: "메모",
    placeholder: "메모를 입력하세요",
  },
};

export const Required: Story = {
  args: {
    label: "요청사항",
    required: true,
    placeholder: "요청사항을 입력해주세요",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "자기소개",
    placeholder: "자기소개를 입력하세요",
    helperText: "최대 300자까지 입력할 수 있습니다",
  },
};

export const Error: Story = {
  args: {
    label: "사유",
    placeholder: "사유를 입력하세요",
    error: true,
    errorMessage: "사유는 최소 10자 이상 입력해야 합니다",
  },
};

export const Disabled: Story = {
  args: {
    label: "비활성화",
    value: "이 textarea는 비활성화되어 있습니다.",
    disabled: true,
  },
};

export const WithCharCount: Story = {
  args: {
    label: "자기소개",
    placeholder: "자기소개를 입력하세요",
    maxLength: 300,
    showCharCount: true,
    rows: 5,
  },
};

export const ResizeNone: Story = {
  args: {
    label: "고정 크기",
    placeholder: "크기 조절 불가",
    resize: "none",
  },
};

export const HorizontalLayout: Story = {
  args: {
    label: "요청사항",
    required: true,
    labelLayout: "horizontal",
    labelWidth: "120px",
    placeholder: "요청사항을 입력하세요",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex min-w-100 flex-col gap-6">
      <TextArea label="기본 상태" placeholder="텍스트를 입력하세요" />

      <TextArea
        label="헬퍼 텍스트"
        placeholder="내용을 입력하세요"
        helperText="최대 300자까지 입력할 수 있습니다"
      />

      <TextArea
        label="에러 상태"
        placeholder="사유를 입력하세요"
        error
        errorMessage="사유는 최소 10자 이상 입력해야 합니다"
      />

      <TextArea
        label="비활성화 상태"
        value="이 textarea는 비활성화되어 있습니다."
        disabled
      />

      <TextArea
        label="글자 수 제한"
        placeholder="자기소개를 입력하세요"
        maxLength={300}
        showCharCount
        rows={5}
      />

      <TextArea
        label="크기 조절 불가"
        placeholder="resize=none"
        resize="none"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "TextArea의 주요 상태들을 한 번에 보여줍니다.",
      },
    },
  },
};

export const ForJsdoc: Story = AllStates;
