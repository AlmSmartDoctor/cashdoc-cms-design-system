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
    validateImage: {
      description:
        "이미지 검증 함수. 파일과 메타데이터(width, height, aspectRatio, size)를 받아 에러 메시지를 반환하거나 null을 반환합니다.",
      table: {
        type: {
          summary:
            "(file: File, metadata: ImageMetadata) => string | null | Promise<string | null>",
        },
      },
    },
    placeholder: {
      control: "text",
      description: "기본 상태의 안내 문구",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"클릭하거나 파일을 드래그하세요"' },
      },
    },
    placeholderActive: {
      control: "text",
      description: "드래그 활성화 상태의 안내 문구",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"파일을 여기에 놓으세요"' },
      },
    },
    error: {
      control: "boolean",
      description: "true일 경우 에러 상태로 빨간색 테두리를 표시합니다",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
      <p className="mt-2 text-xs text-cms-gray-400">최대 파일 크기: 1MB</p>
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

const ValidateMinimumSizeStory = () => {
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
        validateImage={(_, metadata) => {
          if (metadata.width < 800 || metadata.height < 600) {
            return "이미지는 최소 800x600 이상이어야 합니다.";
          }
          return null;
        }}
      />
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
      <p className="mt-2 text-xs text-cms-gray-400">
        최소 이미지 크기: 800x600px
      </p>
      {files.length > 0 && (
        <div className="mt-4 p-4 bg-cms-gray-100 rounded-md">
          <h3 className="text-sm font-medium mb-2">업로드 성공!</h3>
          <p className="text-sm text-cms-gray-600">{files[0].name}</p>
        </div>
      )}
    </div>
  );
};

export const ValidateMinimumSize: Story = {
  render: () => <ValidateMinimumSizeStory />,
  parameters: {
    docs: {
      description: {
        story:
          "최소 이미지 크기를 검증하는 예제입니다. 800x600 미만의 이미지는 업로드할 수 없습니다.",
      },
    },
  },
};

const ValidateExactSizeStory = () => {
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
        validateImage={(_, metadata) => {
          if (metadata.width !== 1920 || metadata.height !== 1080) {
            return `이미지는 정확히 1920x1080이어야 합니다. (현재: ${metadata.width}x${metadata.height})`;
          }
          return null;
        }}
      />
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
      <p className="mt-2 text-xs text-cms-gray-400">
        정확한 이미지 크기: 1920x1080px
      </p>
      {files.length > 0 && (
        <div className="mt-4 p-4 bg-cms-gray-100 rounded-md">
          <h3 className="text-sm font-medium mb-2">업로드 성공!</h3>
          <p className="text-sm text-cms-gray-600">{files[0].name}</p>
        </div>
      )}
    </div>
  );
};

export const ValidateExactSize: Story = {
  render: () => <ValidateExactSizeStory />,
  parameters: {
    docs: {
      description: {
        story:
          "정확한 이미지 크기를 요구하는 예제입니다. 1920x1080 크기의 이미지만 업로드할 수 있습니다.",
      },
    },
  },
};

const ValidateAspectRatioStory = () => {
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
        validateImage={(_, metadata) => {
          const targetRatio = 16 / 9;
          const tolerance = 0.1;
          if (Math.abs(metadata.aspectRatio - targetRatio) > tolerance) {
            return `이미지 비율은 16:9여야 합니다. (현재: ${metadata.aspectRatio.toFixed(2)})`;
          }
          return null;
        }}
      />
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
      <p className="mt-2 text-xs text-cms-gray-400">허용 비율: 16:9 (±0.1)</p>
      {files.length > 0 && (
        <div className="mt-4 p-4 bg-cms-gray-100 rounded-md">
          <h3 className="text-sm font-medium mb-2">업로드 성공!</h3>
          <p className="text-sm text-cms-gray-600">{files[0].name}</p>
        </div>
      )}
    </div>
  );
};

export const ValidateAspectRatio: Story = {
  render: () => <ValidateAspectRatioStory />,
  parameters: {
    docs: {
      description: {
        story:
          "이미지 비율을 검증하는 예제입니다. 16:9 비율(±0.1 허용)이 아닌 이미지는 업로드할 수 없습니다.",
      },
    },
  },
};

const ValidateSquareImageStory = () => {
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
        validateImage={(_, metadata) => {
          const tolerance = 0.05;
          if (Math.abs(metadata.aspectRatio - 1) > tolerance) {
            return `정사각형 이미지만 업로드 가능합니다. (현재 비율: ${metadata.aspectRatio.toFixed(2)})`;
          }
          return null;
        }}
      />
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
      <p className="mt-2 text-xs text-cms-gray-400">
        정사각형 이미지만 업로드 가능 (1:1 비율)
      </p>
      {files.length > 0 && (
        <div className="mt-4 p-4 bg-cms-gray-100 rounded-md">
          <h3 className="text-sm font-medium mb-2">업로드 성공!</h3>
          <p className="text-sm text-cms-gray-600">{files[0].name}</p>
        </div>
      )}
    </div>
  );
};

export const ValidateSquareImage: Story = {
  render: () => <ValidateSquareImageStory />,
  parameters: {
    docs: {
      description: {
        story:
          "정사각형 이미지만 허용하는 예제입니다. 프로필 이미지 등에 유용합니다.",
      },
    },
  },
};

const ValidateComplexStory = () => {
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
        validateImage={(_, metadata) => {
          // 최대 너비 제한
          if (metadata.width > 4000) {
            return "이미지 너비는 4000px를 초과할 수 없습니다.";
          }

          // 최소 너비 제한
          if (metadata.width < 1000) {
            return "이미지 너비는 최소 1000px 이상이어야 합니다.";
          }

          // 세로 이미지 제한
          if (metadata.aspectRatio < 1) {
            return "세로 이미지는 업로드할 수 없습니다.";
          }

          // 파일 크기 제한 (2MB)
          if (metadata.size > 2 * 1024 * 1024) {
            return "파일 크기는 2MB를 초과할 수 없습니다.";
          }

          return null;
        }}
      />
      {error && <p className="mt-2 text-sm text-cms-red-500">{error}</p>}
      <div className="mt-2 text-xs text-cms-gray-400 space-y-1">
        <p>• 너비: 1000px ~ 4000px</p>
        <p>• 가로 이미지만 허용 (비율 ≥ 1:1)</p>
        <p>• 최대 파일 크기: 2MB</p>
      </div>
      {files.length > 0 && (
        <div className="mt-4 p-4 bg-cms-gray-100 rounded-md">
          <h3 className="text-sm font-medium mb-2">업로드 성공!</h3>
          <p className="text-sm text-cms-gray-600">{files[0].name}</p>
        </div>
      )}
    </div>
  );
};

export const ValidateComplex: Story = {
  render: () => <ValidateComplexStory />,
  parameters: {
    docs: {
      description: {
        story:
          "여러 조건을 복합적으로 검증하는 예제입니다. 너비, 비율, 파일 크기를 모두 검증합니다.",
      },
    },
  },
};

const CustomPlaceholderStory = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="w-[600px]">
      <ImageUpload
        value={files}
        onChange={setFiles}
        maxFiles={1}
        showPreview={true}
        placeholder="상품 이미지를 업로드하세요"
        placeholderActive="이미지를 드롭하세요"
      />
      {files.length > 0 && (
        <div className="mt-4 p-4 bg-cms-gray-100 rounded-md">
          <h3 className="text-sm font-medium mb-2">업로드된 파일:</h3>
          <p className="text-sm text-cms-gray-600">{files[0].name}</p>
        </div>
      )}
    </div>
  );
};

export const CustomPlaceholder: Story = {
  render: () => <CustomPlaceholderStory />,
  parameters: {
    docs: {
      description: {
        story:
          "커스텀 안내 문구를 사용하는 예제입니다. placeholder와 placeholderActive props로 텍스트를 커스터마이징할 수 있습니다.",
      },
    },
  },
};

const ErrorStateStory = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = (error: string) => {
    setErrorMessage(error);
    setHasError(true);
  };

  const handleChange = (newFiles: File[]) => {
    setFiles(newFiles);
    setHasError(false);
    setErrorMessage("");
  };

  return (
    <div className="w-[600px]">
      <ImageUpload
        value={files}
        onChange={handleChange}
        onError={handleError}
        error={hasError}
        maxFiles={1}
        showPreview={true}
        validateImage={(_, metadata) => {
          if (metadata.width < 800 || metadata.height < 600) {
            return "이미지는 최소 800x600 이상이어야 합니다.";
          }
          return null;
        }}
      />
      {errorMessage && (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      )}
      <p className="mt-2 text-xs text-cms-gray-400">
        최소 이미지 크기: 800x600px (에러 발생 시 빨간색 테두리 표시)
      </p>
    </div>
  );
};

export const ErrorState: Story = {
  render: () => <ErrorStateStory />,
  parameters: {
    docs: {
      description: {
        story:
          "에러 상태를 표시하는 예제입니다. 검증 실패 시 빨간색 테두리가 표시됩니다.",
      },
    },
  },
};
