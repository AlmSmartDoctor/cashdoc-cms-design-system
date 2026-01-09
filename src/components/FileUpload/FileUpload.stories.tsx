import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FileUpload } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Forms/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "드래그 앤 드롭 및 클릭을 통해 다양한 파일을 업로드할 수 있는 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    maxFiles: {
      control: "number",
      description: "업로드 가능한 최대 파일 개수",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "5" },
      },
    },
    maxSize: {
      control: "number",
      description: "업로드 가능한 최대 파일 크기 (bytes)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "10485760" },
      },
    },
    disabled: {
      control: "boolean",
      description: "true일 경우 업로드를 비활성화합니다",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onChange: {
      description: "파일이 변경될 때 호출되는 콜백 함수",
      table: {
        type: { summary: "(files: File[]) => void" },
      },
    },
    onError: {
      description: "에러가 발생했을 때 호출되는 콜백 함수",
      table: {
        type: { summary: "(error: string) => void" },
      },
    },
    accept: {
      description: "허용할 파일 타입",
      table: {
        type: { summary: "Accept" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxFiles: 5,
  },
};

const BasicStory = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  return (
    <div className="w-[600px]">
      <FileUpload
        value={files}
        onChange={setFiles}
        onError={setError}
        maxFiles={5}
      />
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
      {files.length > 0 && (
        <div className="mt-4 p-4 bg-cms-gray-100 rounded-md">
          <h3 className="text-sm font-medium mb-2">
            업로드된 파일: {files.length}개
          </h3>
        </div>
      )}
    </div>
  );
};

export const Basic: Story = {
  render: () => <BasicStory />,
  parameters: {
    docs: {
      description: {
        story: "기본 파일 업로드 예제입니다 (최대 5개).",
      },
    },
  },
};

const PDFOnlyStory = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  return (
    <div className="w-[600px]">
      <FileUpload
        value={files}
        onChange={setFiles}
        onError={setError}
        maxFiles={3}
        accept={{ "application/pdf": [".pdf"] }}
      />
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
      <p className="mt-2 text-xs text-cms-gray-400">PDF 파일만 업로드 가능</p>
    </div>
  );
};

export const PDFOnly: Story = {
  render: () => <PDFOnlyStory />,
  parameters: {
    docs: {
      description: {
        story: "PDF 파일만 업로드할 수 있는 예제입니다.",
      },
    },
  },
};

const DocumentsStory = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  return (
    <div className="w-[600px]">
      <FileUpload
        value={files}
        onChange={setFiles}
        onError={setError}
        maxFiles={5}
        accept={{
          "application/pdf": [".pdf"],
          "application/msword": [".doc"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
          "application/vnd.ms-excel": [".xls"],
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
        }}
      />
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
      <p className="mt-2 text-xs text-cms-gray-400">
        PDF, Word, Excel 파일만 업로드 가능
      </p>
    </div>
  );
};

export const Documents: Story = {
  render: () => <DocumentsStory />,
  parameters: {
    docs: {
      description: {
        story: "문서 파일(PDF, Word, Excel)만 업로드할 수 있는 예제입니다.",
      },
    },
  },
};

const SingleFileStory = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  return (
    <div className="w-[600px]">
      <FileUpload
        value={files}
        onChange={setFiles}
        onError={setError}
        maxFiles={1}
      />
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
    </div>
  );
};

export const SingleFile: Story = {
  render: () => <SingleFileStory />,
  parameters: {
    docs: {
      description: {
        story: "단일 파일만 업로드할 수 있는 예제입니다.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    maxFiles: 5,
  },
  render: (args) => (
    <div className="w-[600px]">
      <FileUpload {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "비활성화된 상태의 파일 업로드 컴포넌트입니다.",
      },
    },
  },
};

const LargeSizeStory = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  return (
    <div className="w-[600px]">
      <FileUpload
        value={files}
        onChange={setFiles}
        onError={setError}
        maxFiles={3}
        maxSize={50 * 1024 * 1024} // 50MB
      />
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
      <p className="mt-2 text-xs text-cms-gray-400">최대 파일 크기: 50MB</p>
    </div>
  );
};

export const LargeSize: Story = {
  render: () => <LargeSizeStory />,
  parameters: {
    docs: {
      description: {
        story: "대용량 파일(50MB)까지 업로드 가능한 예제입니다.",
      },
    },
  },
};

export const ForJsdoc: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[600px]">
      <div>
        <h3 className="mb-2 font-bold">Default</h3>
        <FileUpload />
      </div>
      <div>
        <h3 className="mb-2 font-bold">Disabled</h3>
        <FileUpload disabled />
      </div>
      <div>
        <h3 className="mb-2 font-bold">PDF Only</h3>
        <FileUpload accept={{ "application/pdf": [".pdf"] }} />
      </div>
    </div>
  ),
  parameters: {
    docs: { disable: true },
  },
};
