import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "./Toaster";
import { toast } from "./index";
import { Button } from "../Button";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Sonner를 기반으로 한 Toast 컴포넌트입니다. 앱의 최상단에 <Toaster />를 배치하고 toast() 함수를 사용하여 알림을 표시합니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toaster />
      <div className="flex gap-2">
        <Button
          onClick={() =>
            toast("알림 제목", { description: "상세 내용이 들어가는 곳입니다." })
          }
        >
          Show Title + Content
        </Button>
        <Button
          onClick={() =>
            toast.success("성공!", { description: "성공적으로 완료되었습니다." })
          }
        >
          Show Success
        </Button>
        <Button
          onClick={() =>
            toast.error("오류 발생", {
              description: "데이터를 불러오는 중 문제가 생겼습니다.",
            })
          }
        >
          Show Error
        </Button>
      </div>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        onClick={() =>
          toast("알림 제목", { description: "알림에 대한 상세 설명입니다." })
        }
      >
        Show Toast with Description
      </Button>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        onClick={() =>
          toast("파일이 삭제되었습니다.", {
            action: {
              label: "되돌리기",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast with Action
      </Button>
    </div>
  ),
};

export const CustomPosition: Story = {
  render: () => (
    <div>
      <Toaster position="top-center" />
      <Button onClick={() => toast("상단 중앙에 표시되는 알림입니다.")}>
        Show Top Center Toast
      </Button>
    </div>
  ),
};
