# CONVENTIONS

## 1. 타입/코드 규칙

- TypeScript strict 기준 유지
- `any` 사용 지양
- 의미 없는 축약 네이밍 금지
- 불필요한 `useEffect`/중복 상태 지양

## 2. 파일/네이밍 규칙

- 컴포넌트 디렉터리: PascalCase
- 컴포넌트 파일: `<ComponentName>.tsx`
- 스토리 파일: `<ComponentName>.stories.tsx`
- export 파일: `index.ts`

## 3. 스타일 규칙

- `className` 조합은 `cn(...)` 사용
- Tailwind 클래스는 의미 단위로 줄바꿈
- 하드코딩 색상보다 `cms-*` 토큰 우선

## 4. 문서화 규칙

- 컴포넌트 변경 시 JSDoc 동기화
- Storybook `ForJsdoc` 스토리 유지
- 스토리 예시는 실제 사용 패턴과 일치해야 함

## 5. import/export 규칙

- 경로 alias: `@/*` → `src/*`
- public export는 배럴(`index.ts`) 기반으로만 노출
- deep import 경로를 소비자에게 강제하지 않음

## 6. 포맷/라인 길이

- Prettier `printWidth: 80` 기준 준수
- 긴 클래스 문자열은 `cn` 인자 단위로 분리
- 문서 파일은 가독성을 우선하되 코드 예시는 80자 기준 준수
