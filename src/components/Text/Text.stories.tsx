import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Data Display/Text",
  component: Text,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "타이포그래피 컴포넌트. 다양한 텍스트 스타일을 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "subtitle",
        "body",
        "emphasis",
        "caption",
        "price",
      ],
      table: { defaultValue: { summary: "body" } },
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      table: { defaultValue: { summary: "left" } },
    },
    decoration: {
      control: "select",
      options: ["underline", "lineThrough", "none"],
      table: { defaultValue: { summary: "none" } },
    },
    as: {
      control: "select",
      options: [
        "p",
        "span",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "label",
      ],
      table: { defaultValue: { summary: "p" } },
    },
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
  <div className="grid grid-cols-[140px_1fr] items-baseline gap-4">
    <span className="text-[11px] font-medium tracking-wide text-cms-gray-550 uppercase">
      {label}
    </span>
    <div>{children}</div>
  </div>
);

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Row label="h1">
        <Text variant="h1">캐시닥 CMS</Text>
      </Row>
      <Row label="h2">
        <Text variant="h2">캠페인 관리</Text>
      </Row>
      <Row label="h3">
        <Text variant="h3">주간 활성 사용자</Text>
      </Row>
      <Row label="subtitle">
        <Text variant="subtitle">필터 설정</Text>
      </Row>
      <Row label="body">
        <Text variant="body">
          정기 결제 사용자에게 알림을 발송합니다.
        </Text>
      </Row>
      <Row label="emphasis">
        <Text variant="emphasis">강조된 본문 텍스트</Text>
      </Row>
      <Row label="caption">
        <Text variant="caption">마지막 업데이트 · 2분 전</Text>
      </Row>
      <Row label="price">
        <Text variant="price">12,400원</Text>
      </Row>
      <Row label="align center">
        <Text align="center">가운데 정렬</Text>
      </Row>
      <Row label="underline">
        <Text decoration="underline">밑줄 강조</Text>
      </Row>
      <Row label="lineThrough">
        <Text decoration="lineThrough">취소선 텍스트</Text>
      </Row>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
