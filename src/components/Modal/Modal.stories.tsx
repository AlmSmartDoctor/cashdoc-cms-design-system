import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button";
import { ConfirmModal } from "./ConfirmModal";
import { DeleteModal } from "./DeleteModal";
import { ErrorModal } from "./ErrorModal";
import { Modal } from "./Modal";
import { SuccessModal } from "./SuccessModal";
import { WarningModal } from "./WarningModal";

const meta: Meta<typeof Modal> = {
  title: "Feedback/Modal",
  component: Modal,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "사용자에게 중요한 정보를 표시하거나 입력을 요구하는 오버레이 대화상자입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Trigger = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <Button variant="outline" onClick={onClick}>
    {label}
  </Button>
);

const Frame = ({
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
  render: () => {
    const [open, setOpen] = useState<string | null>(null);
    const close = () => setOpen(null);
    return (
      <div className="flex flex-wrap items-start gap-6">
        <Frame label="기본 Modal">
          <Trigger label="기본 모달" onClick={() => setOpen("basic")} />
          <Modal
            open={open === "basic"}
            onOpenChange={close}
            title="변경사항을 저장할까요?"
            footer={
              <div className="flex gap-2">
                <Button variant="ghost" onClick={close}>
                  취소
                </Button>
                <Button onClick={close}>저장</Button>
              </div>
            }
          >
            지금 저장하지 않으면 입력한 내용이 사라집니다.
          </Modal>
        </Frame>

        <Frame label="Confirm">
          <Trigger label="Confirm" onClick={() => setOpen("confirm")} />
          <ConfirmModal
            open={open === "confirm"}
            onOpenChange={close}
            title="작업을 진행할까요?"
            message="이 작업은 즉시 반영됩니다."
            onConfirm={close}
          />
        </Frame>

        <Frame label="Delete">
          <Trigger label="Delete" onClick={() => setOpen("delete")} />
          <DeleteModal
            open={open === "delete"}
            onOpenChange={close}
            title="캠페인을 삭제할까요?"
            message="삭제된 캠페인은 복구할 수 없습니다."
            onConfirm={close}
            onCancel={close}
          />
        </Frame>

        <Frame label="Error">
          <Trigger label="Error" onClick={() => setOpen("error")} />
          <ErrorModal
            open={open === "error"}
            onOpenChange={close}
            title="발송에 실패했어요"
            message="잠시 후 다시 시도해 주세요. (에러 코드 5023)"
            onConfirm={close}
          />
        </Frame>

        <Frame label="Warning">
          <Trigger label="Warning" onClick={() => setOpen("warning")} />
          <WarningModal
            open={open === "warning"}
            onOpenChange={close}
            title="발송 시간이 야간입니다"
            message="예약 시간을 다시 확인해 주세요."
            onConfirm={close}
            onCancel={close}
          />
        </Frame>

        <Frame label="Success">
          <Trigger label="Success" onClick={() => setOpen("success")} />
          <SuccessModal
            open={open === "success"}
            onOpenChange={close}
            title="저장이 완료되었어요"
            message="모든 변경 사항이 적용되었습니다."
            onConfirm={close}
          />
        </Frame>
      </div>
    );
  },
};

/**
 * `children`은 `<div>` 컨테이너에 렌더되므로 block 요소(입력 폼, 픽커 등)를
 * 안전하게 담을 수 있습니다. 스크린리더용 설명이 필요하면 `description`
 * prop으로 전달하면 시각적으로 숨긴 채 `aria-describedby`에 연결됩니다.
 */
const fieldClass =
  "h-9 rounded-cms-md border border-cms-gray-250 px-3 text-sm";

export const WithBlockContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    return (
      <Frame label="Block children + description">
        <Trigger label="폼 모달" onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="새 사용자 추가"
          description="이름과 이메일을 입력해 사용자를 추가합니다."
          footer={
            <div className="flex gap-2">
              <Button variant="ghost" onClick={close}>
                취소
              </Button>
              <Button onClick={close}>추가</Button>
            </div>
          }
        >
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs text-cms-gray-550">이름</span>
              <input
                className={fieldClass}
                placeholder="홍길동"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs text-cms-gray-550">이메일</span>
              <input
                className={fieldClass}
                placeholder="user@example.com"
              />
            </label>
          </div>
        </Modal>
      </Frame>
    );
  },
};

export const ForJsdoc: Story = Showcase;
