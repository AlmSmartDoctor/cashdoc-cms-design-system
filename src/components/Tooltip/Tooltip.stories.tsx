import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, Settings, Trash2 } from "lucide-react";
import { Button } from "../Button";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Feedback/Tooltip",
  component: Tooltip,
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
        <Tooltip content="위쪽 툴팁" side="top">
          <Button variant="outline">top</Button>
        </Tooltip>
        <Tooltip content="아래쪽 툴팁" side="bottom">
          <Button variant="outline">bottom</Button>
        </Tooltip>
        <Tooltip content="왼쪽 툴팁" side="left">
          <Button variant="outline">left</Button>
        </Tooltip>
        <Tooltip content="오른쪽 툴팁" side="right">
          <Button variant="outline">right</Button>
        </Tooltip>
      </Row>
      <Row label="아이콘">
        <Tooltip content="더 보기">
          <Button variant="ghost" size="icon">
            <Info className="size-4" />
          </Button>
        </Tooltip>
        <Tooltip content="설정">
          <Button variant="ghost" size="icon">
            <Settings className="size-4" />
          </Button>
        </Tooltip>
        <Tooltip content="삭제 (되돌릴 수 없음)">
          <Button variant="ghost" size="icon">
            <Trash2 className="size-4" />
          </Button>
        </Tooltip>
      </Row>
      <Row label="긴 텍스트">
        <Tooltip content="이 기능은 프리미엄 사용자만 이용할 수 있습니다">
          <Button disabled>프리미엄 기능</Button>
        </Tooltip>
      </Row>
      <Row label="화살표 없음">
        <Tooltip content="화살표 없는 툴팁" showArrow={false}>
          <Button variant="outline">no arrow</Button>
        </Tooltip>
      </Row>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
