import type { Meta, StoryObj } from "@storybook/react";
import { TagInput } from "./TagInput";
import { useState } from "react";

const meta: Meta<typeof TagInput> = {
  title: "Components/TagInput",
  component: TagInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cms Design System의 태그 입력 컴포넌트입니다. 여러 개의 태그를 입력하고 관리할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["row", "column"],
      description: "태그 레이아웃 방향",
    },
    maxTags: {
      control: "number",
      description: "최대 태그 개수",
    },
    noLimit: {
      control: "boolean",
      description: "태그 개수 제한 없음",
    },
    readOnly: {
      control: "boolean",
      description: "읽기 전용 모드",
    },
    required: {
      control: "boolean",
      description: "필수 입력 여부",
    },
    label: {
      control: "text",
      description: "라벨 텍스트",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>([]);
    return <TagInput {...args} value={tags} onChange={setTags} />;
  },
  args: {
    placeholder: "태그를 입력하세요",
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>([]);
    return <TagInput {...args} value={tags} onChange={setTags} />;
  },
  args: {
    label: "태그",
    placeholder: "태그를 입력하세요",
  },
};

export const Required: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>([]);
    return <TagInput {...args} value={tags} onChange={setTags} />;
  },
  args: {
    label: "필수 태그",
    required: true,
    placeholder: "태그를 입력하세요",
  },
};

export const WithMaxTags: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>([]);
    return <TagInput {...args} value={tags} onChange={setTags} />;
  },
  args: {
    label: "태그 (최대 5개)",
    maxTags: 5,
    placeholder: "태그를 입력하세요",
  },
};

export const NoLimit: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>([]);
    return <TagInput {...args} value={tags} onChange={setTags} />;
  },
  args: {
    label: "태그 (제한 없음)",
    noLimit: true,
    placeholder: "태그를 입력하세요",
  },
};

export const ColumnLayout: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>([]);
    return <TagInput {...args} value={tags} onChange={setTags} />;
  },
  args: {
    label: "태그 (세로 레이아웃)",
    layout: "column",
    placeholder: "태그를 입력하세요",
  },
};

export const ReadOnly: Story = {
  args: {
    label: "읽기 전용 태그",
    readOnly: true,
    value: ["React", "TypeScript", "Tailwind"],
  },
};

export const WithInitialValue: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>(["디자인", "개발"]);
    return <TagInput {...args} value={tags} onChange={setTags} />;
  },
  args: {
    label: "초기값이 있는 태그",
    placeholder: "태그를 입력하세요",
  },
};

const ControlledExample = () => {
  const [tags, setTags] = useState<string[]>(["React", "TypeScript"]);

  return (
    <div className="min-w-[400px]">
      <TagInput
        label="제어 컴포넌트"
        value={tags}
        onChange={setTags}
        placeholder="태그를 입력하세요"
        maxTags={5}
      />
      <div className="mt-4 p-3 bg-cms-gray-100 rounded-cms-sm">
        <p className="font-cms-sm font-medium mb-2">현재 태그:</p>
        <p className="font-cms-sm text-cms-gray-700">
          {tags.length > 0 ? tags.join(", ") : "없음"}
        </p>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
  parameters: {
    docs: {
      description: {
        story: "제어 컴포넌트로 사용하는 예시입니다.",
      },
    },
  },
};

const ValidationExample = () => {
  const [tags, setTags] = useState<string[]>([]);

  const validateTag = (tag: string, _currentTags: string[]) => {
    if (tag.length < 2) {
      return "태그는 최소 2글자 이상이어야 합니다.";
    }
    if (tag.length > 10) {
      return "태그는 최대 10글자까지 가능합니다.";
    }
    if (!/^[가-힣a-zA-Z0-9]+$/.test(tag)) {
      return "태그는 한글, 영문, 숫자만 입력 가능합니다.";
    }
    return true;
  };

  return (
    <div className="min-w-[400px]">
      <TagInput
        label="유효성 검사 태그"
        value={tags}
        onChange={setTags}
        placeholder="2-10자의 한글/영문/숫자만 입력"
        validateTag={validateTag}
        maxTags={3}
      />
    </div>
  );
};

export const WithValidation: Story = {
  render: () => <ValidationExample />,
  parameters: {
    docs: {
      description: {
        story:
          "태그 유효성 검사를 적용한 예시입니다. 2-10자의 한글, 영문, 숫자만 입력할 수 있습니다.",
      },
    },
  },
};

const AllStatesExample = () => {
  const [tags1, setTags1] = useState<string[]>([]);
  const [tags2, setTags2] = useState<string[]>(["React", "TypeScript"]);
  const [tags3, setTags3] = useState<string[]>([]);
  const [tags4, setTags4] = useState<string[]>([]);
  const [tags5, setTags5] = useState<string[]>([]);
  const [tags6, setTags6] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-6 min-w-[500px]">
      <TagInput
        label="기본 상태"
        placeholder="태그를 입력하세요"
        value={tags1}
        onChange={setTags1}
      />

      <TagInput
        label="초기값이 있는 상태"
        value={tags2}
        onChange={setTags2}
        placeholder="태그를 입력하세요"
      />

      <TagInput
        label="필수 입력"
        required
        placeholder="태그를 입력하세요"
        value={tags3}
        onChange={setTags3}
      />

      <TagInput
        label="최대 5개 제한"
        maxTags={5}
        placeholder="태그를 입력하세요"
        value={tags4}
        onChange={setTags4}
      />

      <TagInput
        label="제한 없음"
        noLimit
        placeholder="태그를 입력하세요"
        value={tags5}
        onChange={setTags5}
      />

      <TagInput
        label="세로 레이아웃"
        layout="column"
        placeholder="태그를 입력하세요"
        value={tags6}
        onChange={setTags6}
      />

      <TagInput
        label="읽기 전용"
        readOnly
        value={["React", "TypeScript", "Tailwind"]}
      />
    </div>
  );
};

export const AllStates: Story = {
  render: () => <AllStatesExample />,
  parameters: {
    docs: {
      description: {
        story: "모든 TagInput 상태를 한 번에 보여줍니다.",
      },
    },
  },
};
