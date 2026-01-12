import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "체크박스 컴포넌트입니다. Radix UI를 기반으로 구현되었으며, 접근성을 지원합니다. cashdoc-hospital-event의 yeogiya-admin 디자인을 참조했습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description:
        "체크박스 우측에 표시될 텍스트 레이블입니다. 체크박스의 용도를 명확히 설명하는 문구를 사용하세요. 레이블 클릭 시에도 체크 상태가 전환됩니다.",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "true일 경우 체크박스를 비활성화합니다. 사용자는 상태를 변경할 수 없으며 시각적으로 흐리게 표시됩니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    checked: {
      control: "boolean",
      description:
        "체크박스의 현재 선택 상태입니다. 제어 컴포넌트로 사용할 때 이 값을 통해 상태를 주입합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onCheckedChange: {
      description:
        "체크 상태가 변경될 때 호출되는 콜백 함수입니다. 변경된 상태(boolean)를 인자로 전달받습니다.",
      table: {
        type: { summary: "(checked: boolean) => void" },
      },
    },
    id: {
      control: "text",
      description:
        "체크박스 요소의 고유 식별자입니다. 생략 시 자동으로 생성되어 레이블과 연결됩니다.",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "체크박스 컨테이너에 추가할 커스텀 CSS 클래스입니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "체크박스",
  },
};

export const WithoutLabel: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "레이블 없이 체크박스만 사용하는 예제입니다.",
      },
    },
  },
};

export const Checked: Story = {
  args: {
    label: "선택됨",
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: "체크된 상태의 체크박스입니다.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "비활성화",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "비활성화된 체크박스입니다.",
      },
    },
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "비활성화 (선택됨)",
    disabled: true,
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: "선택된 상태에서 비활성화된 체크박스입니다.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-4">
        <Checkbox
          label="동의합니다"
          checked={checked}
          onCheckedChange={(value) => setChecked(value as boolean)}
        />
        <p className="text-sm text-gray-600">
          현재 상태: {checked ? "선택됨" : "선택 안됨"}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "상태 관리가 가능한 인터랙티브 체크박스입니다. onCheckedChange 콜백을 통해 상태를 제어할 수 있습니다.",
      },
    },
  },
};

export const MultipleCheckboxes: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const toggleItem = (item: string) => {
      setSelectedItems((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
      );
    };

    const items = [
      { id: "terms", label: "이용약관 동의 (필수)" },
      { id: "privacy", label: "개인정보 처리방침 동의 (필수)" },
      { id: "marketing", label: "마케팅 정보 수신 동의 (선택)" },
      { id: "event", label: "이벤트 및 혜택 알림 수신 (선택)" },
    ];

    return (
      <div className="space-y-3">
        {items.map((item) => (
          <Checkbox
            key={item.id}
            label={item.label}
            checked={selectedItems.includes(item.id)}
            onCheckedChange={() => toggleItem(item.id)}
          />
        ))}
        <div className="mt-6 rounded bg-gray-50 p-4">
          <p className="text-sm font-medium">선택된 항목:</p>
          <p className="mt-1 text-sm text-gray-600">
            {selectedItems.length > 0 ? selectedItems.join(", ") : "없음"}
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "여러 개의 체크박스를 그룹으로 관리하는 예제입니다.",
      },
    },
  },
};

export const LongLabel: Story = {
  args: {
    label:
      "개인정보 수집 및 이용에 대한 안내 사항을 모두 확인하였으며, 이에 동의합니다. 수집된 개인정보는 서비스 제공 목적으로만 사용됩니다.",
  },
  parameters: {
    docs: {
      description: {
        story: "긴 텍스트를 가진 레이블 예제입니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const ForJsdoc: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Default" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled Checked" disabled checked />
    </div>
  ),
  parameters: {
    docs: { disable: true },
  },
};
