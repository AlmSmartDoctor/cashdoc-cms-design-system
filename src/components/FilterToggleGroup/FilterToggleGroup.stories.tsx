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

const iconProps = { size: 12, strokeWidth: 2.2 };

const reviewStatusItems: FilterToggleGroupOption<ReviewStatus>[] = [
  { value: "all", label: "전체", count: 120, icon: <UserIcon {...iconProps} /> },
  {
    value: "pointRequested",
    label: "포인트 신청",
    count: 32,
    icon: <FileTextIcon {...iconProps} />,
  },
  {
    value: "pointApproved",
    label: "신청 승인",
    count: 21,
    icon: <CheckCircleIcon {...iconProps} />,
    intent: "success",
  },
  {
    value: "pointRejected",
    label: "신청 거절",
    count: 5,
    icon: <XIcon {...iconProps} />,
    intent: "danger",
  },
  {
    value: "pointCanceled",
    label: "신청 취소",
    count: 8,
    icon: <TrashIcon {...iconProps} />,
    intent: "muted",
  },
  {
    value: "refundCompleted",
    label: "환불 완료",
    count: 3,
    icon: <RefreshIcon {...iconProps} />,
    intent: "primary",
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
          "상태별 집계 카드와 단일 선택 필터를 결합한 토글 컴포넌트입니다. 선택 시 다크 fill + 흰 텍스트로 family-look을 유지합니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <span className="text-[12px] font-medium text-cms-gray-550">{label}</span>
    {children}
  </div>
);

const Controlled = (
  props: Omit<
    React.ComponentProps<typeof FilterToggleGroup<ReviewStatus>>,
    "value" | "onValueChange"
  > & { initial?: ReviewStatus },
) => {
  const [v, setV] = useState<ReviewStatus>(props.initial ?? "all");
  return <FilterToggleGroup {...props} value={v} onValueChange={setV} />;
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Section label="Size · sm / md / lg / xl">
        <div className="flex flex-col gap-4">
          <Controlled items={reviewStatusItems} size="sm" />
          <Controlled items={reviewStatusItems} size="md" />
          <Controlled items={reviewStatusItems} size="lg" />
          <Controlled items={reviewStatusItems} size="xl" />
        </div>
      </Section>

      <Section label="Intent · 라벨 옆 dot">
        <Controlled items={reviewStatusItems} size="md" />
      </Section>

      <Section label="Without icons">
        <Controlled items={reviewStatusItems} size="md" showIcon={false} />
      </Section>

      <Section label="Full width (flex)">
        <div className="bg-cms-gray-50 p-4">
          <Controlled
            items={reviewStatusItems}
            size="md"
            className="w-full flex-nowrap"
            itemClassName="min-w-0 flex-1"
          />
        </div>
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
