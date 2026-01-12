import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "../Button";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

/**
 * 사용자에게 중요한 정보를 표시하거나 입력을 요구하는 오버레이 대화상자입니다.
 *
 * {@link Modal}은 사용자의 주의를 집중시켜야 하는 상황에서 사용됩니다.
 * 모달이 열리면 배경이 어두워지며, 사용자는 모달과 상호작용하거나 닫기 전까지
 * 페이지의 다른 부분과 상호작용할 수 없습니다.
 *
 * Radix UI의 Dialog 컴포넌트를 기반으로 구현되어 접근성과 키보드 내비게이션이
 * 자동으로 처리됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **중요한 의사 결정**: 삭제, 저장, 제출 등 되돌릴 수 없는 작업 확인
 * - **필수 정보 입력**: 다음 단계로 진행하기 전 반드시 입력해야 하는 정보 수집
 * - **중요 알림**: 사용자가 반드시 확인해야 하는 에러, 경고, 성공 메시지
 * - **간단한 폼**: 페이지 전환 없이 빠르게 정보를 입력받아야 할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **긴급하지 않은 알림**: Toast 컴포넌트를 사용하세요
 * - **복잡한 다단계 폼**: 별도 페이지로 이동하세요
 * - **많은 정보 표시**: 페이지 내 섹션으로 구현하세요
 * - **비필수 부가 정보**: Popover나 Tooltip을 사용하세요
 *
 * ## Layout behavior
 *
 * 모달은 항상 화면 중앙에 고정되며, 배경 오버레이는 전체 화면을 덮습니다.
 * 크기는 `size` prop에 따라 결정됩니다:
 * - `sm`: 최대 너비 24rem (384px) - 간단한 확인 대화상자
 * - `md`: 최대 너비 28rem (448px) - 기본값, 일반적인 폼이나 메시지
 * - `lg`: 최대 너비 32rem (512px) - 많은 내용이나 복잡한 폼
 *
 * 모달의 높이는 콘텐츠에 따라 자동으로 조절되며, 화면을 넘어가면 스크롤이 발생합니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확한 제목 사용**: 모달의 목적을 한눈에 알 수 있는 제목을 제공하세요
 *   ```tsx
 *   <Modal title="항목 삭제">...</Modal>  // Good
 *   <Modal title="확인">...</Modal>        // Bad - 너무 모호함
 *   ```
 *
 * - **행동 지향적 버튼**: 버튼 레이블은 수행할 동작을 명확히 표현하세요
 *   ```tsx
 *   <Button>삭제하기</Button>  // Good
 *   <Button>확인</Button>      // Bad - 무엇을 확인하는지 불명확
 *   ```
 *
 * - **적절한 크기 선택**: 콘텐츠 양에 맞는 size를 선택하세요
 * - **명확한 닫기 방법**: X 버튼, 취소 버튼, 배경 클릭 중 최소 하나는 제공하세요
 * - **중요도에 따른 변형**: ConfirmModal, SuccessModal, ErrorModal 등 사용
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **모달 위에 모달을 띄우지 마세요** - UX가 복잡해지고 혼란스러워집니다
 * - **긴 스크롤이 필요한 콘텐츠는 피하세요** - 별도 페이지로 이동하는 것이 좋습니다
 * - **자동으로 모달을 열지 마세요** - 사용자의 명시적 동작(클릭 등) 후에만 열어야 합니다
 * - **모달 없이도 작업 가능한 경우** - 불필요하게 모달을 사용하지 마세요
 * - **모바일에서 큰 모달(lg) 사용 지양** - 화면을 거의 다 차지하므로 페이지 이동 권장
 *
 * ## Accessibility
 *
 * 이 컴포넌트는 WAI-ARIA Dialog 패턴을 따릅니다:
 *
 * - **키보드 내비게이션**:
 *   - `Esc`: 모달 닫기
 *   - `Tab`: 모달 내부 포커스 순환 (모달 외부로 나가지 않음)
 *   - 모달이 열리면 첫 번째 포커스 가능한 요소로 자동 포커스
 *
 * - **스크린 리더**:
 *   - `role="dialog"`: 대화상자임을 인식
 *   - `aria-labelledby`: title이 모달의 레이블로 연결됨
 *   - `aria-describedby`: children 콘텐츠가 설명으로 연결됨
 *
 * - **포커스 트랩**: 모달이 열려있는 동안 포커스가 모달 내부에서만 순환합니다
 * - **배경 스크롤 방지**: 모달이 열리면 body 스크롤이 자동으로 비활성화됩니다
 *
 * ## Example
 *
 * {@tool snippet}
 * 기본적인 확인 모달 예시:
 *
 * ```tsx
 * function DeleteConfirmDialog() {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <Button onClick={() => setOpen(true)}>삭제</Button>
 *       <Modal
 *         open={open}
 *         onOpenChange={setOpen}
 *         title="항목 삭제"
 *         footer={
 *           <div className="flex gap-2">
 *             <Button onClick={() => setOpen(false)} variant="outline">
 *               취소
 *             </Button>
 *             <Button onClick={handleDelete} variant="destructive">
 *               삭제하기
 *             </Button>
 *           </div>
 *         }
 *       >
 *         이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 성공 아이콘이 포함된 모달 예시:
 *
 * ```tsx
 * <Modal
 *   open={open}
 *   onOpenChange={setOpen}
 *   icon={<CheckCircle className="w-12 h-12 text-green-500" />}
 *   title="저장 완료"
 *   footer={
 *     <Button onClick={() => setOpen(false)} className="w-full">
 *       확인
 *     </Button>
 *   }
 * >
 *   데이터가 성공적으로 저장되었습니다.
 * </Modal>
 * ```
 * {@end-tool}
 *
 * {@tool snippet}
 * 큰 크기의 폼 모달 예시:
 *
 * ```tsx
 * <Modal
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="새 사용자 추가"
 *   size="lg"
 *   footer={
 *     <div className="flex justify-end gap-2">
 *       <Button variant="outline" onClick={() => setOpen(false)}>
 *         취소
 *       </Button>
 *       <Button onClick={handleSubmit}>저장</Button>
 *     </div>
 *   }
 * >
 *   <form className="space-y-4">
 *     <TextInput label="이름" required />
 *     <TextInput label="이메일" type="email" required />
 *     <TextInput label="전화번호" />
 *   </form>
 * </Modal>
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link ConfirmModal}, 간단한 확인 모달을 위한 사전 구성된 변형
 * - {@link SuccessModal}, 성공 메시지를 표시하는 모달
 * - {@link ErrorModal}, 에러 메시지를 표시하는 모달
 * - {@link WarningModal}, 경고 메시지를 표시하는 모달
 * - {@link DeleteModal}, 삭제 확인을 위한 모달
 * - {@link Toast}, 긴급하지 않은 알림을 위한 컴포넌트
 * - {@link Popover}, 비필수 부가 정보를 표시하는 컴포넌트
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Feedback/Modal/For%20Jsdoc.png?raw=true)
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onOpenChange,
      icon,
      title,
      children,
      footer,
      className,
      showCloseButton = true,
      size = "md",
    },
    ref,
  ) => {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              "fixed inset-0 z-150 bg-black/50",
              "data-[state=closed]:animate-out data-[state=open]:animate-in",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            )}
          />
          <DialogPrimitive.Content
            ref={ref}
            onOpenAutoFocus={(e) => e.preventDefault()}
            className={cn(
              "fixed top-[50%] left-[50%] z-150",
              "translate-x-[-50%] translate-y-[-50%]",
              "w-full",
              sizeClasses[size],
              "rounded-lg bg-white shadow-lg",
              "p-6",
              "data-[state=closed]:animate-out data-[state=open]:animate-in",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              className,
            )}
          >
            {showCloseButton && (
              <DialogPrimitive.Close asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-6 w-6", "absolute top-4 right-4")}
                >
                  <X />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogPrimitive.Close>
            )}

            {icon && <div className="mb-4 flex justify-center">{icon}</div>}

            {title && (
              <DialogPrimitive.Title
                className={cn(
                  "mb-2 text-lg font-bold text-cms-gray-900",
                  "flex items-center justify-center",
                )}
              >
                {title}
              </DialogPrimitive.Title>
            )}

            <DialogPrimitive.Description
              className={cn("text-sm", "text-cms-gray-700", "text-center")}
            >
              {children}
            </DialogPrimitive.Description>

            {footer && <div className="mt-6">{footer}</div>}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  },
);

Modal.displayName = "Modal";
