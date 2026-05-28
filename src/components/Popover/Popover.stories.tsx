import type { Meta, StoryObj } from "@storybook/react";
import {
  Copy,
  Edit,
  Heart,
  MoreVertical,
  Share2,
  Trash2,
} from "lucide-react";
import { Button } from "../Button";
import { Popover, PopoverContent, PopoverMenuItem, PopoverTrigger } from "./";

const meta: Meta<typeof Popover> = {
  title: "Feedback/Popover",
  component: Popover,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "트리거 근처에 부가 컨트롤을 표시하는 플로팅 컴포넌트입니다. '더 보기' 메뉴나 간단한 설정 창에 사용합니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Cell = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col items-start gap-2">
    <span className="text-[12px] font-medium text-cms-gray-550">{label}</span>
    {children}
  </div>
);

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-10 py-8">
      <Cell label="기본 (2 actions)">
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverMenuItem icon={<Edit className="size-4" />}>
              수정하기
            </PopoverMenuItem>
            <PopoverMenuItem
              variant="destructive"
              icon={<Trash2 className="size-4" />}
            >
              삭제하기
            </PopoverMenuItem>
          </PopoverContent>
        </Popover>
      </Cell>

      <Cell label="다중 액션">
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button variant="outline">메뉴 열기</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverMenuItem icon={<Edit className="size-4" />}>
              수정하기
            </PopoverMenuItem>
            <PopoverMenuItem icon={<Copy className="size-4" />}>
              복사하기
            </PopoverMenuItem>
            <PopoverMenuItem icon={<Share2 className="size-4" />}>
              공유하기
            </PopoverMenuItem>
            <PopoverMenuItem icon={<Heart className="size-4" />}>
              즐겨찾기
            </PopoverMenuItem>
            <PopoverMenuItem
              variant="destructive"
              icon={<Trash2 className="size-4" />}
            >
              삭제하기
            </PopoverMenuItem>
          </PopoverContent>
        </Popover>
      </Cell>

      <Cell label="콘텐츠 팝오버">
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button variant="outline">상세 정보</Button>
          </PopoverTrigger>
          <PopoverContent className="p-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-cms-gray-900">
                계정 상태
              </span>
              <span className="text-[13px] text-cms-gray-700">
                현재 활성화된 계정입니다. 마지막 로그인 2분 전.
              </span>
            </div>
          </PopoverContent>
        </Popover>
      </Cell>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
