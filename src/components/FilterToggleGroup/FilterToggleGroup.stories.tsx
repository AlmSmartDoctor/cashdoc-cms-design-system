import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  CheckCircleIcon,
  FileTextIcon,
  RefreshIcon,
  TrashIcon,
  UserIcon,
  XIcon,
} from "@/components/icons";
import {
  FilterToggleGroup,
  type FilterToggleGroupOption,
} from "./FilterToggleGroup";

type ReviewStatus =
  | "all"
  | "pointRequested"
  | "pointApproved"
  | "pointRejected"
  | "pointCanceled"
  | "refundCompleted";

const iconProps = {
  size: 12,
  strokeWidth: 2.2,
};

const reviewStatusItems: FilterToggleGroupOption<ReviewStatus>[] = [
  {
    value: "all",
    label: "전체",
    count: 0,
    icon: <UserIcon {...iconProps} />,
  },
  {
    value: "pointRequested",
    label: "포인트 신청",
    count: 0,
    icon: <FileTextIcon {...iconProps} />,
  },
  {
    value: "pointApproved",
    label: "포인트 신청 승인",
    count: 0,
    icon: <CheckCircleIcon {...iconProps} />,
  },
  {
    value: "pointRejected",
    label: "포인트 신청 거절",
    count: 0,
    icon: <XIcon {...iconProps} />,
  },
  {
    value: "pointCanceled",
    label: "포인트 신청 취소",
    count: 0,
    icon: <TrashIcon {...iconProps} />,
  },
  {
    value: "refundCompleted",
    label: "환불 완료",
    count: 0,
    icon: <RefreshIcon {...iconProps} />,
  },
];

const meta: Meta<typeof FilterToggleGroup> = {
  title: "Forms/FilterToggleGroup",
  component: FilterToggleGroup,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "상태별 집계 카드와 단일 선택 필터를 결합한 토글 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    items: reviewStatusItems,
    value: "all",
    size: "md",
    ariaLabel: "리뷰 상태 필터",
  },
};

export default meta;
type Story = StoryObj<typeof FilterToggleGroup>;

export const Default: Story = {
  render: (args) => {
    const [selectedStatus, setSelectedStatus] = useState<ReviewStatus>(
      args.value as ReviewStatus,
    );

    return (
      <FilterToggleGroup
        {...args}
        value={selectedStatus}
        onValueChange={(nextStatus) => {
          setSelectedStatus(nextStatus as ReviewStatus);
          args.onValueChange(nextStatus);
        }}
      />
    );
  },
};

export const FullWidth: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => {
    const [selectedStatus, setSelectedStatus] = useState<ReviewStatus>(
      args.value as ReviewStatus,
    );

    return (
      <div className="w-full bg-cms-gray-50 px-4 py-6">
        <FilterToggleGroup
          {...args}
          className="w-full flex-nowrap"
          itemClassName="min-w-0 flex-1"
          value={selectedStatus}
          onValueChange={(nextStatus) => {
            setSelectedStatus(nextStatus as ReviewStatus);
            args.onValueChange(nextStatus);
          }}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    const [selectedStatus, setSelectedStatus] = useState<ReviewStatus>(
      args.value as ReviewStatus,
    );

    return (
      <div className="flex flex-col gap-4">
        <FilterToggleGroup
          {...args}
          size="sm"
          value={selectedStatus}
          onValueChange={(nextStatus) => {
            setSelectedStatus(nextStatus as ReviewStatus);
            args.onValueChange(nextStatus);
          }}
        />
        <FilterToggleGroup
          {...args}
          size="md"
          value={selectedStatus}
          onValueChange={(nextStatus) => {
            setSelectedStatus(nextStatus as ReviewStatus);
            args.onValueChange(nextStatus);
          }}
        />
        <FilterToggleGroup
          {...args}
          size="lg"
          value={selectedStatus}
          onValueChange={(nextStatus) => {
            setSelectedStatus(nextStatus as ReviewStatus);
            args.onValueChange(nextStatus);
          }}
        />
      </div>
    );
  },
};

export const ForJsdoc: Story = {
  args: {
    items: reviewStatusItems,
    value: "all",
    size: "md",
  },
  render: (args) => (
    <FilterToggleGroup
      {...args}
      value="all"
      onValueChange={() => {
        /* empty */
      }}
    />
  ),
};
