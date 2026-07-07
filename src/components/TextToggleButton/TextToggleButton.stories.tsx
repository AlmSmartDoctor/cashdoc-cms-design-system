import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TextToggleButton } from "./TextToggleButton";

const SAMPLE_TEXT =
  "병원이 정말 깔끔하고 친절했어요. 시술 전후 안내가 꼼꼼해서 처음 방문하는 입장에서도 편안했고, 결과도 기대 이상이라 주변에 추천하고 싶을 정도였습니다.";

const meta: Meta<typeof TextToggleButton> = {
  title: "Forms/TextToggleButton",
  component: TextToggleButton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "텍스트 전용 disclosure 트리거. '더보기/접기'처럼 동일 트리거가 두 상태를 오갈 때 사용합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["underline", "plain"],
      table: { defaultValue: { summary: "underline" } },
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      table: { defaultValue: { summary: "sm" } },
    },
    disabled: { control: "boolean" },
    expanded: { table: { disable: true } },
    onToggle: { table: { disable: true } },
    labels: { table: { disable: true } },
    controls: { table: { disable: true } },
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
    <span className="w-24 shrink-0 text-[12px] font-medium text-cms-gray-550">
      {label}
    </span>
    <div className="flex flex-wrap items-center gap-5">{children}</div>
  </div>
);

const Controlled = ({
  variant,
  size,
  disabled,
}: {
  variant?: "underline" | "plain";
  size?: "sm" | "md";
  disabled?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <TextToggleButton
      variant={variant}
      size={size}
      disabled={disabled}
      expanded={expanded}
      onToggle={setExpanded}
      labels={{ expanded: "접기", collapsed: "더보기" }}
    />
  );
};

export const Showcase: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <div className="flex flex-col gap-6">
        <Row label="Variant">
          <Controlled variant="underline" />
          <Controlled variant="plain" />
        </Row>
        <Row label="Size">
          <Controlled size="sm" />
          <Controlled size="md" />
        </Row>
        <Row label="Disabled">
          <Controlled disabled />
        </Row>
        <div className="max-w-md rounded-cms-md border border-cms-gray-150 bg-cms-gray-50 p-4">
          <p
            className="text-[13.5px] leading-relaxed text-cms-gray-800"
            style={
              expanded
                ? undefined
                : {
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                  }
            }
          >
            {SAMPLE_TEXT}
          </p>
          <TextToggleButton
            expanded={expanded}
            onToggle={setExpanded}
            labels={{ expanded: "접기", collapsed: "더보기" }}
          />
        </div>
      </div>
    );
  },
};

export const ForJsdoc: Story = Showcase;
