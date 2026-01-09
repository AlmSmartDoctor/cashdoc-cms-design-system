import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { ConfirmModal } from "./ConfirmModal";
import { DeleteModal } from "./DeleteModal";
import { ErrorModal } from "./ErrorModal";
import { WarningModal } from "./WarningModal";
import { SuccessModal } from "./SuccessModal";
import { Button } from "../Button/Button";

const meta: Meta<typeof Modal> = {
  title: "Feedback/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "사용자에게 중요한 정보를 표시하거나 입력을 요구하는 오버레이 대화상자입니다. 모달이 열리면 배경이 어두워지며 사용자의 주의를 집중시킵니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "모달의 열림/닫힘 상태를 제어합니다.",
      table: {
        type: { summary: "boolean" },
      },
    },
    onOpenChange: {
      description:
        "모달의 열림/닫힘 상태가 변경될 때 호출되는 콜백 함수입니다. X 버튼, 배경 클릭, Esc 키 등으로 닫힐 때 호출됩니다.",
      table: {
        type: { summary: "(open: boolean) => void" },
      },
    },
    title: {
      control: "text",
      description:
        "모달의 제목입니다. 모달의 목적을 명확히 설명하는 텍스트를 사용하세요.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    icon: {
      description:
        "제목 위에 표시될 아이콘입니다. 성공(체크), 에러(X), 경고(!) 등의 시각적 힌트를 제공할 때 사용합니다.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    children: {
      description:
        "모달의 본문 콘텐츠입니다. 설명 텍스트, 폼, 또는 기타 요소를 포함할 수 있습니다.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    footer: {
      description:
        "모달 하단에 표시될 액션 버튼 영역입니다. 일반적으로 확인, 취소 등의 버튼을 포함합니다.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description:
        "모달의 최대 너비를 결정합니다. sm(384px)은 간단한 확인 대화상자, md(448px)는 일반적인 폼, lg(512px)는 복잡한 폼에 사용합니다.",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
    showCloseButton: {
      control: "boolean",
      description:
        "우측 상단의 X 닫기 버튼 표시 여부입니다. 사용자가 언제든 모달을 닫을 수 있어야 하는 경우 true로 설정하세요.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    className: {
      control: "text",
      description: "모달 콘텐츠 영역에 추가할 커스텀 CSS 클래스입니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="기본 모달"
          footer={
            <div className="flex justify-between w-full gap-2">
              <Button onClick={() => setOpen(false)} className="w-full">
                확인
              </Button>
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                className="w-full"
              >
                취소
              </Button>
            </div>
          }
        >
          이것은 기본 모달입니다. 제목과 내용, 그리고 푸터 영역을 자유롭게
          커스터마이징할 수 있습니다.
        </Modal>
      </>
    );
  },
};

export const Confirm: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>확인 모달 열기</Button>
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          message="작업이 성공적으로 완료되었습니다."
          onConfirm={() => console.log("확인 클릭")}
        />
      </>
    );
  },
};

export const ConfirmWithTitle: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>제목이 있는 확인 모달</Button>
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          title="작업 완료"
          message="작업이 성공적으로 완료되었습니다."
          onConfirm={() => console.log("확인 클릭")}
        />
      </>
    );
  },
};

export const Success: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>성공 모달 열기</Button>
        <SuccessModal
          open={open}
          onOpenChange={setOpen}
          message="데이터가 성공적으로 저장되었습니다."
          onConfirm={() => console.log("확인 클릭")}
        />
      </>
    );
  },
};

export const SuccessWithTitle: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>제목이 있는 성공 모달</Button>
        <SuccessModal
          open={open}
          onOpenChange={setOpen}
          title="저장 완료"
          message="데이터가 성공적으로 저장되었습니다."
          onConfirm={() => console.log("확인 클릭")}
        />
      </>
    );
  },
};

export const Error: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>에러 모달 열기</Button>
        <ErrorModal
          open={open}
          onOpenChange={setOpen}
          message="작업 중 오류가 발생했습니다. 다시 시도해주세요."
          onConfirm={() => console.log("확인 클릭")}
        />
      </>
    );
  },
};

export const ErrorWithTitle: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>제목이 있는 에러 모달</Button>
        <ErrorModal
          open={open}
          onOpenChange={setOpen}
          title="오류 발생"
          message="작업 중 오류가 발생했습니다. 다시 시도해주세요."
          onConfirm={() => console.log("확인 클릭")}
        />
      </>
    );
  },
};

export const Warning: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>경고 모달 열기</Button>
        <WarningModal
          open={open}
          onOpenChange={setOpen}
          message="이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?"
          onConfirm={() => console.log("확인 클릭")}
        />
      </>
    );
  },
};

export const WarningWithTitle: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>제목이 있는 경고 모달</Button>
        <WarningModal
          open={open}
          onOpenChange={setOpen}
          title="주의"
          message="이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?"
          onConfirm={() => console.log("확인 클릭")}
        />
      </>
    );
  },
};

export const Delete: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>삭제 모달 열기</Button>
        <DeleteModal
          open={open}
          onOpenChange={setOpen}
          onConfirm={() => {
            console.log("삭제 확인");
          }}
          onCancel={() => {
            console.log("삭제 취소");
          }}
        />
      </>
    );
  },
};

export const DeleteWithCustomMessage: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setOpen(true)}>커스텀 삭제 모달</Button>
        <DeleteModal
          open={open}
          onOpenChange={setOpen}
          title="항목 삭제"
          message="선택한 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
          confirmText="삭제"
          cancelText="취소"
          onConfirm={() => {
            console.log("삭제 확인");
          }}
          onCancel={() => {
            console.log("삭제 취소");
          }}
        />
      </>
    );
  },
};

export const AllModals: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [confirmOpen, setConfirmOpen] = useState(true);
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Button onClick={() => setConfirmOpen(true)}>확인 모달</Button>
        <Button onClick={() => setSuccessOpen(true)}>성공 모달</Button>
        <Button onClick={() => setErrorOpen(true)}>에러 모달</Button>
        <Button onClick={() => setWarningOpen(true)}>경고 모달</Button>
        <Button onClick={() => setDeleteOpen(true)}>삭제 모달</Button>

        <ConfirmModal
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          message="작업이 완료되었습니다."
        />

        <SuccessModal
          open={successOpen}
          onOpenChange={setSuccessOpen}
          message="데이터가 성공적으로 저장되었습니다."
        />

        <ErrorModal
          open={errorOpen}
          onOpenChange={setErrorOpen}
          message="작업 중 오류가 발생했습니다."
        />

        <WarningModal
          open={warningOpen}
          onOpenChange={setWarningOpen}
          message="이 작업은 되돌릴 수 없습니다."
        />

        <DeleteModal
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onConfirm={() => console.log("삭제")}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => {
    const [smOpen, setSmOpen] = useState(true);
    const [mdOpen, setMdOpen] = useState(false);
    const [lgOpen, setLgOpen] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Button onClick={() => setSmOpen(true)}>Small 모달</Button>
        <Button onClick={() => setMdOpen(true)}>Medium 모달</Button>
        <Button onClick={() => setLgOpen(true)}>Large 모달</Button>

        <Modal
          open={smOpen}
          onOpenChange={setSmOpen}
          title="Small 모달"
          size="sm"
          footer={
            <Button onClick={() => setSmOpen(false)} className="w-full">
              확인
            </Button>
          }
        >
          이것은 작은 크기의 모달입니다.
        </Modal>

        <Modal
          open={mdOpen}
          onOpenChange={setMdOpen}
          title="Medium 모달"
          size="md"
          footer={
            <Button onClick={() => setMdOpen(false)} className="w-full">
              확인
            </Button>
          }
        >
          이것은 중간 크기의 모달입니다. 기본 크기입니다.
        </Modal>

        <Modal
          open={lgOpen}
          onOpenChange={setLgOpen}
          title="Large 모달"
          size="lg"
          footer={
            <Button onClick={() => setLgOpen(false)} className="w-full">
              확인
            </Button>
          }
        >
          이것은 큰 크기의 모달입니다. 더 많은 내용을 표시할 수 있습니다.
        </Modal>
      </div>
    );
  },
};

export const ForJsdoc: Story = {
  parameters: {
    docs: { disable: true },
    layout: "centered",
  },
  render: () => {
    // ForJsdoc: Show a static open modal for documentation screenshots.
    // We use a state but initialize it to true.
    const [open, setOpen] = useState(true);
    return (
      <div className="h-[400px] w-[600px] relative flex items-center justify-center bg-gray-100 rounded-lg">
        {/* We place a trigger button just to be semantic, but the modal is open by default */}
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Modal Title"
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </div>
          }
        >
          This is a representative modal for documentation. It shows the title,
          content area, and footer actions.
        </Modal>
      </div>
    );
  },
};
