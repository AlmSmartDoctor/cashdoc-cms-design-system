import { Toaster as Sonner } from "sonner";
import { type ComponentProps } from "react";
import { cn } from "@/utils/cn";

type ToasterProps = ComponentProps<typeof Sonner>;

/**
 * 사용자의 액션에 대한 가벼운 피드백을 화면 구석에 일시적으로 표시하는 알림 컴포넌트입니다.
 *
 * {@link Toaster}는 시스템의 상태 변화(성공, 실패, 경고 등)를 비침습적인 방식으로 알립니다.
 * `sonner` 라이브러리를 기반으로 하며, CMS 디자인 가이드에 맞춘 스타일링이 적용되어 있습니다.
 * 어플리케이션 최상위 수준(App.tsx 등)에 한 번만 배치하면 어디서든 `toast()` 함수를 통해 알림을 띄울 수 있습니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **간단한 결과 알림**: "저장되었습니다", "복사 완료" 등 짧은 피드백
 * - **비파괴적 액션 확인**: 사용자의 흐름을 방해하지 않고 알림만 주고 싶을 때
 * - **백그라운드 작업 완료**: 서버 요청이 성공적으로 처리되었음을 알릴 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **중요한 의사 결정**: 사용자가 반드시 읽고 확인 버튼을 눌러야 하는 내용은 `Modal`을 사용하세요.
 * - **긴 메시지**: 토스트는 수초 후 사라지므로, 읽는 데 시간이 걸리는 긴 텍스트는 부적절합니다.
 * - **에러 세부 정보**: 복잡한 에러 로그나 해결 방법이 포함된 에러는 `Modal`이나 전용 에러 페이지에서 보여주세요.
 *
 * ## Layout behavior
 *
 * - **Floating**: 화면 최상단 레이어에 고정된 위치(기본값: 하단 중앙)에 나타납니다.
 * - **Stacking**: 여러 개의 토스트가 동시에 발생하면 차례대로 쌓여서 표시됩니다.
 * - **Auto-dismiss**: 일정 시간(기본 4초)이 지나면 자동으로 사라집니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확하고 간결하게**: 핵심만 담은 짧은 문장을 사용하세요. (예: "이미지가 업로드되었습니다")
 * - **적절한 타입 사용**: `toast.success`, `toast.error` 등 상황에 맞는 메서드를 사용하여 색상과 아이콘으로 의미를 전달하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **중요 정보 포함**: 토스트는 금방 사라지므로, 계좌번호나 비밀번호 같은 중요 정보를 여기에만 표시해서는 안 됩니다.
 * - **과도한 사용**: 짧은 시간에 너무 많은 토스트가 발생하면 사용자에게 스트레스를 줄 수 있습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 최상위 컴포넌트 설정:
 *
 * ```tsx
 * function App() {
 *   return (
 *     <>
 *       <Router />
 *       <Toaster />
 *     </>
 *   );
 * }
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 다양한 토스트 호출 방법:
 *
 * ```tsx
 * // 기본
 * toast("환영합니다!");
 *
 * // 성공
 * toast.success("저장에 성공했습니다.");
 *
 * // 에러
 * toast.error("서버와의 연결이 원활하지 않습니다.");
 *
 * // 상세 설명 포함
 * toast("알림", {
 *   description: "새로운 메시지가 도착했습니다."
 * });
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Modal}, 더 중요하거나 명시적 확인이 필요한 알림
 *
 * ## 참고사진
 * ![](https://github.com/AlmSmartDoctor/ccds-screenshots/blob/main/screenshots/Feedback/Toaster/For%20Jsdoc.png?raw=true)
 */
const Toaster = ({ position = "bottom-center", ...props }: ToasterProps) => {
  return (
    <Sonner
      position={position}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast w-full flex items-center",
            "text-cms-gray-900",
            "rounded-cms-lg shadow-lg bg-cms-white",
            "gap-3 p-4",
            "border! border-cms-blue-600!",
            "[&_[data-content]]:flex-row!",
            "[&_[data-content]]:items-baseline!",
          ),
          title: cn(
            "group-[.toast]:text-cms-gray-900",
            "group-[.toast]:font-bold",
            "group-[.toast]:text-sm",
            "group-[.toast]:mr-2",
            "group-[.toast]:font-bold!",
          ),
          description: cn(
            "group-[.toast]:text-cms-gray-500",
            "group-[.toast]:text-xs",
            "group-[.toast]:font-medium",
          ),
          actionButton: cn(
            "group-[.toast]:bg-cms-gray-900",
            "group-[.toast]:text-cms-white",
          ),
          cancelButton: cn(
            "group-[.toast]:bg-cms-gray-100",
            "group-[.toast]:text-cms-gray-500",
          ),
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
