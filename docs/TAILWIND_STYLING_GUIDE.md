# TAILWIND_STYLING_GUIDE

## 1. 기본 원칙

- Tailwind 유틸리티 + 디자인 토큰(`cms-*`) 조합을 기본으로 사용
- 스타일 중복은 CVA variant로 흡수
- 컴포넌트별 시각 일관성을 우선

## 2. 토큰 사용 순서

1. `src/styles/globals.css`에 이미 있는 토큰 사용
2. 필요 시 토큰 추가 후 컴포넌트 반영
3. 임시 하드코딩 값은 최소화

## 3. 클래스 조합 패턴

```tsx
className={cn(
  "inline-flex items-center",
  "rounded-lg bg-cms-gray-850 text-cms-white",
  className,
)}
```

권장:
- 베이스 클래스
- 상태/variant 클래스
- 외부 `className` override

## 4. Variant 설계

- 변형 키는 의도가 드러나는 이름 사용(`size`, `variant`, `tone`)
- defaultVariants를 명시해 소비자 초기값 예측 가능하게 유지
- variant key 제거/이름 변경은 breaking candidate로 판단

## 5. 접근성 스타일

- focus-visible 스타일을 항상 제공합니다.
- disabled 상태는 시각 + 상호작용 차단을 함께 처리합니다.
- 색상 대비(텍스트/배경)가 충분한지 확인합니다.

## 6. 금지/지양 패턴

- 템플릿 문자열로 긴 `className` 조합
- 동일 의미 클래스 반복 복붙
- 이유 없는 `!important` 사용
