import { cn } from "@/utils/cn";

interface LoadingCircleProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-16 w-16",
};

/**
 * 시스템이 데이터를 처리 중이거나 다음 화면을 준비 중임을 시각적으로 나타내는 인디케이터입니다.
 *
 * {@link LoadingCircle}은 회전하는 원형 애니메이션을 통해 작업이 진행 중임을 알려
 * 사용자가 시스템이 멈춘 것으로 오해하지 않도록 돕습니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **데이터 로딩**: 페이지 진입 시 API로부터 데이터를 불러올 때
 * - **작업 처리 중**: 버튼 클릭 후 서버 응답을 기다릴 때
 * - **업로드/다운로드**: 파일 전송 상태를 표시할 때
 * - **점진적 로딩**: 무한 스크롤 등 하단에 추가 데이터를 불러올 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **짧은 대기 시간**: 0.3초 미만의 아주 짧은 대기 시간에는 오히려 화면을 깜빡거리게 할 수 있으므로 생략하는 것이 좋습니다.
 * - **진행률 표시**: 전체 작업 중 어느 정도 진행되었는지 정확한 수치가 중요한 경우 Progress Bar를 고려하세요.
 *
 * ## Layout behavior
 *
 * - **Centered**: 기본적으로 컨테이너의 중앙에 배치되도록 설정되어 있습니다.
 * - **Fixed vs Inline**: 페이지 전체 로딩 시에는 고정된 위치(Overlay)에, 버튼 내부 등에는 인라인으로 배치할 수 있습니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **적절한 크기 선택**: 로딩이 일어나는 맥락(페이지 전체, 카드 내부, 버튼 내부 등)에 맞는 `size`를 선택하세요.
 * - **텍스트와 병행**: 필요한 경우 '불러오는 중...'과 같은 텍스트를 함께 표시하여 의미를 더 명확히 하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **남용 지양**: 한 화면에 너무 많은 로딩 서클이 동시에 나타나면 사용자에게 피로감을 줄 수 있습니다.
 * - **무한 로딩**: 작업이 실패한 경우 로딩을 멈추고 적절한 에러 메시지를 표시해야 합니다.
 *
 * ## Accessibility
 *
 * - **Role**: `role="status"` 또는 `role="progressbar"`를 사용하여 현재 상태를 스크린 리더에 알립니다.
 * - **Aria Label**: 시각적으로 확인이 어려운 사용자를 위해 `aria-label="로딩 중"`과 같은 정보를 제공하는 것이 좋습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 로딩 서클 사용 예시:
 *
 * ```tsx
 * {isLoading ? (
 *   <LoadingCircle size="md" />
 * ) : (
 *   <DataContent />
 * )}
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 버튼 내부의 로딩 상태:
 *
 * ```tsx
 * <Button disabled={isSubmitting}>
 *   {isSubmitting && <LoadingCircle size="sm" className="mr-2" />}
 *   제출하기
 * </Button>
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Button}, 버튼 자체의 로딩 상태를 지원함
 * - {@link Modal}, 로딩 상태를 포함할 수 있는 오버레이
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Loading/LoadingCircle/For%20Jsdoc.png?raw=true)
 */
export function LoadingCircle({ size = "lg", className }: LoadingCircleProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          sizeClasses[size],
          "animate-spin rounded-full",
          "border-2 border-cms-gray-500 border-b-transparent",
          className,
        )}
      />
    </div>
  );
}
