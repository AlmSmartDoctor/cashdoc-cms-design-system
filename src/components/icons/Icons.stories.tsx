import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRightIcon } from "./ChevronRightIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { ClearIcon } from "./ClearIcon";
import { CloseIcon } from "./CloseIcon";
import { FileUploadIcon } from "./FileUploadIcon";
import { ImageUploadIcon } from "./ImageUploadIcon";
import { FileIcon } from "./FileIcon";

const meta: Meta = {
  title: "Components/Icons",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "디자인 시스템에서 공통으로 사용되는 SVG 아이콘 컴포넌트들입니다. 모든 아이콘은 SVG 속성을 상속받아 크기(width, height)와 색상(color, fill)을 자유롭게 조절할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const AllIconsStory = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="flex flex-col items-center gap-2 p-4 border border-cms-gray-300 rounded-md">
        <ChevronRightIcon className="text-cms-black" />
        <p className="text-xs text-cms-gray-600">ChevronRight</p>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 border border-cms-gray-300 rounded-md">
        <ChevronDownIcon className="text-cms-black" />
        <p className="text-xs text-cms-gray-600">ChevronDown</p>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 border border-cms-gray-300 rounded-md">
        <ClearIcon className="text-cms-black" />
        <p className="text-xs text-cms-gray-600">Clear</p>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 border border-cms-gray-300 rounded-md">
        <CloseIcon className="text-cms-black" />
        <p className="text-xs text-cms-gray-600">Close</p>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 border border-cms-gray-300 rounded-md">
        <FileUploadIcon className="text-cms-gray-400" />
        <p className="text-xs text-cms-gray-600">FileUpload</p>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 border border-cms-gray-300 rounded-md">
        <ImageUploadIcon className="text-cms-gray-400" />
        <p className="text-xs text-cms-gray-600">ImageUpload</p>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 border border-cms-gray-300 rounded-md">
        <FileIcon type="application/pdf" />
        <p className="text-xs text-cms-gray-600">File (PDF)</p>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 border border-cms-gray-300 rounded-md">
        <FileIcon type="application/msword" />
        <p className="text-xs text-cms-gray-600">File (Word)</p>
      </div>
    </div>
  );
};

export const AllIcons: Story = {
  render: () => <AllIconsStory />,
  parameters: {
    docs: {
      description: {
        story: "디자인 시스템에서 사용되는 모든 아이콘들입니다.",
      },
    },
  },
};

export const ChevronRight: Story = {
  render: () => <ChevronRightIcon className="text-cms-black" />,
};

export const ChevronDown: Story = {
  render: () => <ChevronDownIcon className="text-cms-black" />,
};

export const ChevronDownOpen: Story = {
  render: () => <ChevronDownIcon className="text-cms-black" isOpen={true} />,
};

export const Clear: Story = {
  render: () => <ClearIcon className="text-cms-black" />,
};

export const Close: Story = {
  render: () => <CloseIcon className="text-cms-black" />,
};

export const FileUpload: Story = {
  render: () => <FileUploadIcon className="text-cms-gray-400" />,
};

export const ImageUpload: Story = {
  render: () => <ImageUploadIcon className="text-cms-gray-400" />,
};

export const FilePDF: Story = {
  render: () => <FileIcon type="application/pdf" />,
};

export const FileWord: Story = {
  render: () => <FileIcon type="application/msword" />,
};

export const FileExcel: Story = {
  render: () => <FileIcon type="application/vnd.ms-excel" />,
};