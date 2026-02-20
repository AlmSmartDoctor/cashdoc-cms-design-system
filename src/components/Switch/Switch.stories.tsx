import type { Meta, StoryObj } from "@storybook/react";
import { Switch, type SwitchProps } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cms Design System의 스위치 컴포넌트입니다. 기본 토글 기능과 함께 가변 길이(width), 내부 상태 텍스트(checkedLabel/uncheckedLabel)를 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "green", "black", "blue", "red"],
      description: "스위치가 'On' 상태일 때의 배경 색상을 설정합니다.",
      table: {
        type: { summary: "default | green | black | blue | red" },
        defaultValue: { summary: "default" },
      },
    },
    width: {
      control: "text",
      description:
        "스위치 가로 길이입니다. number는 px 단위로 처리되며 string은 CSS 길이값(예: 96px, 7rem)으로 사용할 수 있습니다.",
      table: {
        type: { summary: "number | string" },
        defaultValue: { summary: "40" },
      },
    },
    checkedLabel: {
      control: "text",
      description:
        "스위치가 켜져 있을 때(thumb가 오른쪽일 때) 왼쪽 빈 영역에 표시되는 텍스트입니다.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    uncheckedLabel: {
      control: "text",
      description:
        "스위치가 꺼져 있을 때(thumb가 왼쪽일 때) 오른쪽 빈 영역에 표시되는 텍스트입니다.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    checked: {
      control: "boolean",
      description:
        "스위치의 현재 상태(On/Off)입니다. 제어 컴포넌트로 사용할 때 이 값을 통해 상태를 주입합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onCheckedChange: {
      description: "스위치 상태가 변경될 때 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(checked: boolean) => void" },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "true일 경우 사용자의 조작을 차단하고 시각적으로 흐리게 표시합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "스위치 요소에 추가할 커스텀 CSS 클래스입니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Green: Story = {
  args: {
    variant: "green",
    checked: true,
  },
};

export const Black: Story = {
  args: {
    variant: "black",
    checked: true,
  },
};

export const Blue: Story = {
  args: {
    variant: "blue",
    checked: true,
  },
};

export const Red: Story = {
  args: {
    variant: "red",
    checked: true,
  },
};

export const WithInnerLabels: Story = {
  args: {
    variant: "green",
    width: 96,
    checkedLabel: "노출",
    uncheckedLabel: "미노출",
  },
};

export const WithLongUncheckedLabel: Story = {
  args: {
    variant: "default",
    width: 128,
    checkedLabel: "ON",
    uncheckedLabel: "미노출 상태",
  },
};

export const WidthShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <span className="text-cms-sm w-14">64px</span>
        <Switch width={64} />
        <Switch width={64} checked />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-cms-sm w-14">96px</span>
        <Switch width={96} />
        <Switch width={96} checked />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-cms-sm w-14">140px</span>
        <Switch width={140} />
        <Switch width={140} checked />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-cms-sm w-14">8rem</span>
        <Switch width="8rem" />
        <Switch width="8rem" checked />
      </div>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story:
          "width prop으로 가로 길이를 자유롭게 조절할 수 있습니다. number(px)와 string(CSS 단위) 모두 지원합니다.",
      },
    },
  },
};

export const InnerLabelStateComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <span className="text-cms-sm w-14">Unchecked</span>
        <Switch width={96} checkedLabel="노출" uncheckedLabel="미노출" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-cms-sm w-14">Checked</span>
        <Switch
          width={96}
          checked
          checkedLabel="노출"
          uncheckedLabel="미노출"
        />
      </div>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story:
          "상태에 따라 스위치 내부의 빈 영역(왼쪽/오른쪽)에 텍스트가 교체되어 노출되는 예제입니다.",
      },
    },
  },
};

export const InnerLabelVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <Switch
          variant="default"
          width={104}
          checked
          checkedLabel="노출"
          uncheckedLabel="미노출"
        />
        <Switch
          variant="green"
          width={104}
          checked
          checkedLabel="노출"
          uncheckedLabel="미노출"
        />
        <Switch
          variant="black"
          width={104}
          checked
          checkedLabel="노출"
          uncheckedLabel="미노출"
        />
        <Switch
          variant="blue"
          width={104}
          checked
          checkedLabel="노출"
          uncheckedLabel="미노출"
        />
        <Switch
          variant="red"
          width={104}
          checked
          checkedLabel="노출"
          uncheckedLabel="미노출"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Switch
          variant="default"
          width={104}
          checkedLabel="노출"
          uncheckedLabel="미노출"
        />
        <Switch
          variant="green"
          width={104}
          checkedLabel="노출"
          uncheckedLabel="미노출"
        />
        <Switch
          variant="black"
          width={104}
          checkedLabel="노출"
          uncheckedLabel="미노출"
        />
        <Switch
          variant="blue"
          width={104}
          checkedLabel="노출"
          uncheckedLabel="미노출"
        />
        <Switch
          variant="red"
          width={104}
          checkedLabel="노출"
          uncheckedLabel="미노출"
        />
      </div>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story:
          "내부 텍스트 기능을 기존 variant 색상과 함께 사용할 수 있는지 보여주는 예제입니다.",
      },
    },
  },
};

export const LongLabelCentering: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <span className="text-cms-sm w-20">길이 120</span>
        <Switch
          width={120}
          checkedLabel="ON"
          uncheckedLabel="비노출 상태"
          checked={false}
        />
        <Switch
          width={120}
          checkedLabel="ON"
          uncheckedLabel="비노출 상태"
          checked
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-cms-sm w-20">길이 160</span>
        <Switch
          width={160}
          checkedLabel="ON"
          uncheckedLabel="비노출 상태"
          checked={false}
        />
        <Switch
          width={160}
          checkedLabel="ON"
          uncheckedLabel="비노출 상태"
          checked
        />
      </div>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story:
          "켜짐/꺼짐 텍스트 길이가 달라도 내부 빈 영역 기준으로 중앙 정렬되어 표시되는 예제입니다.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

const LabeledSwitch = (props: SwitchProps & { label: string }) => (
  <div className="flex items-center space-x-2">
    <Switch {...props} id={props.label} />
    <label htmlFor={props.label} className="text-cms-sm min-w-12 capitalize">
      {props.label}
    </label>
  </div>
);

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-cms-md font-semibold">체크</h3>
      <div className="flex flex-wrap items-center gap-4">
        <LabeledSwitch variant="default" label="기본" checked />
        <LabeledSwitch variant="green" label="초록" checked />
        <LabeledSwitch variant="black" label="검정" checked />
        <LabeledSwitch variant="blue" label="파랑" checked />
        <LabeledSwitch variant="red" label="빨강" checked />
      </div>
      <h3 className="text-cms-md mt-4 font-semibold">체크 해제</h3>
      <div className="flex flex-wrap items-center gap-4">
        <LabeledSwitch variant="default" label="기본" checked={false} />
        <LabeledSwitch variant="green" label="초록" checked={false} />
        <LabeledSwitch variant="black" label="검정" checked={false} />
        <LabeledSwitch variant="blue" label="파랑" checked={false} />
        <LabeledSwitch variant="red" label="빨강" checked={false} />
      </div>
      <h3 className="text-cms-md mt-4 font-semibold">비활성화</h3>
      <div className="flex flex-wrap items-center gap-4">
        <LabeledSwitch variant="default" label="체크 해제" disabled />
        <LabeledSwitch variant="default" label="체크" disabled checked />
      </div>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story: "모든 스위치 변형을 한 번에 보여줍니다.",
      },
    },
  },
};

export const ForJsdoc: Story = {
  render: () => (
    <div className="flex flex-col gap-5 p-4">
      <div>
        <h3 className="text-cms-md mb-2 font-semibold">기본 Variant</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Switch variant="default" checked />
          <Switch variant="green" checked />
          <Switch variant="black" checked />
          <Switch variant="blue" checked />
          <Switch variant="red" checked />
        </div>
      </div>

      <div>
        <h3 className="text-cms-md mb-2 font-semibold">길이 조절</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-cms-sm w-12">96px</span>
            <Switch width={96} />
            <Switch width={96} checked />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-cms-sm w-12">128px</span>
            <Switch width={128} />
            <Switch width={128} checked />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-cms-md mb-2 font-semibold">내부 텍스트</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Switch width={104} checkedLabel="노출" uncheckedLabel="미노출" />
            <Switch
              width={104}
              checked
              checkedLabel="노출"
              uncheckedLabel="미노출"
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              variant="blue"
              width={140}
              checkedLabel="ON"
              uncheckedLabel="미노출 상태"
            />
            <Switch
              variant="blue"
              width={140}
              checked
              checkedLabel="ON"
              uncheckedLabel="미노출 상태"
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: { disable: true },
    controls: { hideNoControlsWarning: true },
  },
};
