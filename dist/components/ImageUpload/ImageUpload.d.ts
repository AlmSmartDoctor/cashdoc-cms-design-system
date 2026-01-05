import { Accept } from 'react-dropzone';

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
    validateImage?: (file: File, metadata: ImageMetadata) => string | null | Promise<string | null>;
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
 */
export declare const ImageUpload: {
    ({ value, onChange, maxFiles, maxSize, accept, disabled, className, showPreview, error, onError, validateImage, placeholder, placeholderActive, }: ImageUploadProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
