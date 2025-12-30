import { Accept } from 'react-dropzone';

export interface FileUploadProps {
    value?: File[];
    onChange?: (files: File[]) => void;
    maxFiles?: number;
    maxSize?: number;
    accept?: Accept;
    disabled?: boolean;
    className?: string;
    onError?: (error: string) => void;
}
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
 */
export declare const FileUpload: {
    ({ value, onChange, maxFiles, maxSize, accept, disabled, className, onError, }: FileUploadProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
