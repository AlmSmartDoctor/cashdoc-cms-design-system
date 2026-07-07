import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { useEffect, useRef, useState } from "react";
import { FileUpload } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Forms/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "드래그 앤 드롭 및 클릭으로 파일을 업로드하는 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    maxFiles: { control: "number" },
    maxSize: { control: "number" },
    disabled: { control: "boolean" },
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

const Controlled = (props: React.ComponentProps<typeof FileUpload>) => {
  const [files, setFiles] = useState<File[]>([]);
  return <FileUpload {...props} value={files} onChange={setFiles} />;
};

export const Showcase: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <Section label="기본 (최대 5개, 10MB)">
        <Controlled maxFiles={5} />
      </Section>
      <Section label="이미지만 (1개)">
        <Controlled
          maxFiles={1}
          accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
        />
      </Section>
      <Section label="CSV / XLSX">
        <Controlled
          maxFiles={3}
          accept={{
            "text/csv": [".csv"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
              [".xlsx"],
          }}
        />
      </Section>
      <Section label="비활성">
        <Controlled maxFiles={5} disabled />
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;

export const RefForwarding: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [tag, setTag] = useState("");
    useEffect(() => setTag(ref.current?.tagName ?? "null"), []);
    return (
      <div className="flex flex-col gap-2">
        <FileUpload ref={ref} />
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
