# TESTING

## 1. 테스트 스택

- Playwright (`e2e/*.spec.ts`)
- Storybook 서버를 테스트 대상 UI로 사용 (`http://localhost:6006`)

## 2. 실행 명령

```bash
pnpm test:e2e
pnpm test:e2e:ui
pnpm test:e2e:debug
```

단일 스펙 실행 예시:

```bash
pnpm exec playwright test e2e/button.spec.ts
```

## 3. 테스트 작성 원칙

- Storybook `iframe` 경로를 기준으로 진입합니다.
  - 예: `/iframe.html?id=forms-button--default`
- story id를 변경하면 해당 id를 참조하는 `e2e/*.spec.ts`를 함께 수정합니다.
- 선택자는 role/label 우선으로 작성합니다.
- 사용자 행위(클릭/입력/선택) 이후 기대 결과를 반드시 검증합니다.

## 4. 회귀 테스트 기준

아래 변경에는 테스트 추가/수정이 필요합니다.
- props 동작 변경
- variant 상태 변경
- 접근성 속성 변경
- 날짜/시간 입력 등 상호작용 복잡 컴포넌트 변경

## 5. 안정성 가이드

- 뷰포트 의존 UI는 `test.use({ viewport })`로 고정
- flaky selector 대신 semantic locator 사용
- 시간/날짜 의존 검증은 형식 기준으로 완화

## 6. CI 연계

CI는 아래를 기본 실행합니다.
- `pnpm lint`
- `pnpm type-check`
- `pnpm test:e2e`
- `pnpm build` + `pnpm build-storybook`
