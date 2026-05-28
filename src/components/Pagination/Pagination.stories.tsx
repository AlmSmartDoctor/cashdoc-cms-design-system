import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Data Display/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "여러 페이지로 나뉜 콘텐츠를 탐색하는 페이지네이션. 많은 페이지가 있을 때 ellipsis로 중간을 생략합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: { control: "number" },
    totalPages: { control: "number" },
    siblingCount: { control: "number" },
    showPrevNext: { control: "boolean" },
    disabled: { control: "boolean" },
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
  <div className="flex items-center gap-4">
    <span className="w-32 shrink-0 text-[12px] font-medium text-cms-gray-550">
      {label}
    </span>
    {children}
  </div>
);

const Controlled = (
  props: Omit<
    React.ComponentProps<typeof Pagination>,
    "currentPage" | "onPageChange"
  > & { initial?: number },
) => {
  const [page, setPage] = useState(props.initial ?? 1);
  return <Pagination {...props} currentPage={page} onPageChange={setPage} />;
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Row label="기본 (적은 페이지)">
        <Controlled totalPages={5} initial={3} />
      </Row>
      <Row label="많은 페이지 (시작)">
        <Controlled totalPages={24} initial={3} />
      </Row>
      <Row label="많은 페이지 (중간)">
        <Controlled totalPages={24} initial={12} />
      </Row>
      <Row label="많은 페이지 (끝)">
        <Controlled totalPages={24} initial={22} />
      </Row>
      <Row label="이전/다음 없음">
        <Controlled totalPages={10} initial={5} showPrevNext={false} />
      </Row>
      <Row label="Disabled">
        <Controlled totalPages={10} initial={5} disabled />
      </Row>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
