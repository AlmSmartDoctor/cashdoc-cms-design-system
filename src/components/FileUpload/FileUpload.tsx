import { cn } from "@/utils/cn";
import { useCallback, useState } from "react";
import type { Accept, FileRejection } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { FileUploadIcon, FileIcon, XIcon as CloseIcon } from "../icons";

export type FileUploadProps = {
  value?: File[];
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
  disabled?: boolean;
  className?: string;
  onError?: (error: string) => void;
};

/**
 * 드래그 앤 드롭 및 클릭을 통해 파일을 업로드할 수 있는 컴포넌트입니다.
 *
 * {@link FileUpload}는 사용자가 다양한 형식의 파일을 선택하고 업로드할 수 있게 합니다.
 * 드래그 앤 드롭, 클릭하여 선택, 파일 목록 표시 등의 기능을 제공합니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **문서 첨부**: PDF, Word, Excel 등의 문서 파일을 업로드할 때
 * - **다양한 파일 형식**: 이미지뿐만 아니라 여러 종류의 파일을 업로드할 때
 * - **파일 목록 관리**: 업로드된 파일의 이름과 크기를 확인해야 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **이미지 전용**: 이미지만 업로드하고 미리보기가 필요한 경우는 {@link ImageUpload} 사용
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본 파일 업로드:
 *
 * ```tsx
 * <FileUpload
 *   onChange={(files) => console.log(files)}
 *   maxFiles={1}
 *   maxSize={10 * 1024 * 1024} // 10MB
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 다중 파일 업로드 (PDF만):
 *
 * ```tsx
 * <FileUpload
 *   onChange={(files) => console.log(files)}
 *   maxFiles={5}
 *   accept={{ "application/pdf": [".pdf"] }}
 * />
 * ```
 * {@end-tool}
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Forms/FileUpload/For%20Jsdoc.png?raw=true)
 */
export const FileUpload = ({
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept,
  disabled = false,
  className,
  onError,
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>(value);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === "file-too-large") {
          onError?.(
            `파일 크기는 ${maxSize / 1024 / 1024}MB를 초과할 수 없습니다.`,
          );
        } else if (error.code === "file-invalid-type") {
          onError?.("지원하지 않는 파일 형식입니다.");
        } else if (error.code === "too-many-files") {
          onError?.(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
        }
        return;
      }

      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onChange?.(newFiles);
    },
    [files, maxFiles, maxSize, onChange, onError],
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

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const isMaxReached = files.length >= maxFiles;

  return (
    <div className={cn("w-full", className)}>
      {!isMaxReached && (
        <div
          {...getRootProps()}
          className={cn(
            "relative rounded-cms-lg border-[1.5px] border-dashed",
            "cursor-pointer transition-colors",
            "flex flex-col items-center justify-center",
            "min-h-40 p-6",
            isDragActive
              ? "border-cms-gray-900 bg-cms-white"
              : "border-cms-gray-300 bg-cms-gray-50 hover:border-cms-gray-900 hover:bg-cms-white",
            disabled && "pointer-events-none cursor-not-allowed opacity-50",
          )}
        >
          <input {...getInputProps()} />
          <FileUploadIcon className="size-8 text-cms-gray-500" />
          <p className="mt-2 text-center text-sm font-semibold text-cms-gray-900">
            {isDragActive ?
              "파일을 여기에 놓으세요"
            : "클릭하거나 파일을 드래그하세요"}
          </p>
          <p className="mt-0.5 text-center text-[12px] text-cms-gray-550">
            최대 {maxFiles}개 파일, 최대 {maxSize / 1024 / 1024}MB
          </p>
        </div>
      )}

      {files.length > 0 && (
        <div className={cn("space-y-1.5", isMaxReached ? "" : "mt-3")}>
          {files.map((file, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2.5",
                "rounded-cms-md border border-cms-gray-200",
                "bg-cms-white",
                "hover:bg-cms-gray-50",
                "group transition-colors",
              )}
            >
              <FileIcon className="size-8 text-cms-gray-500" />
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "truncate text-[13px] leading-tight",
                    "font-medium text-cms-gray-900",
                  )}
                >
                  {file.name}
                </p>
                <p className="text-[11px] leading-tight text-cms-gray-550">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className={cn(
                  "size-7 shrink-0 rounded-cms-sm",
                  "flex items-center justify-center",
                  "text-cms-gray-450",
                  "hover:bg-cms-gray-100 hover:text-cms-gray-900",
                  "transition-colors",
                  "border-none",
                )}
                aria-label="파일 제거"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FileUpload.displayName = "FileUpload";
