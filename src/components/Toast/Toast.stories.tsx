import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { Button } from "../Button";
import { toast } from "./index";
import { Toast } from "./Toast";
import { Toaster } from "./Toaster";

const meta: Meta<typeof Toaster> = {
  title: "Feedback/Toast",
  component: Toaster,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Sonner 기반 Toast. 앱 최상단에 <Toaster />를 배치하고 toast() 함수로 알림을 띄웁니다.",
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
      table: { defaultValue: { summary: "bottom-center" } },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Showcase: Story = {
  render: (args) => (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <div className="mb-1 text-[13px] font-semibold text-cms-gray-900">
          TOAST
        </div>
        <div className="mb-4 text-[12px] text-cms-gray-550">
          기본은 light, dark 변형도 제공. 좌측 아이콘으로
          success/info/warning/error 구분.
        </div>
        <div className="flex flex-col items-start gap-3">
          <Toast
            intent="success"
            theme="dark"
            title="캠페인이 발행되었습니다"
            description="4분 전 · 12,481명에게 알림 전송"
            onClose={() => {}}
          />
          <Toast
            intent="info"
            theme="dark"
            title="초안이 자동저장되었어요"
            description="모든 변경사항은 30초마다 자동 저장됩니다."
          />
          <Toast
            intent="warning"
            title="발송 시간이 야간(22:00 이후)입니다"
            description="예약 시간을 다시 확인해 주세요."
            onClose={() => {}}
          />
          <Toast
            intent="error"
            theme="dark"
            title="발송에 실패했어요"
            description="잠시 후 다시 시도해 주세요. (에러 코드 · 5023)"
            onClose={() => {}}
          />
        </div>
      </div>

      <div>
        <div className="mb-1 text-[13px] font-semibold text-cms-gray-900">
          런타임 (sonner)
        </div>
        <div className="mb-4 text-[12px] text-cms-gray-550">
          앱 최상단에 &lt;Toaster /&gt;를 배치하고 toast() 호출로 띄웁니다.
        </div>
        <Toaster {...args} />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast("초안이 자동저장되었어요", {
                description: "30초마다 자동으로 저장됩니다.",
              })
            }
          >
            기본
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.success("캠페인이 발행되었습니다", {
                description: "4분 전 · 12,481명에게 알림 전송",
              })
            }
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("발송에 실패했어요", {
                description: "잠시 후 다시 시도해 주세요. (코드 5023)",
              })
            }
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.warning("발송 시간이 야간이에요", {
                description: "예약 시간을 다시 확인해 주세요.",
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("파일이 삭제되었습니다.", {
                description: "5초 안에 되돌릴 수 있어요.",
              })
            }
          >
            기본 + description
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const ForJsdoc: Story = {
  parameters: { docs: { disable: true } },
  render: (args) => {
    useEffect(() => {
      toast.success("Success Toast", {
        description: "This is a toast for documentation.",
        duration: Infinity,
      });
    }, []);
    return (
      <div className="flex h-50 items-center justify-center">
        <Toaster {...args} />
        <Button onClick={() => toast("Another Toast")}>Show Toast</Button>
      </div>
    );
  },
};
