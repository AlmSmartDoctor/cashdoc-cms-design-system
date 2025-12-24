import type { SVGProps } from 'react';

/**
 * 오른쪽을 가리키는 쉐브론(V자형) 아이콘 컴포넌트입니다.
 *
 * 주로 내비게이션, 아코디언 확장, 또는 리스트 아이템의 상세 페이지 이동을 시각적으로 나타낼 때 사용됩니다.
 *
 * ## Usage
 *
 * ```tsx
 * <ChevronRightIcon className="w-4 h-4 text-gray-500" />
 * ```
 */
export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M7 5L12 10L7 15"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
