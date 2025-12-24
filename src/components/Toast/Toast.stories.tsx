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
        component:
          "Sonner를 기반으로 한 Toast 컴포넌트입니다. 앱의 최상단에 <Toaster />를 배치하고 toast() 함수를 사용하여 알림을 표시합니다.",
      },
    },
  },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "화면에서 토스트가 나타날 위치를 설정합니다.",
      table: {
        type: {
          summary:
            "top-left | top-center | top-right | bottom-left | bottom-center | bottom-right",
        },
        defaultValue: { summary: "bottom-center" },
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Toaster {...args} />
      <div className="flex gap-2">
        <Button
          onClick={() =>
            toast("알림 제목", {
              description: "상세 내용이 들어가는 곳입니다.",
            })
          }
        >
          제목 + 내용 토스트
        </Button>
        <Button
          onClick={() =>
            toast.success("성공!", {
              description: "성공적으로 완료되었습니다.",
            })
          }
        >
          성공 토스트
        </Button>
        <Button
          onClick={() =>
            toast.error("오류 발생", {
              description: "데이터를 불러오는 중 문제가 생겼습니다.",
            })
          }
        >
          에러 토스트
        </Button>
      </div>
    </div>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <div>
      <Toaster {...args} />
      <Button
        onClick={() =>
          toast("알림 제목", { description: "알림에 대한 상세 설명입니다." })
        }
      >
        상세 설명 토스트
      </Button>
    </div>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <div>
      <Toaster {...args} />
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
        되돌리기 액션이 포함된 토스트
      </Button>
    </div>
  ),
};

export const CustomPosition: Story = {
  args: {
    position: "top-center",
  },
  render: (args) => (
    <div>
      <Toaster {...args} />
      <Button onClick={() => toast("커스텀된 위치에 표시되는 알림입니다.")}>
        커스텀 위치 토스트
      </Button>
    </div>
  ),
};
