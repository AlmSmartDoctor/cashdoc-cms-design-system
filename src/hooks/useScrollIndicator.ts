import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type UseScrollIndicatorReturn<T extends HTMLElement> = {
  ref: (node: T | null) => void;
  nodeRef: RefObject<T | null>;
  showStart: boolean;
  showEnd: boolean;
  refresh: () => void;
};

/**
 * 스크롤 컨테이너의 가장자리에 추가 콘텐츠가 있는지 추적합니다.
 *
 * - `axis: "x"` → `showStart`=왼쪽, `showEnd`=오른쪽
 * - `axis: "y"` → `showStart`=위쪽, `showEnd`=아래쪽
 *
 * 조건부 렌더링되는 대상에도 사용하도록 callback ref를 반환합니다.
 * 외부에서 node에 직접 접근해야 한다면 `nodeRef.current`를 참조하세요.
 */
export function useScrollIndicator<T extends HTMLElement = HTMLElement>(
  axis: "x" | "y",
): UseScrollIndicatorReturn<T> {
  const nodeRef = useRef<T | null>(null);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const update = useCallback(() => {
    const el = nodeRef.current;
    if (!el) {
      setShowStart(false);
      setShowEnd(false);
      return;
    }
    if (axis === "x") {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowStart(scrollLeft > 0);
      setShowEnd(scrollLeft < scrollWidth - clientWidth - 1);
    } else {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setShowStart(scrollTop > 0);
      setShowEnd(scrollTop < scrollHeight - clientHeight - 1);
    }
  }, [axis]);

  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      const prev = nodeRef.current;
      if (prev) {
        prev.removeEventListener("scroll", update);
      }
      observerRef.current?.disconnect();
      observerRef.current = null;

      nodeRef.current = node;
      if (node) {
        node.addEventListener("scroll", update, { passive: true });
        if (typeof ResizeObserver !== "undefined") {
          const observer = new ResizeObserver(update);
          observer.observe(node);
          observerRef.current = observer;
        }
        update();
      } else {
        setShowStart(false);
        setShowEnd(false);
      }
    },
    [update],
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  return { ref, nodeRef, showStart, showEnd, refresh: update };
}
