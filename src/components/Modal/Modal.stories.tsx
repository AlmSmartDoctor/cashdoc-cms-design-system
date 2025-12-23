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
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

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
  render: () => {
    const [open, setOpen] = useState(false);

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
  render: () => {
    const [open, setOpen] = useState(false);

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
  render: () => {
    const [open, setOpen] = useState(false);

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
  render: () => {
    const [open, setOpen] = useState(false);

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
  render: () => {
    const [open, setOpen] = useState(false);

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
  render: () => {
    const [open, setOpen] = useState(false);

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
  render: () => {
    const [open, setOpen] = useState(false);

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
  render: () => {
    const [open, setOpen] = useState(false);

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
  render: () => {
    const [open, setOpen] = useState(false);

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
  render: () => {
    const [open, setOpen] = useState(false);

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
  render: () => {
    const [confirmOpen, setConfirmOpen] = useState(false);
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
  render: () => {
    const [smOpen, setSmOpen] = useState(false);
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
