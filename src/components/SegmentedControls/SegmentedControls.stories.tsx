import type { Meta, StoryObj } from "@storybook/react";
import SegmentedControls from "./SegmentedControls";
import { useState } from "react";

const meta: Meta<typeof SegmentedControls> = {
  title: "Forms/SegmentedControls",
  component: SegmentedControls,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cms Design System의 세그먼트 컨트롤 컴포넌트입니다. 여러 옵션 중 하나를 선택할 때 사용됩니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SegmentedControls>;

export const Default: Story = {
  args: {
    options: [
      { label: "옵션 1", value: "option1" },
      { label: "옵션 2", value: "option2" },
      { label: "옵션 3", value: "option3" },
    ],
    value: "option1",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <div className="w-100">
        <SegmentedControls
          {...args}
          value={value}
          onChange={(val) => {
            setValue(val);
            args.onChange(val);
          }}
        />
      </div>
    );
  },
};

export const WithContent: Story = {
  args: {
    options: [
      { label: "통합 포인트", value: "all" },
      { label: "무료 포인트", value: "free" },
      { label: "유료 포인트", value: "paid" },
    ],
    value: "all",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    const renderContent = () => {
      switch (value) {
        case "all":
          return (
            <div className="rounded-md border border-blue-100 bg-blue-50 p-4">
              사용자 프로필 설정 화면입니다.
            </div>
          );
        case "free":
          return (
            <div className="rounded-md border border-green-100 bg-green-50 p-4">
              무료 포인트 관련 내용입니다.
            </div>
          );
        case "paid":
          return (
            <div className="rounded-md border border-red-100 bg-red-50 p-4">
              유료 포인트 관련 내용입니다.
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="w-125 space-y-4">
        <SegmentedControls
          {...args}
          value={value}
          onChange={(val: string | number) => {
            setValue(val);
            args.onChange(val);
          }}
        />

        <div className="min-h-25 text-sm text-gray-700">{renderContent()}</div>
      </div>
    );
  },
};

export const ForJsdoc: Story = {
  args: {
    options: [
      { label: "옵션 1", value: "option1" },
      { label: "옵션 2", value: "option2" },
      { label: "옵션 3", value: "option3" },
    ],
    value: "option1",
  },
  render: (args) => {
    return (
      <div className="w-100">
        <SegmentedControls
          {...args}
          value="option1"
          onChange={() => {
            /* empty */
          }}
        />
        <SegmentedControls
          {...args}
          value="option2"
          onChange={() => {
            /* empty */
          }}
        />
        <SegmentedControls
          {...args}
          value="option3"
          onChange={() => {
            /* empty */
          }}
        />
      </div>
    );
  },
};
