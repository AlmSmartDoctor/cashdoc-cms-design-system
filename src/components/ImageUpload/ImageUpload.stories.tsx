import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { useEffect, useRef, useState } from "react";
import { ImageUpload } from "./ImageUpload";

const meta: Meta<typeof ImageUpload> = {
  title: "Forms/ImageUpload",
  component: ImageUpload,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "드래그 앤 드롭 및 클릭으로 이미지를 업로드하는 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    maxFiles: { control: "number" },
    maxSize: { control: "number" },
    disabled: { control: "boolean" },
    showPreview: { control: "boolean" },
    showAcceptedFileTypes: { control: "boolean" },
    placeholder: { control: "text" },
  },
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

const Controlled = (props: React.ComponentProps<typeof ImageUpload>) => {
  const [files, setFiles] = useState<File[]>([]);
  return <ImageUpload {...props} value={files} onChange={setFiles} />;
};

export const Showcase: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <Section label="단일 이미지 (기본)">
        <Controlled maxFiles={1} />
      </Section>
      <Section label="여러 이미지 (최대 6개)">
        <Controlled maxFiles={6} />
      </Section>
      <Section label="허용 형식 표시">
        <Controlled
          maxFiles={1}
          accept={{ "image/*": [".png", ".jpg", ".webp"] }}
          showAcceptedFileTypes
        />
      </Section>
      <Section label="비활성">
        <Controlled maxFiles={1} disabled />
      </Section>
    </div>
  ),
};

export const RefForwarding: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [tag, setTag] = useState("");
    useEffect(() => setTag(ref.current?.tagName ?? "null"), []);
    return (
      <div className="flex flex-col gap-2">
        <ImageUpload ref={ref} />
        <span data-testid="ref-tag" className="text-xs">
          {tag}
        </span>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ref-tag")).toHaveTextContent("DIV");
  },
};

export const ForJsdoc: Story = Showcase;
