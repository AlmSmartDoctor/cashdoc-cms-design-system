import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";

const meta: Meta<typeof ImageUpload> = {
  title: "Forms/ImageUpload",
  component: ImageUpload,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "드래그 앤 드롭 및 클릭을 통해 이미지를 업로드할 수 있는 컴포넌트입니다.",
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
        defaultValue: { summary: "1" },
      },
    },
    maxSize: {
      control: "number",
      description: "업로드 가능한 최대 파일 크기 (bytes)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "5242880" },
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
    showPreview: {
      control: "boolean",
      description: "true일 경우 업로드된 이미지 미리보기를 표시합니다",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxFiles: 1,
    showPreview: true,
  },
};

const SingleImageStory = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  return (
    <div className="w-[600px]">
      <ImageUpload
        value={files}
        onChange={setFiles}
        onError={setError}
        maxFiles={1}
        showPreview={true}
      />
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
      {files.length > 0 && (
        <div className="mt-4 p-4 bg-cms-gray-100 rounded-md">
          <h3 className="text-sm font-medium mb-2">업로드된 파일:</h3>
          <ul className="text-sm space-y-1">
            {files.map((file, index) => (
              <li key={index}>
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const SingleImage: Story = {
  render: () => <SingleImageStory />,
  parameters: {
    docs: {
      description: {
        story: "단일 이미지 업로드 예제입니다.",
      },
    },
  },
};

const MultipleImagesStory = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  return (
    <div className="w-[800px]">
      <ImageUpload
        value={files}
        onChange={setFiles}
        onError={setError}
        maxFiles={5}
        showPreview={true}
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

export const MultipleImages: Story = {
  render: () => <MultipleImagesStory />,
  parameters: {
    docs: {
      description: {
        story: "여러 이미지를 업로드할 수 있는 예제입니다 (최대 5개).",
      },
    },
  },
};

const NoPreviewStory = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="w-[600px]">
      <ImageUpload
        value={files}
        onChange={setFiles}
        maxFiles={3}
        showPreview={false}
      />
      {files.length > 0 && (
        <div className="mt-4 p-4 bg-cms-gray-100 rounded-md">
          <h3 className="text-sm font-medium mb-2">업로드된 파일:</h3>
          <ul className="text-sm space-y-1">
            {files.map((file, index) => (
              <li key={index}>
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const NoPreview: Story = {
  render: () => <NoPreviewStory />,
  parameters: {
    docs: {
      description: {
        story: "미리보기 없이 파일 이름만 표시하는 예제입니다.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    maxFiles: 1,
  },
  render: (args) => (
    <div className="w-[600px]">
      <ImageUpload {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "비활성화된 상태의 이미지 업로드 컴포넌트입니다.",
      },
    },
  },
};

const CustomSizeStory = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  return (
    <div className="w-[600px]">
      <ImageUpload
        value={files}
        onChange={setFiles}
        onError={setError}
        maxFiles={1}
        maxSize={1 * 1024 * 1024} // 1MB
        showPreview={true}
      />
      {error && (
        <p className="mt-2 text-sm text-cms-red-500">{error}</p>
      )}
      <p className="mt-2 text-xs text-cms-gray-400">
        최대 파일 크기: 1MB
      </p>
    </div>
  );
};

export const CustomSize: Story = {
  render: () => <CustomSizeStory />,
  parameters: {
    docs: {
      description: {
        story: "파일 크기 제한을 1MB로 설정한 예제입니다.",
      },
    },
  },
};
