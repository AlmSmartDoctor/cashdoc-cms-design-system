import { cn } from "@/utils/cn";
import { useCallback, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { ImageUploadIcon } from "../icons/ImageUploadIcon";
import { CloseIcon } from "../icons/CloseIcon";

export interface ImageUploadProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
  disabled?: boolean;
  className?: string;
  showPreview?: boolean;
  onError?: (error: string) => void;
}

/**
 * 드래그 앤 드롭 및 클릭을 통해 이미지를 업로드할 수 있는 컴포넌트입니다.
 *
 * {@link ImageUpload}는 사용자가 이미지 파일을 선택하고 업로드할 수 있게 합니다.
 * 드래그 앤 드롭, 클릭하여 선택, 미리보기 등의 기능을 제공합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **프로필 이미지 업로드**: 사용자 프로필 사진 등록 시
 * - **상품 이미지 등록**: 여러 상품 이미지를 한 번에 업로드해야 할 때
 * - **문서 첨부**: 이미지 형태의 문서나 스크린샷을 첨부할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **일반 파일 업로드**: 이미지가 아닌 다양한 형식의 파일을 업로드할 때는 일반 FileUpload 컴포넌트 사용
 * - **대용량 파일**: 매우 큰 파일의 경우 진행률 표시가 있는 별도 업로드 컴포넌트 고려
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본 이미지 업로드:
 *
 * ```tsx
 * <ImageUpload
 *   onChange={(files) => console.log(files)}
 *   maxFiles={1}
 *   maxSize={5 * 1024 * 1024} // 5MB
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 다중 이미지 업로드:
 *
 * ```tsx
 * <ImageUpload
 *   onChange={(files) => console.log(files)}
 *   maxFiles={5}
 *   showPreview={true}
 * />
 * ```
 * {@end-tool}
 */
export const ImageUpload = ({
  value = [],
  onChange,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
  disabled = false,
  className,
  showPreview = true,
  onError,
}: ImageUploadProps) => {
  const [files, setFiles] = useState<File[]>(value);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === "file-too-large") {
          onError?.(`파일 크기는 ${maxSize / 1024 / 1024}MB를 초과할 수 없습니다.`);
        } else if (error.code === "file-invalid-type") {
          onError?.("지원하지 않는 파일 형식입니다.");
        } else if (error.code === "too-many-files") {
          onError?.(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
        }
        return;
      }

      const newFiles = maxFiles === 1 ? acceptedFiles : [...files, ...acceptedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onChange?.(newFiles);
    },
    [files, maxFiles, maxSize, onChange, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    disabled,
    multiple: maxFiles > 1,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const isSingleMode = maxFiles === 1;
  const hasFile = files.length > 0;
  const isMaxReached = files.length >= maxFiles;

  return (
    <div className={cn("w-full", className)}>
      {!(!isSingleMode && isMaxReached) && (
        <div
          {...getRootProps()}
          className={cn(
            "relative rounded-md border-2 border-dashed",
            "transition-colors cursor-pointer",
            "flex flex-col items-center justify-center",
            "min-h-[200px]",
            isDragActive
              ? "border-cms-black bg-cms-gray-100"
              : "border-cms-gray-300 bg-white hover:bg-cms-gray-50",
            disabled && "opacity-50 cursor-not-allowed pointer-events-none",
            isSingleMode && hasFile && "p-0 border-solid"
          )}
        >
          <input {...getInputProps()} />

          {isSingleMode && hasFile && showPreview ? (
            <div className="relative w-full h-full min-h-[200px] group flex items-center justify-center bg-cms-gray-100">
              <img
                src={URL.createObjectURL(files[0])}
                alt={files[0].name}
                className="max-w-full max-h-full object-contain rounded-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(0);
                }}
                className={cn(
                  "absolute top-2 right-2",
                  "w-8 h-8 rounded-full",
                  "flex items-center justify-center",
                  "bg-white shadow-md",
                  "opacity-0 group-hover:opacity-100",
                  "transition-opacity",
                  "hover:bg-cms-gray-100",
                  "border-none"
                )}
                aria-label="파일 제거"
              >
                <CloseIcon />
              </button>
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/60 to-transparent rounded-b-md">
                <p className="text-xs text-white truncate">{files[0].name}</p>
                <p className="text-xs text-white/80">
                  {(files[0].size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 flex flex-col items-center">
              <ImageUploadIcon className="text-cms-gray-400" />
              <p className="mt-4 text-sm font-medium text-cms-black text-center">
                {isDragActive ? "파일을 여기에 놓으세요" : "클릭하거나 파일을 드래그하세요"}
              </p>
              <p className="mt-1 text-xs text-cms-gray-400 text-center">
                {maxFiles > 1 ? `최대 ${maxFiles}개` : "1개"} 파일, 최대{" "}
                {maxSize / 1024 / 1024}MB
              </p>
            </div>
          )}
        </div>
      )}

      {!isSingleMode && showPreview && files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 justify-items-center">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative group rounded-md overflow-hidden border border-cms-gray-300"
            >
              <div className="aspect-square bg-cms-gray-100">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className={cn(
                  "absolute top-2 right-2",
                  "w-7 h-7 rounded-full",
                  "flex items-center justify-center",
                  "bg-white shadow-md",
                  "opacity-0 group-hover:opacity-100",
                  "transition-opacity",
                  "hover:bg-cms-gray-100",
                  "border-none"
                )}
                aria-label="파일 제거"
              >
                <CloseIcon />
              </button>
              <div className="px-2 py-1.5 bg-white border-t border-cms-gray-300">
                <p className="text-xs text-cms-gray-600 truncate">{file.name}</p>
                <p className="text-xs text-cms-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ImageUpload.displayName = "ImageUpload";
