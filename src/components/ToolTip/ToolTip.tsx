"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils/cn";
import React from "react";

export interface ToolTipProps extends Omit<
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  "content"
> {
  /** 툴팁을 트리거하는 요소 */
  children: React.ReactNode;
  /** 툴팁에 표시할 내용 */
  content: React.ReactNode;
  /** 툴팁이 나타날 위치 (기본: "top") */
  side?: "top" | "right" | "bottom" | "left";
  /** 트리거로부터의 거리 (픽셀) (기본: 4) */
  sideOffset?: number;
  /** 트리거와의 정렬 방식 (기본: "center") */
  align?: "start" | "center" | "end";
  /** 마우스 호버 후 툴팁이 나타나기까지의 지연 시간 (밀리초) (기본: 200) */
  delayDuration?: number;
  /** 다른 툴팁에서 빠르게 진입 시 지연 건너뛰기 시간 (밀리초) (기본: 300) */
  skipDelayDuration?: number;
  /** 툴팁 위로 마우스를 이동할 수 있는지 여부 (기본: true) */
  disableHoverableContent?: boolean;
  /** 화살표 표시 여부 (기본: true) */
  showArrow?: boolean;
  /** Controlled 모드: 툴팁 열림 상태 */
  open?: boolean;
  /** Uncontrolled 모드: 초기 열림 상태 */
  defaultOpen?: boolean;
  /** 툴팁 열림 상태 변경 시 콜백 */
  onOpenChange?: (open: boolean) => void;
}

/**
 * 마우스 호버나 포커스 시 간단한 힌트나 설명을 제공하는 툴팁 컴포넌트입니다.
 *
 * {@link ToolTip}은 UI 요소에 대한 추가 정보를 간결하게 제공하여
 * 사용자가 인터페이스를 더 쉽게 이해할 수 있도록 돕습니다.
 *
 * Radix UI의 Tooltip 컴포넌트를 기반으로 구현되어 접근성 기능이
 * 자동으로 처리됩니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - **아이콘 설명**: 텍스트 레이블이 없는 아이콘 버튼의 기능을 설명할 때
 * - **축약된 텍스트**: 말줄임표(...)로 잘린 텍스트의 전체 내용을 보여줄 때
 * - **간단한 힌트**: 입력 필드나 기능에 대한 짧은 도움말을 제공할 때
 * - **추가 정보**: UI 요소의 상태나 제약사항을 간단히 알려줄 때
 *
 * **사용하지 말아야 하는 경우:**
 * - **필수 정보**: 사용자가 반드시 알아야 하는 정보는 본문에 직접 표시하세요.
 * - **복잡한 내용**: 여러 줄의 긴 텍스트나 인터랙티브 요소는 Popover나 Modal을 사용하세요.
 * - **모바일 전용 UI**: 터치 기기에서는 호버가 없으므로 중요한 정보를 툴팁에만 의존하지 마세요.
 *
 * ## Layout behavior
 *
 * - **Positioning**: 트리거 요소를 기준으로 상하좌우 원하는 위치에 배치됩니다. (기본: top)
 * - **Auto-adjustment**: 화면 경계를 벗어나지 않도록 자동으로 위치를 조정합니다.
 * - **Floating**: 다른 UI 요소들 위에 떠 있으며, 레이아웃에 영향을 주지 않습니다.
 * - **Arrow**: 트리거와의 연결을 시각적으로 나타내는 화살표를 선택적으로 표시할 수 있습니다.
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 *
 * - **간결한 텍스트**: 한두 줄 이내의 짧은 텍스트로 핵심만 전달하세요.
 * - **적절한 지연**: `delayDuration`을 조절하여 우발적인 호버로 인한 깜빡임을 방지하세요. (기본: 200ms)
 * - **명확한 트리거**: 툴팁이 붙는 요소가 호버 가능함을 사용자가 인지할 수 있도록 하세요.
 *
 * ### 🚫 Don't (주의/금지 사항)
 *
 * - **중요 정보 숨기기**: 필수적인 정보를 툴팁에만 넣지 마세요.
 * - **상호작용 요소**: 툴팁 내부에 클릭 가능한 버튼이나 링크를 넣지 마세요. (Popover 사용 권장)
 * - **과도한 사용**: 모든 요소에 툴팁을 붙이면 오히려 사용성이 떨어집니다.
 *
 * ## Accessibility
 *
 * - **Keyboard Support**: 포커스 가능한 요소에 툴팁이 붙으면 포커스 시 자동으로 표시됩니다.
 * - **ESC Key**: `Esc` 키를 누르면 툴팁이 닫힙니다.
 * - **Screen Readers**: `aria-describedby` 속성이 자동으로 부여되어 스크린 리더가 내용을 읽습니다.
 * - **Touch Devices**: 터치 기기에서는 탭으로 툴팁을 활성화할 수 있습니다.
 *
 * ## Example
 *
 * {@tool snippet}
 * 아이콘 버튼에 툴팁 추가:
 *
 * ```tsx
 * <ToolTip content="설정">
 *   <Button variant="ghost" size="icon">
 *     <SettingsIcon />
 *   </Button>
 * </ToolTip>
 * ```
 *
 * 위치와 지연 시간 커스터마이징:
 *
 * ```tsx
 * <ToolTip
 *   content="이 기능은 프리미엄 사용자만 이용할 수 있습니다"
 *   side="bottom"
 *   delayDuration={300}
 * >
 *   <Button disabled>프리미엄 기능</Button>
 * </ToolTip>
 * ```
 * {@end-tool}
 *
 * See also:
 *
 * - {@link Popover}, 클릭으로 열고 상호작용이 필요한 경우
 * - {@link Modal}, 중요한 정보나 복잡한 작업이 필요한 경우
 * ## 참고사진
 * ![](https://github.com/AlmSmartDoctor/ccds-screenshots/blob/main/screenshots/Feedback/ToolTip/All%20States.png?raw=true)
 */
export const ToolTip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  ToolTipProps
>(
  (
    {
      children,
      content,
      side = "top",
      sideOffset = 4,
      align = "center",
      delayDuration = 200,
      skipDelayDuration = 300,
      disableHoverableContent,
      showArrow = true,
      open,
      defaultOpen,
      onOpenChange,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <TooltipPrimitive.Provider
        delayDuration={delayDuration}
        skipDelayDuration={skipDelayDuration}
        disableHoverableContent={disableHoverableContent}
      >
        <TooltipPrimitive.Root
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          <TooltipPrimitive.Trigger asChild>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              ref={ref}
              side={side}
              sideOffset={sideOffset}
              align={align}
              className={cn(
                "z-50 px-3 py-1.5",
                "rounded-md",
                "bg-cms-black text-cms-white",
                "text-xs font-medium",
                "shadow-md",
                "max-w-xs",
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
            >
              {content}
              {showArrow && (
                <TooltipPrimitive.Arrow className="fill-cms-black" />
              )}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  },
);

ToolTip.displayName = "ToolTip";
