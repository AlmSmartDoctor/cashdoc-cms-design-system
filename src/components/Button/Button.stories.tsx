import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Forms/Button",
  component: Button,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Cms Design System의 기본 버튼 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "warning",
        "danger",
        "link",
        "underline",
      ],
      table: {
        type: {
          summary:
            "default | secondary | outline | ghost | warning | danger | link | underline",
        },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      table: {
        type: { summary: "default | sm | lg | icon" },
        defaultValue: { summary: "default" },
      },
    },
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
    <span className="w-24 shrink-0 text-[12px] font-medium text-cms-gray-550">
      {label}
    </span>
    <div className="flex flex-wrap items-center gap-2">{children}</div>
  </div>
);

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Row label="Variant">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
        <Button variant="underline">Underline</Button>
      </Row>
      <Row label="Size">
        <Button size="sm">Small · 30</Button>
        <Button>Default · 36</Button>
        <Button size="lg">Large · 44</Button>
      </Row>
      <Row label="State">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button variant="outline">Default</Button>
        <Button variant="outline" disabled>
          Disabled
        </Button>
      </Row>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
