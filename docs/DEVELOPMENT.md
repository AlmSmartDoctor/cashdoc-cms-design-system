# DEVELOPMENT

## 1. 요구사항

- Node.js >= 22
- pnpm >= 10

## 2. 기본 명령어

```bash
pnpm install
pnpm dev
pnpm storybook
pnpm lint
pnpm type-check
pnpm build
pnpm test:e2e
```

## 3. 신규 컴포넌트 개발 흐름

1. `src/components/<ComponentName>/` 디렉터리 생성
2. `<ComponentName>.tsx` 구현 (`forwardRef`, typed props)
3. 필요 시 `variants.ts` 추가 (CVA)
4. `<ComponentName>.stories.tsx` 작성 (`ForJsdoc` 포함)
5. `index.ts` export 추가
6. `src/components/index.ts`에 재-export 추가
7. JSDoc 업데이트
8. 린트/타입/빌드 검증

## 4. 스타일 작업 흐름

1. `src/styles/globals.css`의 `cms-*` 토큰 우선 확인
2. 컴포넌트 클래스는 `cn(...)`으로 구성
3. 공통 variant는 `variants.ts`로 분리
4. 스토리에서 상태/variant 회귀 확인

## 5. 문서화 작업 흐름

상세 규칙은 `docs/DOCUMENTATION.md`를 참고합니다.

1. 컴포넌트 JSDoc을 최신 props/동작 기준으로 갱신
2. `<ComponentName>.stories.tsx`의 `ForJsdoc` 스토리 동기화
3. public API 변화가 있으면 `README.md` 사용 예시 반영
4. 스크린샷 기준이 바뀌면 `pnpm screenshot`으로 캡처 갱신

## 6. 검증 기준

최소 검증:

```bash
pnpm lint
pnpm type-check
pnpm build
```

상호작용 변경 포함 시 추가:

```bash
pnpm test:e2e
```

문서화 변경 포함 시 추가:

```bash
pnpm storybook
pnpm screenshot
```

## 7. 트러블슈팅

- Storybook 포트 충돌: `6006` 점유 프로세스 확인
- 타입 export 누락: 컴포넌트 `index.ts` + 루트 export 동시 확인
- Tailwind class 경고: 토큰 존재 여부와 오탈자 우선 확인
- JSDoc/Story 불일치: `ForJsdoc` 스토리와 props 설명 동시 점검
- 문서 스크린샷 누락: `__screenshots__` 생성 여부와 워크플로우 로그 확인
