import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dropdown, Select, Combobox } from "./";

const meta: Meta<typeof Dropdown> = {
  title: "Forms/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cms Design System의 드롭다운 컴포넌트입니다. 다양한 선택 옵션과 고급 기능을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
      description: "드롭다운 트리거 버튼의 시각적 스타일 변형입니다.",
      table: {
        type: { summary: "default | outline | ghost" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "드롭다운 트리거 버튼의 크기입니다.",
      table: {
        type: { summary: "sm | default | lg" },
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: "boolean",
      description: "true일 경우 드롭다운을 비활성화하여 열 수 없게 합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    searchable: {
      control: "boolean",
      description:
        "true일 경우 드롭다운 내부에 검색 입력창이 표시되어 옵션을 필터링할 수 있습니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    clearable: {
      control: "boolean",
      description:
        "true일 경우 선택된 값을 지울 수 있는 'X' 버튼이 트리거 우측에 표시됩니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    multiple: {
      control: "boolean",
      description:
        "true일 경우 여러 개의 옵션을 선택할 수 있습니다. 선택된 값들은 쉼표(,)로 구분된 문자열로 관리됩니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    options: {
      description: "드롭다운에 표시될 옵션 목록입니다.",
      table: {
        type: { summary: "DropdownOption[]" },
      },
    },
    value: {
      control: "text",
      description: "현재 선택된 값입니다.",
      table: {
        type: { summary: "string" },
      },
    },
    onValueChange: {
      description: "선택된 값이 변경될 때 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
    placeholder: {
      control: "text",
      description: "값이 선택되지 않았을 때 표시될 힌트 텍스트입니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "선택하세요" },
      },
    },
    maxHeight: {
      control: "number",
      description: "옵션 목록 레이어의 최대 높이(px)를 설정합니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "200" },
      },
    },
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

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: "프레임워크를 선택하세요",
  },
};

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: "react",
    placeholder: "프레임워크를 선택하세요",
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    disabled: true,
    placeholder: "비활성화된 드롭다운",
  },
};

const VariantsStory = () => {
  const [values, setValues] = useState({
    default: "",
    outline: "",
    ghost: "",
  });

  return (
    <div className="w-64 space-y-4">
      <Dropdown
        options={sampleOptions}
        value={values.default}
        onValueChange={(value) =>
          setValues((prev) => ({ ...prev, default: value }))
        }
        placeholder="Default"
        variant="default"
      />
      <Dropdown
        options={sampleOptions}
        value={values.outline}
        onValueChange={(value) =>
          setValues((prev) => ({ ...prev, outline: value }))
        }
        placeholder="Outline"
        variant="outline"
      />
      <Dropdown
        options={sampleOptions}
        value={values.ghost}
        onValueChange={(value) =>
          setValues((prev) => ({ ...prev, ghost: value }))
        }
        placeholder="Ghost"
        variant="ghost"
      />
    </div>
  );
};

export const Variants: Story = {
  render: () => <VariantsStory />,
  parameters: {
    docs: {
      description: {
        story: "다양한 드롭다운 스타일 변형을 보여줍니다.",
      },
    },
  },
};

const SizesStory = () => {
  const [values, setValues] = useState({ sm: "", default: "", lg: "" });

  return (
    <div className="w-64 space-y-4">
      <Dropdown
        options={sampleOptions}
        value={values.sm}
        onValueChange={(value) => setValues((prev) => ({ ...prev, sm: value }))}
        placeholder="Small"
        size="sm"
      />
      <Dropdown
        options={sampleOptions}
        value={values.default}
        onValueChange={(value) =>
          setValues((prev) => ({ ...prev, default: value }))
        }
        placeholder="Default"
        size="default"
      />
      <Dropdown
        options={sampleOptions}
        value={values.lg}
        onValueChange={(value) => setValues((prev) => ({ ...prev, lg: value }))}
        placeholder="Large"
        size="lg"
      />
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesStory />,
  parameters: {
    docs: {
      description: {
        story: "다양한 드롭다운 크기를 보여줍니다.",
      },
    },
  },
};

const SearchableStory = () => {
  const [value, setValue] = useState("");

  const largeOptions = [
    ...sampleOptions,
    { value: "ember", label: "Ember.js" },
    { value: "backbone", label: "Backbone.js" },
    { value: "jquery", label: "jQuery" },
    { value: "vanilla", label: "Vanilla JS" },
    { value: "alpine", label: "Alpine.js" },
  ];

  return (
    <div className="w-64">
      <Dropdown
        options={largeOptions}
        value={value}
        onValueChange={setValue}
        placeholder="검색 가능한 드롭다운"
        searchable
      />
      <p className="text-grayscale03 mt-2 text-sm">
        선택된 값: {value || "없음"}
      </p>
    </div>
  );
};

export const Searchable: Story = {
  render: () => <SearchableStory />,
  parameters: {
    docs: {
      description: {
        story:
          "검색 기능이 활성화된 드롭다운입니다. 옵션이 많을 때 유용합니다.",
      },
    },
  },
};

const ClearableStory = () => {
  const [value, setValue] = useState("react");

  return (
    <div className="w-64">
      <Dropdown
        options={sampleOptions}
        value={value}
        onValueChange={setValue}
        placeholder="선택 취소 가능"
        clearable
      />
      <p className="text-grayscale03 mt-2 text-sm">
        선택된 값: {value || "없음"}
      </p>
    </div>
  );
};

export const Clearable: Story = {
  render: () => <ClearableStory />,
  parameters: {
    docs: {
      description: {
        story: "선택된 값을 쉽게 취소할 수 있는 드롭다운입니다.",
      },
    },
  },
};

const MultipleStory = () => {
  const [value, setValue] = useState("react,vue");

  return (
    <div className="w-64">
      <Dropdown
        options={sampleOptions}
        value={value}
        onValueChange={setValue}
        placeholder="다중 선택"
        multiple
        clearable
      />
      <p className="text-grayscale03 mt-2 text-sm">
        선택된 값들: {value || "없음"}
      </p>
    </div>
  );
};

export const Multiple: Story = {
  render: () => <MultipleStory />,
  parameters: {
    docs: {
      description: {
        story: "여러 옵션을 동시에 선택할 수 있는 드롭다운입니다.",
      },
    },
  },
};

const SelectComponentStory = () => {
  const [value, setValue] = useState("");
  const [errorValue, setErrorValue] = useState("");

  return (
    <div className="w-64 space-y-6">
      <Select
        options={sampleOptions}
        value={value}
        onValueChange={setValue}
        label="프레임워크 선택"
        placeholder="선택하세요"
        helperText="사용하고 싶은 프레임워크를 선택해주세요"
        required
      />

      <Select
        options={sampleOptions}
        value={errorValue}
        onValueChange={setErrorValue}
        label="필수 선택"
        placeholder="선택하세요"
        error="프레임워크를 선택해주세요"
        required
      />
    </div>
  );
};

export const SelectComponent: Story = {
  render: () => <SelectComponentStory />,
  parameters: {
    docs: {
      description: {
        story:
          "Select 컴포넌트는 라벨, 도움말 텍스트, 에러 메시지를 포함한 완전한 폼 필드입니다.",
      },
    },
  },
};

const ComboboxComponentStory = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState(sampleOptions);

  const handleCreateOption = (newValue: string) => {
    const newOption = {
      value: newValue.toLowerCase().replace(/\s+/g, "-"),
      label: newValue,
    };
    setOptions((prev) => [...prev, newOption]);
    setValue(newOption.value);
  };

  return (
    <div className="w-64">
      <Combobox
        options={options}
        value={value}
        onValueChange={setValue}
        placeholder="검색하거나 새로 생성"
        createable
        onCreateOption={handleCreateOption}
      />
      <p className="text-grayscale03 mt-2 text-sm">
        선택된 값: {value || "없음"}
      </p>
      <p className="text-grayscale03 mt-1 text-xs">
        검색해서 없으면 새로 만들 수 있습니다
      </p>
    </div>
  );
};

export const ComboboxComponent: Story = {
  render: () => <ComboboxComponentStory />,
  parameters: {
    docs: {
      description: {
        story: "Combobox는 검색과 동적 옵션 생성이 가능한 고급 드롭다운입니다.",
      },
    },
  },
};

const DisabledOptionsStory = () => {
  const [value, setValue] = useState("");

  const optionsWithDisabled = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js", disabled: true },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte", disabled: true },
    { value: "next", label: "Next.js" },
  ];

  return (
    <div className="w-64">
      <Dropdown
        options={optionsWithDisabled}
        value={value}
        onValueChange={setValue}
        placeholder="일부 옵션 비활성화"
      />
      <p className="text-grayscale03 mt-2 text-sm">
        Vue.js와 Svelte는 선택할 수 없습니다
      </p>
    </div>
  );
};

export const DisabledOptions: Story = {
  render: () => <DisabledOptionsStory />,
  parameters: {
    docs: {
      description: {
        story: "일부 옵션을 비활성화할 수 있습니다.",
      },
    },
  },
};

const ComprehensiveExampleStory = () => {
  const [formData, setFormData] = useState({
    framework: "",
    language: "",
    tools: "",
    experience: "",
  });

  const frameworks = sampleOptions;
  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
  ];
  const tools = [
    { value: "vscode", label: "VS Code" },
    { value: "webstorm", label: "WebStorm" },
    { value: "sublime", label: "Sublime Text" },
    { value: "vim", label: "Vim" },
    { value: "emacs", label: "Emacs" },
  ];
  const experience = [
    { value: "0-1", label: "0-1년" },
    { value: "1-3", label: "1-3년" },
    { value: "3-5", label: "3-5년" },
    { value: "5+", label: "5년 이상" },
  ];

  return (
    <div className="max-w-lg space-y-6">
      <h2 className="text-xl font-bold">개발자 설문조사</h2>

      <Select
        options={frameworks}
        value={formData.framework}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, framework: value }))
        }
        label="선호하는 프론트엔드 프레임워크"
        placeholder="프레임워크를 선택하세요"
        required
      />

      <Select
        options={languages}
        value={formData.language}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, language: value }))
        }
        label="주로 사용하는 프로그래밍 언어"
        placeholder="언어를 선택하세요"
        variant="outline"
      />

      <div>
        <label className="text-foreground mb-1 block text-sm font-medium">
          사용하는 도구들 (다중 선택 가능)
        </label>
        <Dropdown
          options={tools}
          value={formData.tools}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, tools: value }))
          }
          placeholder="도구들을 선택하세요"
          multiple
          clearable
          searchable
        />
      </div>

      <Select
        options={experience}
        value={formData.experience}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, experience: value }))
        }
        label="개발 경력"
        placeholder="경력을 선택하세요"
        size="lg"
      />

      <div className="bg-grayscale01 mt-6 rounded-lg p-4">
        <h3 className="mb-2 font-medium">선택된 값들:</h3>
        <ul className="space-y-1 text-sm">
          <li>프레임워크: {formData.framework || "미선택"}</li>
          <li>언어: {formData.language || "미선택"}</li>
          <li>도구들: {formData.tools || "미선택"}</li>
          <li>경력: {formData.experience || "미선택"}</li>
        </ul>
      </div>
    </div>
  );
};

export const ComprehensiveExample: Story = {
  render: () => <ComprehensiveExampleStory />,
  parameters: {
    docs: {
      description: {
        story: "실제 폼에서 사용되는 종합적인 예제입니다.",
      },
    },
  },
};

export const ForJsdoc: Story = {
  parameters: {
    docs: { disable: true },
    layout: "centered",
  },
  render: () => (
    <div className="flex h-75 w-full items-start justify-center pt-10">
      <Dropdown
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
        placeholder="Select Option"
        defaultOpen={true}
      />
    </div>
  ),
};

const SubmenuStory = () => {
  const [value, setValue] = useState("");

  const optionsWithSubmenu = [
    { value: "home", label: "홈" },
    {
      value: "products",
      label: "제품",
      children: [
        { value: "product-a", label: "제품 A" },
        { value: "product-b", label: "제품 B" },
        { value: "product-c", label: "제품 C" },
      ],
    },
    {
      value: "services",
      label: "서비스",
      children: [
        { value: "service-consulting", label: "컨설팅" },
        { value: "service-development", label: "개발" },
        { value: "service-support", label: "지원", disabled: true },
      ],
    },
    { value: "about", label: "회사 소개" },
    { value: "contact", label: "연락처" },
  ];

  return (
    <div className="w-64">
      <Dropdown
        options={optionsWithSubmenu}
        value={value}
        onValueChange={setValue}
        placeholder="메뉴를 선택하세요"
      />
      <p className="text-grayscale03 mt-2 text-sm">
        선택된 값: {value || "없음"}
      </p>
    </div>
  );
};

export const Submenu: Story = {
  render: () => <SubmenuStory />,
  parameters: {
    docs: {
      description: {
        story:
          "서브메뉴가 있는 드롭다운입니다. 옵션에 마우스를 올리면 서브메뉴가 표시됩니다.",
      },
    },
  },
};
