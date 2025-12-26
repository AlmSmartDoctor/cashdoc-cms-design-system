import type { Meta, StoryObj } from "@storybook/react";
import { ToolTip } from "./ToolTip";
import { Button } from "../Button";
import { Info, Settings, Download, Trash2 } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof ToolTip> = {
  title: "Components/ToolTip",
  component: ToolTip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "마우스 호버나 포커스 시 간단한 힌트나 설명을 제공하는 툴팁 컴포넌트입니다. 아이콘 버튼 설명, 축약된 텍스트 전체 보기, UI 요소에 대한 추가 정보 제공 등에 활용할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "툴팁을 트리거하는 요소입니다.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    content: {
      control: "text",
      description: "툴팁에 표시할 내용입니다.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    side: {
      control: "radio",
      options: ["top", "right", "bottom", "left"],
      description: "툴팁이 나타날 위치입니다.",
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: "'top'" },
      },
    },
    sideOffset: {
      control: "number",
      description: "트리거로부터의 거리(픽셀)입니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "4" },
      },
    },
    align: {
      control: "radio",
      options: ["start", "center", "end"],
      description: "트리거와의 정렬 방식입니다.",
      table: {
        type: { summary: "'start' | 'center' | 'end'" },
        defaultValue: { summary: "'center'" },
      },
    },
    delayDuration: {
      control: "number",
      description:
        "마우스 호버 후 툴팁이 나타나기까지의 지연 시간(밀리초)입니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "200" },
      },
    },
    skipDelayDuration: {
      control: "number",
      description:
        "다른 툴팁에서 빠르게 진입 시 지연 건너뛰기 시간(밀리초)입니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "300" },
      },
    },
    disableHoverableContent: {
      control: "boolean",
      description: "툴팁 위로 마우스를 이동할 수 있는지 여부입니다.",
      table: {
        type: { summary: "boolean" },
      },
    },
    showArrow: {
      control: "boolean",
      description: "화살표 표시 여부입니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    open: {
      control: "boolean",
      description: "Controlled 모드: 툴팁 열림 상태입니다.",
      table: {
        type: { summary: "boolean" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Uncontrolled 모드: 초기 열림 상태입니다.",
      table: {
        type: { summary: "boolean" },
      },
    },
    onOpenChange: {
      description: "툴팁 열림 상태 변경 시 콜백 함수입니다.",
      table: {
        type: { summary: "(open: boolean) => void" },
      },
    },
    className: {
      control: "text",
      description: "툴팁 컨텐츠에 추가할 커스텀 CSS 클래스입니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToolTip content="설정 페이지로 이동합니다">
      <Button variant="ghost" size="icon">
        <Settings className="h-4 w-4" />
      </Button>
    </ToolTip>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본 툴팁입니다. 마우스를 올리면 상단에 툴팁이 나타납니다.",
      },
    },
  },
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-12">
      <ToolTip content="상단 툴팁" side="top">
        <Button variant="outline">Top</Button>
      </ToolTip>
      <div className="flex gap-12">
        <ToolTip content="왼쪽 툴팁" side="left">
          <Button variant="outline">Left</Button>
        </ToolTip>
        <ToolTip content="오른쪽 툴팁" side="right">
          <Button variant="outline">Right</Button>
        </ToolTip>
      </div>
      <ToolTip content="하단 툴팁" side="bottom">
        <Button variant="outline">Bottom</Button>
      </ToolTip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "툴팁의 위치를 상하좌우로 지정할 수 있습니다. side prop을 사용하여 원하는 방향을 설정하세요.",
      },
    },
  },
};

export const WithDelay: Story = {
  render: () => (
    <div className="flex gap-4">
      <ToolTip content="즉시 표시" delayDuration={0}>
        <Button variant="outline">즉시 (0ms)</Button>
      </ToolTip>
      <ToolTip content="기본 지연" delayDuration={200}>
        <Button variant="outline">기본 (200ms)</Button>
      </ToolTip>
      <ToolTip content="느린 지연" delayDuration={700}>
        <Button variant="outline">느림 (700ms)</Button>
      </ToolTip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "delayDuration prop으로 툴팁이 나타나기까지의 지연 시간을 조절할 수 있습니다. 우발적인 호버로 인한 깜빡임을 방지하는 데 유용합니다.",
      },
    },
  },
};

export const LongContent: Story = {
  render: () => (
    <ToolTip content="이 기능은 관리자 권한이 필요합니다. 권한이 없는 사용자는 실행할 수 없으며, 관리자에게 문의하세요.">
      <Button variant="outline">
        <Info className="mr-2 h-4 w-4" />
        권한 필요
      </Button>
    </ToolTip>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "긴 텍스트도 표시할 수 있습니다. 툴팁은 max-w-xs 클래스로 최대 너비가 제한되어 있어 자동으로 줄바꿈됩니다.",
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <ToolTip content="다운로드">
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </ToolTip>
      <ToolTip content="설정">
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </ToolTip>
      <ToolTip content="삭제" side="bottom">
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </ToolTip>
      <ToolTip content="정보">
        <Button variant="ghost" size="icon">
          <Info className="h-4 w-4" />
        </Button>
      </ToolTip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "아이콘 버튼과 함께 사용하는 가장 일반적인 패턴입니다. 아이콘만으로는 기능을 알기 어려울 때 툴팁으로 설명을 제공합니다.",
      },
    },
  },
};

export const WithoutArrow: Story = {
  render: () => (
    <div className="flex gap-4">
      <ToolTip content="화살표 있음" showArrow={true}>
        <Button variant="outline">화살표 있음</Button>
      </ToolTip>
      <ToolTip content="화살표 없음" showArrow={false}>
        <Button variant="outline">화살표 없음</Button>
      </ToolTip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "showArrow prop을 false로 설정하면 화살표를 숨길 수 있습니다. 미니멀한 디자인이 필요할 때 유용합니다.",
      },
    },
  },
};

export const DifferentAlignments: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToolTip content="시작 정렬" align="start" side="bottom">
        <Button variant="outline">Align Start</Button>
      </ToolTip>
      <ToolTip content="중앙 정렬" align="center" side="bottom">
        <Button variant="outline">Align Center</Button>
      </ToolTip>
      <ToolTip content="끝 정렬" align="end" side="bottom">
        <Button variant="outline">Align End</Button>
      </ToolTip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "align prop으로 툴팁의 정렬 방식을 조절할 수 있습니다. 기본값은 center입니다.",
      },
    },
  },
};

export const OnTextElement: Story = {
  render: () => (
    <div className="w-64 p-4 border rounded">
      <p className="text-sm">
        이 문장에는{" "}
        <ToolTip content="여기에 추가 설명이 표시됩니다">
          <span className="underline decoration-dashed cursor-help">
            툴팁이 있는 텍스트
          </span>
        </ToolTip>
        가 포함되어 있습니다.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "텍스트 요소에도 툴팁을 적용할 수 있습니다. 용어 설명이나 추가 정보를 제공할 때 유용합니다.",
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-4 items-center">
        <ToolTip
          content="프로그래밍으로 제어되는 툴팁입니다"
          open={open}
          onOpenChange={setOpen}
        >
          <Button variant="outline">Controlled ToolTip</Button>
        </ToolTip>
        <div className="flex gap-2">
          <Button
            onClick={() => setOpen(true)}
            variant="secondary"
            size="sm"
          >
            열기
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="secondary"
            size="sm"
          >
            닫기
          </Button>
          <Button
            onClick={() => setOpen(!open)}
            variant="secondary"
            size="sm"
          >
            토글
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          현재 상태: {open ? "열림" : "닫힘"}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "open과 onOpenChange prop을 사용하여 프로그래밍 방식으로 툴팁을 제어할 수 있습니다.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">기본 위치 (Top)</h3>
        <ToolTip content="기본 툴팁">
          <Button variant="outline">Hover me</Button>
        </ToolTip>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">다양한 위치</h3>
        <div className="flex gap-3">
          <ToolTip content="상단" side="top">
            <Button variant="outline" size="sm">
              Top
            </Button>
          </ToolTip>
          <ToolTip content="오른쪽" side="right">
            <Button variant="outline" size="sm">
              Right
            </Button>
          </ToolTip>
          <ToolTip content="하단" side="bottom">
            <Button variant="outline" size="sm">
              Bottom
            </Button>
          </ToolTip>
          <ToolTip content="왼쪽" side="left">
            <Button variant="outline" size="sm">
              Left
            </Button>
          </ToolTip>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">아이콘 버튼</h3>
        <div className="flex gap-2">
          <ToolTip content="설정">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </ToolTip>
          <ToolTip content="다운로드">
            <Button variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </ToolTip>
          <ToolTip content="정보">
            <Button variant="ghost" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </ToolTip>
          <ToolTip content="삭제">
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </ToolTip>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">긴 텍스트</h3>
        <ToolTip content="이 버튼을 클릭하면 현재 설정이 저장되고 메인 페이지로 이동합니다. 저장되지 않은 변경사항이 있다면 경고 메시지가 표시됩니다.">
          <Button variant="outline">긴 설명 보기</Button>
        </ToolTip>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">화살표 없음</h3>
        <ToolTip content="미니멀한 툴팁" showArrow={false}>
          <Button variant="outline">No Arrow</Button>
        </ToolTip>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">지연 시간 커스텀</h3>
        <div className="flex gap-2">
          <ToolTip content="즉시" delayDuration={0}>
            <Button variant="outline" size="sm">
              즉시
            </Button>
          </ToolTip>
          <ToolTip content="보통" delayDuration={200}>
            <Button variant="outline" size="sm">
              보통
            </Button>
          </ToolTip>
          <ToolTip content="느림" delayDuration={700}>
            <Button variant="outline" size="sm">
              느림
            </Button>
          </ToolTip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "ToolTip 컴포넌트의 다양한 사용 예시를 한눈에 볼 수 있습니다.",
      },
    },
  },
};
