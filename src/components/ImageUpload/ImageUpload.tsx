import { cn } from "@/utils/cn";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone, Accept, FileRejection } from "react-dropzone";
import { ImageUploadIcon, XIcon as CloseIcon } from "../icons";
import { Text } from "../Text/Text";

export interface ImageMetadata {
  width: number;
  height: number;
  aspectRatio: number;
  size: number;
}

export interface ImageUploadProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
  disabled?: boolean;
  className?: string;
  showPreview?: boolean;
  error?: boolean;
  onError?: (error: string) => void;
  validateImage?: (
    file: File,
    metadata: ImageMetadata,
  ) => string | null | Promise<string | null>;
  placeholder?: string;
  placeholderActive?: string;
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
 *
 * {@tool snippet}
 * 최소 이미지 크기 검증:
 *
 * ```tsx
 * <ImageUpload
 *   validateImage={(file, metadata) => {
 *     if (metadata.width < 800 || metadata.height < 600) {
 *       return "이미지는 최소 800x600 이상이어야 합니다.";
 *     }
 *     return null;
 *   }}
 *   onError={(error) => alert(error)}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 정확한 이미지 크기 검증:
 *
 * ```tsx
 * <ImageUpload
 *   validateImage={(file, metadata) => {
 *     if (metadata.width !== 1920 || metadata.height !== 1080) {
 *       return `이미지는 정확히 1920x1080이어야 합니다. (현재: ${metadata.width}x${metadata.height})`;
 *     }
 *     return null;
 *   }}
 *   onError={(error) => alert(error)}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 이미지 비율 검증:
 *
 * ```tsx
 * <ImageUpload
 *   validateImage={(file, metadata) => {
 *     const targetRatio = 16 / 9;
 *     const tolerance = 0.1;
 *     if (Math.abs(metadata.aspectRatio - targetRatio) > tolerance) {
 *       return "이미지 비율은 16:9여야 합니다.";
 *     }
 *     return null;
 *   }}
 *   onError={(error) => alert(error)}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 복합 검증:
 *
 * ```tsx
 * <ImageUpload
 *   validateImage={(file, metadata) => {
 *     if (metadata.width > 4000) {
 *       return "이미지 너비는 4000px를 초과할 수 없습니다.";
 *     }
 *     if (metadata.aspectRatio < 1) {
 *       return "세로 이미지는 업로드할 수 없습니다.";
 *     }
 *     if (metadata.size > 2 * 1024 * 1024) {
 *       return "파일 크기는 2MB를 초과할 수 없습니다.";
 *     }
 *     return null;
 *   }}
 *   onError={(error) => alert(error)}
 * />
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 커스텀 안내 문구:
 *
 * ```tsx
 * <ImageUpload
 *   placeholder="상품 이미지를 업로드하세요"
 *   placeholderActive="이미지를 드롭하세요"
 *   onChange={(files) => console.log(files)}
 * />
 * ```
 * {@end-tool}
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Forms/ImageUpload/For%20Jsdoc.png?raw=true)
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
  error = false,
  onError,
  validateImage,
  placeholder = "클릭하거나 파일을 드래그하세요",
  placeholderActive = "파일을 여기에 놓으세요",
}: ImageUploadProps) => {
  const [files, setFiles] = useState<File[]>(value);

  const fileUrls = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  useEffect(() => {
    return () => {
      fileUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [fileUrls]);

  const loadImageMetadata = (file: File): Promise<ImageMetadata> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({
          width: img.width,
          height: img.height,
          aspectRatio: img.width / img.height,
          size: file.size,
        });
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("이미지를 로드할 수 없습니다."));
      };

      img.src = url;
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
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

      // 커스텀 검증 로직 실행
      if (validateImage) {
        const validatedFiles: File[] = [];

        for (const file of acceptedFiles) {
          try {
            const metadata = await loadImageMetadata(file);
            const validationError = await validateImage(file, metadata);

            if (validationError) {
              onError?.(validationError);
              continue;
            }

            validatedFiles.push(file);
          } catch (error) {
            onError?.((error as Error).message);
          }
        }

        if (validatedFiles.length === 0) return;

        setFiles((prev) => {
          const newFiles =
            maxFiles === 1
              ? validatedFiles
              : [...prev, ...validatedFiles].slice(0, maxFiles);
          onChange?.(newFiles);
          return newFiles;
        });
      } else {
        setFiles((prev) => {
          const newFiles =
            maxFiles === 1
              ? acceptedFiles
              : [...prev, ...acceptedFiles].slice(0, maxFiles);
          onChange?.(newFiles);
          return newFiles;
        });
      }
    },
    [maxFiles, maxSize, onChange, onError, validateImage],
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
    setFiles((prev) => {
      const newFiles = prev.filter((_, i) => i !== index);
      onChange?.(newFiles);
      return newFiles;
    });
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
            "relative rounded-md border-2 border-solid",
            "cursor-pointer transition-colors",
            "flex flex-col items-center justify-center",
            "min-h-50",
            error
              ? "border-red-500"
              : isDragActive
                ? "border-cms-black bg-cms-gray-100"
                : "border-cms-gray-300 bg-white hover:bg-cms-gray-50",
            disabled && "pointer-events-none cursor-not-allowed opacity-50",
            isSingleMode && hasFile && "p-0",
          )}
        >
          <input {...getInputProps()} />

          {isSingleMode && hasFile && showPreview ? (
            <div
              className={cn(
                "group flex items-center justify-center",
                "relative h-full min-h-50 w-full",
                "overflow-hidden rounded-md",
                "bg-cms-gray-100",
              )}
            >
              <img
                src={fileUrls[0]}
                alt={files[0].name}
                className="max-h-full max-w-full object-contain"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(0);
                }}
                className={cn(
                  "absolute top-2 right-2",
                  "h-8 w-8 rounded-full",
                  "flex items-center justify-center",
                  "bg-white shadow-md",
                  "hover:bg-cms-gray-100",
                  "cursor-pointer",
                  "border-none",
                )}
                aria-label="파일 제거"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center p-6">
              <ImageUploadIcon className="text-cms-gray-400" />
              <Text
                variant="emphasis"
                align="center"
                className="mt-4 text-cms-black"
              >
                {isDragActive ? placeholderActive : placeholder}
              </Text>
              <Text
                variant="caption"
                align="center"
                className="mt-1 text-cms-gray-400"
              >
                {maxFiles > 1 ? `최대 ${maxFiles}개` : "1개"} 파일, 최대{" "}
                {maxSize / 1024 / 1024}MB
              </Text>
            </div>
          )}
        </div>
      )}

      {!isSingleMode && showPreview && files.length > 0 && (
        <div
          className={cn(
            "mt-4 gap-4",
            "grid grid-cols-2",
            "sm:grid-cols-3",
            "md:grid-cols-4",
            "justify-items-center",
          )}
        >
          {files.map((file, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-md",
                "border border-cms-gray-300",
              )}
            >
              <div className="aspect-square bg-cms-gray-100">
                <img
                  src={fileUrls[index]}
                  alt={file.name}
                  className="h-full w-full object-cover"
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
                  "h-7 w-7 rounded-full",
                  "flex items-center justify-center",
                  "bg-white shadow-md",
                  "hover:bg-cms-gray-100",
                  "cursor-pointer",
                  "border-none",
                )}
                aria-label="파일 제거"
              >
                <CloseIcon className="h-3 w-3" />
              </button>
              <div
                className={cn(
                  "bg-white px-2 py-1.5",
                  "border-t border-cms-gray-300",
                )}
              >
                <Text variant="caption" className="truncate text-cms-gray-600">
                  {file.name}
                </Text>
                <Text variant="caption" className="text-cms-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </Text>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ImageUpload.displayName = "ImageUpload";
