import { createContext, useContext } from "react";

/**
 * 오버레이(Modal/Dialog)가 자신의 콘텐츠 DOM 노드를 자식 Popover 계열
 * 컴포넌트에 전달하기 위한 컨텍스트입니다.
 *
 * Radix Dialog는 `modal=true`일 때 `body`에 `pointer-events: none`을
 * 적용합니다. 그 결과 `body`로 portal되는 Popover content는 클릭이
 * 막힙니다(시/분 선택 무반응 등). Modal이 자신의 Content 노드를 이
 * 컨텍스트로 제공하면, 내부 Popover가 그 노드로 portal되어
 * `pointer-events` 영향을 받지 않습니다.
 *
 * 값이 `null`이면(= Modal 밖) Popover는 Radix 기본값(`body`)으로
 * portal됩니다. 따라서 단독 사용 시 동작 회귀가 없습니다.
 */
export const PortalContainerContext = createContext<HTMLElement | null>(null);

/**
 * Popover 계열 컴포넌트의 portal container를 결정합니다.
 *
 * 우선순위: 명시적 `container` prop → 상위 Modal 컨텍스트 → `undefined`.
 *
 * @param explicit 소비자가 직접 지정한 container. 있으면 최우선입니다.
 * @returns portal 대상 DOM 노드. 없으면 `undefined`(Radix 기본 = body).
 */
export function usePortalContainer(
  explicit?: HTMLElement | null,
): HTMLElement | undefined {
  const fromContext = useContext(PortalContainerContext);
  return explicit ?? fromContext ?? undefined;
}
