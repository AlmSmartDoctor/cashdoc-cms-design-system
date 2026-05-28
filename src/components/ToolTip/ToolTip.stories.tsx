import type { Meta, StoryObj } from "@storybook/react";
import { Info, Settings, Trash2 } from "lucide-react";
import { Button } from "../Button";
import { ToolTip } from "./ToolTip";

const meta: Meta<typeof ToolTip> = {
  title: "Feedback/ToolTip",
  component: ToolTip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "마우스 호버나 포커스 시 간단한 힌트를 제공하는 툴팁 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
    side: {
      control: "radio",
      options: ["top", "right", "bottom", "left"],
      table: { defaultValue: { summary: "top" } },
    },
    align: {
      control: "radio",
      options: ["start", "center", "end"],
      table: { defaultValue: { summary: "center" } },
    },
    showArrow: { control: "boolean", table: { defaultValue: { summary: "true" } } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-6">
    <span className="w-20 shrink-0 text-[12px] font-medium text-cms-gray-550">
      {label}
    </span>
    <div className="flex flex-wrap items-center gap-8">{children}</div>
  </div>
);

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-10 py-12">
      <Row label="Side">
        <ToolTip content="위쪽 툴팁" side="top">
          <Button variant="outline">top</Button>
        </ToolTip>
        <ToolTip content="아래쪽 툴팁" side="bottom">
          <Button variant="outline">bottom</Button>
        </ToolTip>
        <ToolTip content="왼쪽 툴팁" side="left">
          <Button variant="outline">left</Button>
        </ToolTip>
        <ToolTip content="오른쪽 툴팁" side="right">
          <Button variant="outline">right</Button>
        </ToolTip>
      </Row>
      <Row label="아이콘">
        <ToolTip content="더 보기">
          <Button variant="ghost" size="icon">
            <Info className="size-4" />
          </Button>
        </ToolTip>
        <ToolTip content="설정">
          <Button variant="ghost" size="icon">
            <Settings className="size-4" />
          </Button>
        </ToolTip>
        <ToolTip content="삭제 (되돌릴 수 없음)">
          <Button variant="ghost" size="icon">
            <Trash2 className="size-4" />
          </Button>
        </ToolTip>
      </Row>
      <Row label="긴 텍스트">
        <ToolTip content="이 기능은 프리미엄 사용자만 이용할 수 있습니다">
          <Button disabled>프리미엄 기능</Button>
        </ToolTip>
      </Row>
      <Row label="화살표 없음">
        <ToolTip content="화살표 없는 툴팁" showArrow={false}>
          <Button variant="outline">no arrow</Button>
        </ToolTip>
      </Row>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
