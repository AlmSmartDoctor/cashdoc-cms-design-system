import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextToggleButton } from "./TextToggleButton";

const SAMPLE_TEXT =
  "병원이 정말 깔끔하고 친절했어요. 시술 전후 안내가 꼼꼼해서 처음" +
  " 방문하는 입장에서도 편안했고, 결과도 기대 이상이라 주변에 추천하고" +
  " 싶을 정도였습니다. 다음에 다른 시술을 받게 되더라도 같은 곳을" +
  " 다시 찾을 것 같습니다.";

const noop = () => undefined;

const meta: Meta<typeof TextToggleButton> = {
  title: "Forms/TextToggleButton",
  component: TextToggleButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "텍스트 전용 disclosure(공개) 트리거입니다. 동일한 트리거가" +
          " '더보기/접기'처럼 두 상태를 오갈 때 사용합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["underline", "plain"],
      description:
        "시각 variant. 기본 'underline'은 밑줄로 클릭 가능성을 강조하고," +
        " 'plain'은 밑줄 없이 단순 텍스트로 표시합니다.",
      table: {
        type: { summary: "underline | plain" },
        defaultValue: { summary: "underline" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description:
        "본문 텍스트와 맞물리는 크기. 인라인 보조 액션은 'sm'을 권장합니다.",
      table: {
        type: { summary: "sm | md" },
        defaultValue: { summary: "sm" },
      },
    },
    disabled: {
      control: "boolean",
      description: "true일 경우 상호작용이 비활성화됩니다.",
      table: { type: { summary: "boolean" } },
    },
    expanded: { table: { disable: true } },
    onToggle: { table: { disable: true } },
    labels: { table: { disable: true } },
    controls: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledTextToggleButton = (
  args: Omit<
    Parameters<typeof TextToggleButton>[0],
    "expanded" | "onToggle"
  >,
) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <TextToggleButton
      {...args}
      expanded={expanded}
      onToggle={setExpanded}
    />
  );
};

export const Default: Story = {
  args: { labels: { collapsed: "더보기", expanded: "접기" } },
  render: (args) => <ControlledTextToggleButton {...args} />,
};

export const Plain: Story = {
  args: {
    variant: "plain",
    labels: { collapsed: "더보기", expanded: "접기" },
  },
  render: (args) => <ControlledTextToggleButton {...args} />,
};

export const Medium: Story = {
  args: {
    size: "md",
    labels: { collapsed: "더보기", expanded: "접기" },
  },
  render: (args) => <ControlledTextToggleButton {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    labels: { collapsed: "더보기", expanded: "접기" },
  },
  render: (args) => <ControlledTextToggleButton {...args} />,
};

export const WithDisclosure: Story = {
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "`controls`로 disclosure 영역의 id를 연결하면 `aria-controls`가" +
          " 출력되어 스크린리더가 관계를 인식합니다.",
      },
    },
  },
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <div className="max-w-sm">
        <p
          id="review-body"
          className={expanded ? "text-sm" : "line-clamp-3 text-sm"}
        >
          {SAMPLE_TEXT}
        </p>
        <div className="mt-1 flex justify-end">
          <TextToggleButton
            expanded={expanded}
            onToggle={setExpanded}
            labels={{ collapsed: "더보기", expanded: "접기" }}
            controls="review-body"
          />
        </div>
      </div>
    );
  },
};

export const Matrix: Story = {
  parameters: {
    layout: "padded",
    docs: {
      description: { story: "variant × size × expanded × disabled 매트릭스" },
    },
  },
  render: () => {
    const labels = { collapsed: "더보기", expanded: "접기" };
    return (
      <div className="grid grid-cols-4 gap-6">
        <TextToggleButton
          variant="underline"
          size="sm"
          expanded={false}
          onToggle={noop}
          labels={labels}
        />
        <TextToggleButton
          variant="underline"
          size="sm"
          expanded
          onToggle={noop}
          labels={labels}
        />
        <TextToggleButton
          variant="underline"
          size="md"
          expanded={false}
          onToggle={noop}
          labels={labels}
        />
        <TextToggleButton
          variant="underline"
          size="md"
          expanded
          onToggle={noop}
          labels={labels}
        />
        <TextToggleButton
          variant="plain"
          size="sm"
          expanded={false}
          onToggle={noop}
          labels={labels}
        />
        <TextToggleButton
          variant="plain"
          size="sm"
          expanded
          onToggle={noop}
          labels={labels}
        />
        <TextToggleButton
          variant="plain"
          size="md"
          expanded={false}
          onToggle={noop}
          labels={labels}
        />
        <TextToggleButton
          variant="plain"
          size="md"
          expanded
          onToggle={noop}
          labels={labels}
        />
        <TextToggleButton
          variant="underline"
          size="sm"
          expanded={false}
          onToggle={noop}
          labels={labels}
          disabled
        />
        <TextToggleButton
          variant="plain"
          size="md"
          expanded
          onToggle={noop}
          labels={labels}
          disabled
        />
      </div>
    );
  },
};

export const ForJsdoc: Story = Matrix;
