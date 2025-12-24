import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverMenuItem } from "./";
import { MoreVertical, Trash2, Edit, Heart, Share2, Copy } from "lucide-react";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "특정 요소 근처에 부가적인 정보나 컨트롤을 표시하는 플로팅 컴포넌트입니다. 주로 '더 보기' 메뉴나 간단한 설정 창을 구현할 때 사용합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description:
        "Popover의 트리거와 콘텐츠를 포함하는 요소입니다. 보통 PopoverTrigger와 PopoverContent가 자식으로 옵니다.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    open: {
      control: "boolean",
      description: "팝오버의 열림/닫힘 상태를 외부에서 제어할 때 사용합니다.",
      table: {
        type: { summary: "boolean" },
      },
    },
    onOpenChange: {
      description: "팝오버의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(open: boolean) => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 케밥 메뉴 예제
export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Popover>
        <PopoverTrigger className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-grayscale-200 transition-colors">
          <MoreVertical className="h-5 w-5" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverMenuItem
            variant="destructive"
            icon={<Trash2 className="h-5 w-5" />}
          >
            삭제하기
          </PopoverMenuItem>
          <PopoverMenuItem icon={<Edit className="h-5 w-5" />}>
            수정하기
          </PopoverMenuItem>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

// 다양한 액션이 있는 예제
export const WithMultipleActions: Story = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Popover>
        <PopoverTrigger className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-grayscale-200 transition-colors">
          <MoreVertical className="h-5 w-5" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverMenuItem icon={<Edit className="h-5 w-5" />}>
            수정하기
          </PopoverMenuItem>
          <PopoverMenuItem icon={<Copy className="h-5 w-5" />}>
            복사하기
          </PopoverMenuItem>
          <PopoverMenuItem icon={<Share2 className="h-5 w-5" />}>
            공유하기
          </PopoverMenuItem>
          <PopoverMenuItem icon={<Heart className="h-5 w-5" />}>
            즐겨찾기
          </PopoverMenuItem>
          <PopoverMenuItem
            variant="destructive"
            icon={<Trash2 className="h-5 w-5" />}
          >
            삭제하기
          </PopoverMenuItem>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

// 카드 위의 케밥 메뉴 예제
export const OnCard: Story = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <div className="relative w-80 rounded-2xl border border-grayscale-200 bg-white p-6 shadow-sm">
        <div className="absolute top-4 right-4">
          <Popover>
            <PopoverTrigger className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-grayscale-200 transition-colors">
              <MoreVertical className="h-5 w-5" />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverMenuItem
                variant="destructive"
                icon={<Trash2 className="h-5 w-5" />}
                onClick={() => alert("삭제하기 클릭")}
              >
                삭제하기
              </PopoverMenuItem>
              <PopoverMenuItem
                icon={<Edit className="h-5 w-5" />}
                onClick={() => alert("수정하기 클릭")}
              >
                수정하기
              </PopoverMenuItem>
            </PopoverContent>
          </Popover>
        </div>

        <h3 className="text-lg font-semibold mb-2">카드 제목</h3>
        <p className="text-grayscale-800">
          카드 내용이 여기에 표시됩니다. 우측 상단의 케밥 메뉴를 클릭하면
          팝오버가 나타납니다.
        </p>
      </div>
    </div>
  ),
};

// 아이콘 없는 메뉴
export const WithoutIcons: Story = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Popover>
        <PopoverTrigger className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-grayscale-200 transition-colors">
          <MoreVertical className="h-5 w-5" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverMenuItem>프로필 보기</PopoverMenuItem>
          <PopoverMenuItem>메시지 보내기</PopoverMenuItem>
          <PopoverMenuItem>친구 추가</PopoverMenuItem>
          <PopoverMenuItem variant="destructive">차단하기</PopoverMenuItem>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

// 비활성화된 메뉴 아이템
export const WithDisabledItems: Story = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Popover>
        <PopoverTrigger className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-grayscale-200 transition-colors">
          <MoreVertical className="h-5 w-5" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverMenuItem icon={<Edit className="h-5 w-5" />}>
            수정하기
          </PopoverMenuItem>
          <PopoverMenuItem icon={<Share2 className="h-5 w-5" />} disabled>
            공유하기 (곧 출시)
          </PopoverMenuItem>
          <PopoverMenuItem
            variant="destructive"
            icon={<Trash2 className="h-5 w-5" />}
          >
            삭제하기
          </PopoverMenuItem>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

// 왼쪽 정렬
export const AlignStart: Story = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Popover>
        <PopoverTrigger className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-grayscale-200 transition-colors">
          <MoreVertical className="h-5 w-5" />
        </PopoverTrigger>
        <PopoverContent align="start">
          <PopoverMenuItem
            variant="destructive"
            icon={<Trash2 className="h-5 w-5" />}
          >
            삭제하기
          </PopoverMenuItem>
          <PopoverMenuItem icon={<Edit className="h-5 w-5" />}>
            수정하기
          </PopoverMenuItem>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
