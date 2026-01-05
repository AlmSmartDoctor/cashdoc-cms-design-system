import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import { Button } from "../Button";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
  title: "Data Display/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cms Design System의 페이지네이션 컴포넌트입니다. 여러 페이지로 나뉜 콘텐츠를 탐색할 수 있게 해주며, 많은 페이지가 있을 때 중간 페이지를 생략(ellipsis)하여 UI를 깔끔하게 유지합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: "number",
      description: "현재 활성화된 페이지 번호입니다. (1부터 시작)",
      table: {
        type: { summary: "number" },
      },
    },
    totalPages: {
      control: "number",
      description: "전체 페이지 수입니다.",
      table: {
        type: { summary: "number" },
      },
    },
    onPageChange: {
      description: "페이지가 변경될 때 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(page: number) => void" },
      },
    },
    siblingCount: {
      control: "number",
      description:
        "현재 페이지 양옆에 표시할 페이지 수입니다. 기본값은 1입니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
    showPrevNext: {
      control: "boolean",
      description: "이전/다음 버튼을 표시할지 여부입니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    disabled: {
      control: "boolean",
      description: "true일 경우 모든 버튼을 비활성화합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "컨테이너에 추가할 커스텀 CSS 클래스입니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 페이지네이션입니다. 10개 페이지를 이전/다음 버튼과 함께 표시합니다.",
      },
    },
  },
};

export const ManyPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={50}
        onPageChange={setCurrentPage}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "50페이지가 있는 페이지네이션입니다. 자동으로 중간 페이지가 생략(ellipsis)됩니다.",
      },
    },
  },
};

export const ManyPagesMiddle: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(25);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={50}
        onPageChange={setCurrentPage}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "중간 페이지(25페이지)에 있는 상태입니다. 양쪽에 ellipsis가 표시됩니다.",
      },
    },
  },
};

export const FewPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={setCurrentPage}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "5페이지만 있는 경우입니다. Ellipsis 없이 모든 페이지 번호가 표시됩니다.",
      },
    },
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "첫 페이지에서 이전 버튼이 비활성화된 상태입니다.",
      },
    },
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "마지막 페이지에서 다음 버튼이 비활성화된 상태입니다.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: () => {},
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "비활성화된 페이지네이션입니다. 모든 버튼이 클릭할 수 없습니다.",
      },
    },
  },
};

export const CustomSiblingCount: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(25);
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">siblingCount = 1 (기본값)</p>
          <Pagination
            currentPage={currentPage}
            totalPages={50}
            onPageChange={setCurrentPage}
            siblingCount={1}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">siblingCount = 2</p>
          <Pagination
            currentPage={currentPage}
            totalPages={50}
            onPageChange={setCurrentPage}
            siblingCount={2}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">siblingCount = 3</p>
          <Pagination
            currentPage={currentPage}
            totalPages={50}
            onPageChange={setCurrentPage}
            siblingCount={3}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "siblingCount 값에 따라 현재 페이지 양옆에 표시되는 페이지 수가 달라집니다. siblingCount가 클수록 더 많은 페이지 번호가 표시됩니다.",
      },
    },
  },
};

export const WithoutPrevNext: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
        showPrevNext={false}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "이전/다음 버튼 없이 페이지 번호만 표시합니다. showPrevNext={false}로 설정합니다.",
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentPage(1)}
            variant="secondary"
            size="sm"
          >
            첫 페이지로
          </Button>
          <Button
            onClick={() => setCurrentPage(10)}
            variant="secondary"
            size="sm"
          >
            10페이지로
          </Button>
          <Button
            onClick={() => setCurrentPage(totalPages)}
            variant="secondary"
            size="sm"
          >
            마지막 페이지로
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          현재 페이지: {currentPage} / {totalPages}
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "프로그래밍 방식으로 페이지를 제어할 수 있는 Controlled 컴포넌트 예시입니다.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6 min-w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-2">기본 (10페이지)</h3>
          <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">
            많은 페이지 (50페이지, 현재 1페이지)
          </h3>
          <Pagination currentPage={1} totalPages={50} onPageChange={() => {}} />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">
            중간 페이지 (50페이지, 현재 25페이지)
          </h3>
          <Pagination
            currentPage={25}
            totalPages={50}
            onPageChange={() => {}}
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">
            마지막 근처 (50페이지, 현재 48페이지)
          </h3>
          <Pagination
            currentPage={48}
            totalPages={50}
            onPageChange={() => {}}
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">적은 페이지 (5페이지)</h3>
          <Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">이전/다음 버튼 없음</h3>
          <Pagination
            currentPage={5}
            totalPages={10}
            onPageChange={() => {}}
            showPrevNext={false}
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">비활성화</h3>
          <Pagination
            currentPage={5}
            totalPages={10}
            onPageChange={() => {}}
            disabled
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination 컴포넌트의 모든 상태를 한눈에 볼 수 있습니다.",
      },
    },
  },
};
