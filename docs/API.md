# API

## 1. Public API 경계

라이브러리 소비자가 접근하는 API는 아래 경로로 제한합니다.

- `@cashdoc/cashdoc-cms-design-system`
- `@cashdoc/cashdoc-cms-design-system/dist/style.css`
- 내부 경로(`src/components/...`) deep import는 지원하지 않습니다.

코드 기준 경계:
- `src/index.ts`
- `src/components/index.ts`

## 2. Props 설계 원칙

- 기본 HTML 속성 타입을 확장합니다.
  - 예: `ButtonHTMLAttributes<HTMLButtonElement>`
- 시각 변형은 CVA + `VariantProps<typeof variants>`로 관리합니다.
- `any`는 사용하지 않습니다.

## 3. Event 시그니처 원칙

- 이벤트 payload는 명시적 타입으로 선언합니다.
- 기존 이벤트 시그니처 변경은 breaking candidate로 간주합니다.
- 콜백 이름은 의미 기반(`onChange`, `onOpenChange`)으로 유지합니다.

## 4. Controlled / Uncontrolled

둘 다 제공할 경우 동작 우선순위를 문서화합니다.

- controlled props가 있으면 외부 상태를 source of truth로 사용
- uncontrolled 기본값은 `default*` 규칙으로 분리

## 5. API 변경 분류

- Major: 기존 props 제거/타입 호환성 파괴
- Minor: 하위 호환 유지 + 신규 옵션 추가
- Patch: 버그 수정/내부 구현 개선

PR에서 API 변경이 있으면 아래를 동기화합니다.
- 컴포넌트 JSDoc
- `.stories.tsx` 예시
- 필요 시 `README.md`

## 6. Deprecation 규칙

폐기 예정 API는 즉시 삭제하지 않습니다.

- JSDoc에 `@deprecated` 명시
- 대체 API를 함께 안내
- 제거 목표 버전(다음 major)을 명시
