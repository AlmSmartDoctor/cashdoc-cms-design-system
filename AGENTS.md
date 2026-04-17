# Cashdoc CMS Design System — 프로젝트 하네스 (진입점)

> **이 파일은 목차입니다.** 상세 내용은 `docs/` 하위 문서를 참조하세요.
> 에이전트는 이 파일을 먼저 읽고, 필요한 docs 문서를 선택적으로 로드합니다.

---

## 하네스 라우터

의도에 따라 아래 파이프라인 중 하나를 실행합니다.

| 커맨드                  | 설명                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| `/ccds-feature {요청}`  | 신규 컴포넌트/기능 개발 — `Component → Story → Export` 흐름 준수                                |
| `/ccds-style {요청}`    | 디자인 토큰, Tailwind 클래스, variant 규칙 개선                                               |
| `/ccds-refactor {요청}` | 동작 변화 없는 구조 개선, 성능 최적화, 중복 제거                                              |
| `/ccds-test {요청}`     | Storybook 기반 Playwright E2E/회귀 테스트 작성·보강                                           |
| `/ccds-review {요청}`   | 컴포넌트/스타일/API 변경 리뷰 (Caveman 포맷 가능) + `vercel-react-best-practices` 병행 사용 |

---

## 하네스 사용 기준

### `/ccds-feature`

- 사용: 신규 컴포넌트 추가, 기존 컴포넌트 API 확장, 신규 variant/state 도입
- 사용 안 함: 동작 변화 없는 파일 이동/정리, 단순 네이밍 변경
- 기본 목표: 사용자(소비 앱)가 바로 사용할 수 있는 public API까지 완성

### `/ccds-style`

- 사용: 디자인 토큰 추가/수정, Tailwind 클래스 정리, CVA variant 재정의
- 사용 안 함: 컴포넌트 로직 변경, 이벤트/상태 처리 변경
- 기본 목표: 스타일 일관성, 접근성, 재사용성 유지

### `/ccds-refactor`

- 사용: 동작 변화 없는 구조 개선, 렌더링 비용 절감, 중복 제거
- 사용 안 함: 신규 요구사항 구현, 시각적 스펙 변경
- 기본 목표: 소비자 영향 없이 내부 품질을 개선

### `/ccds-test`

- 사용: 컴포넌트 변경 직후 회귀 테스트 보강, 버그 재현용 regression test 추가
- 사용 안 함: 신규 컴포넌트 구현 자체, 테스트와 무관한 리팩터링
- 기본 목표: 변경된 컴포넌트의 핵심 상호작용을 Storybook 시나리오로 검증
- `test-automation-coach` skill이 설치되어 있으면 함께 사용

### `/ccds-review`

- 사용: PR 변경사항 코드 리뷰, 잠재 회귀/성능/접근성 리스크 점검
- 사용 안 함: 구현 자체, 광범위한 리라이트
- 기본 목표: Findings 중심으로 merge risk를 판단
- 기본 출력 순서: `Findings → Open Questions → Change Summary`
- Findings가 없으면 `No findings`를 명시

---

## 하네스별 기본 로드 문서

| 하네스           | 기본 로드 문서                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `/ccds-feature`  | `docs/ARCHITECTURE.md`, `docs/CONVENTIONS.md`, `docs/DEVELOPMENT.md`, `docs/API.md`      |
| `/ccds-style`    | `docs/CONVENTIONS.md`, `docs/TAILWIND_STYLING_GUIDE.md`, `docs/DEVELOPMENT.md`           |
| `/ccds-refactor` | `docs/ARCHITECTURE.md`, `docs/CONVENTIONS.md`, `docs/TECH_DEBT.md`                        |
| `/ccds-test`     | `docs/TESTING.md`, `docs/CONVENTIONS.md`, `docs/DEVELOPMENT.md`                           |
| `/ccds-review`   | `docs/ARCHITECTURE.md`, `docs/CONVENTIONS.md`, `docs/WORKFLOWS.md`, `docs/TECH_DEBT.md` |

상황에 따라 `docs/BRANCH_RELEASE_POLICY.md`를 추가 로드합니다.

---

## 하네스별 완료 기준

### `/ccds-feature`

- 컴포넌트 구현, 스토리, export(`index.ts`) 반영이 함께 완료되어야 합니다.
- public props 타입이 명확하고 `any`가 없어야 합니다.
- JSDoc 및 `ForJsdoc` 스토리를 최신 동작 기준으로 동기화합니다.
- 최소 `pnpm lint`, `pnpm type-check`, `pnpm build` 기준으로 검증합니다.

### `/ccds-style`

- 토큰(`cms-*`) 우선 원칙을 준수하고 하드코딩 색상 사용을 최소화합니다.
- variant 변경이 있으면 관련 스토리와 문서를 함께 갱신합니다.
- visual 회귀 가능성이 크면 스크린샷 또는 스토리 기준 검증 근거를 남깁니다.
- 최소 `pnpm lint`, `pnpm type-check` 기준으로 검증합니다.

### `/ccds-refactor`

- 사용자 관점의 동작/API 변화가 없어야 합니다.
- 불가피한 API 변화가 있으면 breaking 여부를 먼저 명시합니다.
- 제거한 중복과 기대되는 유지보수/성능 이점을 설명할 수 있어야 합니다.
- 최소 `pnpm lint`, `pnpm type-check`, 필요 시 `pnpm test:e2e`로 검증합니다.

### `/ccds-test`

- 변경된 동작을 직접 검증하는 Playwright 테스트를 추가/수정해야 합니다.
- 대상 스토리 id와 기대 동작이 테스트 코드에서 읽히게 작성합니다.
- flaky 가능성이 있는 선택자는 role/label 기반으로 안정화합니다.
- 최소 변경 범위 테스트 명령과 `pnpm type-check` 기준으로 검증합니다.

### `/ccds-review`

- Findings를 먼저 제시하고 심각도 순(`P1/P2/P3`)으로 정렬합니다.
- 각 Findings에 파일/라인 근거와 사용자 영향(회귀/접근성/API 영향)을 포함합니다.
- 취향 차이는 Findings로 올리지 않습니다.
- 현재 PR 밖에서 다룰 항목은 기술 부채 후보로 분리합니다.

---

## `/ccds-review` 출력 예시

```md
**Findings**

- [P1] `onChange` 시그니처 불일치로 소비 앱 타입 에러 발생 — `src/components/Dropdown/Select.tsx:58`
  기존에는 `string`을 반환했는데 이번 변경에서 `Option | null`로 바뀌었습니다.
  소비 앱의 핸들러 타입이 깨져 빌드가 실패할 수 있습니다.

- [P2] `aria-invalid` 누락으로 에러 상태 스크린리더 전달 실패 — `src/components/TextInput/TextInput.tsx:112`
  에러 문구는 노출되지만 입력 요소 자체가 invalid 상태를 전달하지 않습니다.
  폼 오류 탐색 시 접근성 품질이 떨어집니다.

**Open Questions**

- 이번 PR에서 `Select` API 변경을 major로 반영할지 확인이 필요합니다.

**Change Summary**

- API 호환성(P1)과 접근성(P2) 리스크가 있습니다.
- merge 전 P1 수정 권장, P2는 같은 PR에서 보완이 안전합니다.
```

리뷰 결과가 없으면 아래처럼 명시합니다.

```md
**Findings**

- No findings.

**Residual Risks**

- E2E가 스토리 경로 일부만 커버하므로 시각적 회귀 위험은 남아 있을 수 있습니다.
```

---

## 아키텍처 불변량 (위반 금지)

1. public 컴포넌트는 기본적으로 `forwardRef`를 사용합니다.
2. TypeScript `any` 사용 금지. 불가피하면 사유 주석 필수.
3. 컴포넌트는 `Component.tsx / Component.stories.tsx / index.ts` 구조를 유지합니다.
4. `className` 조합은 `cn(...)`을 우선 사용합니다.
5. 스타일은 `cms-*` 토큰/Tailwind 유틸리티를 우선 사용합니다.
6. public API 변경 시 Storybook + JSDoc을 같은 변경에 동기화합니다.
7. export 변경 시 `src/components/index.ts`와 관련 폴더 export를 함께 맞춥니다.
8. `.env` 파일은 절대 커밋하지 않습니다.
9. 코드 한 줄 80자 원칙을 지킵니다. (문서 파일 제외)

---

## 피드백 루프 (모든 코드 생성에 적용)

### Phase 1 — Generator

아키텍처 불변량과 해당 docs 문서를 기준으로 초안을 작성합니다.

### Phase 2 — Evaluator `<scratchpad>`

출력 전 아래 항목을 자가 점검하고, 실패 시 Phase 1으로 돌아갑니다.

- [ ] public API 타입이 명확하고 `any`가 없는가?
- [ ] `forwardRef`/`cn`/variant 규칙을 지켰는가?
- [ ] 컴포넌트·스토리·export가 함께 갱신되었는가?
- [ ] 접근성 속성(role/label/aria) 회귀가 없는가?
- [ ] API 또는 동작 변경 시 테스트를 추가/보강했는가?
- [ ] 최소 검증 명령 또는 실행 불가 사유를 남겼는가?
- [ ] 불필요한 서론·결론 멘트를 제거했는가?

### Phase 3 — Output

평가기를 통과한 결과물만 출력합니다.

---

## 상세 문서 인덱스

| 문서                                                               | 로드 조건                                                       |
| ------------------------------------------------------------------ | --------------------------------------------------------------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)                       | 엔트리포인트, 컴포넌트 계층, export 경계 파악 시               |
| [docs/API.md](docs/API.md)                                         | props/event/public API 설계 또는 breaking change 판단 시       |
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)                         | 로컬 실행, 빌드, 컴포넌트 추가 절차 확인 시                    |
| [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md)                     | JSDoc/Storybook/README 문서 동기화 규칙 확인 시                |
| [docs/CONVENTIONS.md](docs/CONVENTIONS.md)                         | 네이밍, 파일 구조, JSDoc/Storybook 동기화 규칙 확인 시         |
| [docs/TAILWIND_STYLING_GUIDE.md](docs/TAILWIND_STYLING_GUIDE.md)   | 토큰, Tailwind, CVA variant 스타일 작업 시                     |
| [docs/TESTING.md](docs/TESTING.md)                                 | Storybook 기반 Playwright 테스트 작성/수정 시                  |
| [docs/BRANCH_RELEASE_POLICY.md](docs/BRANCH_RELEASE_POLICY.md)     | 브랜치 정책, PR 타이틀 토큰, 버전 릴리즈 판단 시               |
| [docs/WORKFLOWS.md](docs/WORKFLOWS.md)                             | PR 작성, 리뷰, 병합 전 체크 순서 확인 시                       |
| [docs/TECH_DEBT.md](docs/TECH_DEBT.md)                             | 즉시 수정하지 않을 구조적 문제를 기록/우선순위화할 때          |
