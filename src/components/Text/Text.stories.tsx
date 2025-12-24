import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cms Design System의 타이포그래피 컴포넌트입니다. 다양한 텍스트 스타일과 정렬, 장식 옵션을 제공합니다.",
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
      description:
        "텍스트의 용도에 따른 스타일 변형입니다. 크기, 두께, 색상이 미리 정의되어 있습니다.",
      table: {
        type: {
          summary:
            "h1 | h2 | h3 | subtitle | body | emphasis | caption | price",
        },
        defaultValue: { summary: "body" },
      },
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "텍스트의 가로 정렬 방식을 설정합니다.",
      table: {
        type: { summary: "left | center | right" },
        defaultValue: { summary: "left" },
      },
    },
    decoration: {
      control: "select",
      options: ["underline", "lineThrough", "none"],
      description: "텍스트에 추가할 장식효과(밑줄, 취소선 등)를 설정합니다.",
      table: {
        type: { summary: "underline | lineThrough | none" },
        defaultValue: { summary: "none" },
      },
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
      description:
        "의미론적(Semantic) 구조를 위해 사용할 HTML 태그를 지정합니다.",
      table: {
        type: {
          summary: "p | span | div | h1 | h2 | h3 | h4 | h5 | h6 | label",
        },
        defaultValue: { summary: "p" },
      },
    },
    children: {
      description: "화면에 표시될 텍스트 내용입니다.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    className: {
      control: "text",
      description: "텍스트 요소에 추가할 커스텀 CSS 클래스입니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    variant: "h1",
    children: "제목 스타일",
  },
};

export const H2: Story = {
  args: {
    variant: "h2",
    children: "부제목 스타일",
  },
};

export const H3: Story = {
  args: {
    variant: "h3",
    children: "중제목 스타일",
  },
};

export const Subtitle: Story = {
  args: {
    variant: "subtitle",
    children: "서브타이틀 스타일",
  },
};

export const Body: Story = {
  args: {
    variant: "body",
    children: "본문 텍스트 스타일",
  },
};

export const Emphasis: Story = {
  args: {
    variant: "emphasis",
    children: "강조 텍스트 스타일",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "보조 텍스트 스타일",
  },
};

export const Price: Story = {
  args: {
    variant: "price",
    children: "가격 스타일",
  },
};

export const WithDecoration: Story = {
  args: {
    variant: "body",
    decoration: "lineThrough",
    children: "취소선이 있는 텍스트",
  },
};

export const CenterAligned: Story = {
  args: {
    variant: "h2",
    align: "center",
    children: "가운데 정렬된 텍스트",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 min-w-[600px]">
      <Text variant="h1">H1 - 제목 스타일 (28px, Bold, #24272e)</Text>
      <Text variant="h2">H2 - 부제목 스타일 (24px, Semibold, #2b3240)</Text>
      <Text variant="h3">H3 - 중제목 스타일 (18px, Semibold, #24272e)</Text>
      <Text variant="subtitle">
        Subtitle - 서브타이틀 스타일 (16px, Medium, #63564e)
      </Text>
      <Text variant="body">
        Body - 본문 텍스트 스타일 (14px, Normal, #63564e)
      </Text>
      <Text variant="emphasis">
        Emphasis - 강조 텍스트 스타일 (14px, Semibold, #444b5a)
      </Text>
      <Text variant="caption">
        Caption - 보조 텍스트 스타일 (12px, Normal, #7f7f7f)
      </Text>
      <Text variant="price">Price - 15,000원 (10px, Bold, #24272e)</Text>
      <div className="border-t pt-4 mt-4">
        <Text variant="body" decoration="underline">
          밑줄 있는 텍스트
        </Text>
        <Text variant="body" decoration="lineThrough">
          취소선이 있는 텍스트
        </Text>
        <Text variant="body" align="center">
          가운데 정렬
        </Text>
        <Text variant="body" align="right">
          오른쪽 정렬
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 텍스트 변형을 한 번에 보여줍니다.",
      },
    },
  },
};
