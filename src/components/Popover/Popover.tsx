"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/utils/cn";
import { forwardRef } from "react";

/**
 * 특정 요소 근처에 부가적인 정보나 컨트롤을 표시하는 플로팅 컴포넌트입니다.
 *
 * {@link Popover}는 사용자가 버튼이나 아이콘을 클릭했을 때 나타나며,
 * 기존 화면의 맥락을 유지하면서 추가적인 작업(메뉴 선택, 상세 정보 확인 등)을 수행할 수 있게 합니다.
 *
 * Radix UI의 Popover 컴포넌트를 기반으로 구현되어 포커스 트랩, 키보드 내비게이션 등이
 * 자동으로 처리됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **맥락 기반 메뉴**: '더 보기' 버튼 클릭 시 나타나는 관리 기능(수정, 삭제 등)
 * - **상세 정보 표시**: 아이콘 클릭 시 해당 항목에 대한 간단한 설명이나 데이터를 보여줄 때
 * - **간단한 설정**: 필터 옵션이나 정렬 기준을 선택할 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **중요한 의사 결정**: 사용자의 주의를 완전히 집중시켜야 하는 작업은 `Modal`을 사용하세요.
 * - **단순 힌트**: 마우스 호버 시에만 짧게 보여주는 정보는 Tooltip을 사용하세요.
 * - **입력 폼**: 복잡한 입력이 필요한 경우 모달이나 별도 페이지가 더 적합할 수 있습니다.
 *
 * ## Layout behavior
 *
 * - **Anchor Positioning**: 트리거(버튼 등)를 기준으로 상하좌우 적절한 위치에 자동으로 배치됩니다.
 * - **Overlay**: 다른 UI 요소들 위에 겹쳐서 나타나며, 배경(Overlay)을 생성하지 않아 뒤쪽 화면을 볼 수 있습니다.
 * - **Size**: 콘텐츠의 양에 따라 크기가 결정되지만, `min-w-[200px]`의 최소 너비를 가집니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **명확한 트리거**: 사용자가 무엇을 클릭하면 팝오버가 열릴지 명확히 인지할 수 있는 버튼이나 아이콘을 사용하세요.
 * - **적절한 배치**: `align` 속성을 조절하여 팝오버가 화면 밖으로 나가지 않도록 관리하세요. (기본값: 'end')
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **너무 많은 정보**: 팝오버는 빠르고 간단한 상호작용을 위한 것입니다. 너무 많은 내용을 담지 마세요.
 * - **비정상적인 닫기**: 팝오버 외부를 클릭하거나 `Esc`를 누르면 자연스럽게 닫히도록 기본 동작을 유지하세요.
 *
 * ## Accessibility
 *
 * - **Keyboard Interaction**: `Space`나 `Enter`로 열고, `Esc`로 닫으며, 팝오버 내부에서 `Tab` 키로 내비게이션이 가능합니다.
 * - **Aria Attributes**: `aria-expanded`, `aria-controls` 등의 속성이 자동으로 부여됩니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 버튼 클릭 시 상세 정보를 보여주는 팝오버:
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="ghost">상세 정보</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <div className="p-4">
 *       <h4 className="font-bold">계정 상태</h4>
 *       <p className="text-sm">현재 활성화된 계정입니다.</p>
 *     </div>
 *   </PopoverContent>
 * </Popover>
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Modal}, 더 중요하거나 복잡한 상호작용이 필요한 경우
 * - {@link Dropdown}, 정해진 리스트에서 값을 선택하는 것이 주 목적인 경우
 * - {@link PopoverMenuItem}, 팝오버 내부의 메뉴 항목을 구성할 때
 *
 * ## 참고사진
 * ![](https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/Feedback/Popover/For%20Jsdoc.png?raw=true)
 */
const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "end", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-50 p-2",
        "rounded-md border border-cms-gray-200",
        "bg-cms-white shadow-lg",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0",
        "data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
