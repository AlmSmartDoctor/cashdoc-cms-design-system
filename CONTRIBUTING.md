# CCDS 컨트리뷰션 가이드

이 문서는 CCDS(SmartDoctor Design System)의 일관성을 유지하고,
협업 효율을 높이기 위한 팀 표준입니다.

## 1. 핵심 원칙

- **Type-Safe First**: TypeScript `strict` 기준을 기본으로 하고 `any`는 지양합니다.
- **Pragmatic Performance**: 불필요한 렌더링과 effect 기반 state 동기화를 피합니다.
- **Design System Consistency**: Tailwind + `cn` 컨벤션을 우선합니다.
- **A11y by Default**: 키보드 접근성과 스크린 리더 속성을 기본 요건으로 봅니다.

## 2. 코드 스타일 및 린트

### 필수 체크

아래 명령은 PR 전에 반드시 통과해야 합니다.

```bash
pnpm lint
pnpm type-check
```

### Tailwind와 `cn`

- `className` 조합은 `cn(...)` 사용을 기본으로 합니다.
- 긴 클래스 문자열은 `cn` 인자 단위로 줄바꿈합니다.
- 템플릿 리터럴 기반 `className` 작성은 지양합니다.

예시:

```tsx
className={cn(
  "w-fit rounded-md bg-cms-gray-800 px-4 py-2 text-sm text-white",
  "hover:bg-cms-gray-700",
)}
```

### 80자(max-len) 규칙

기본적으로 코드 라인은 80자 제한을 따릅니다.
현재 ESLint 설정상 아래는 예외로 처리됩니다.

- `import` 라인
- 주석 라인
- 단순 문자열/숫자/불리언 리터럴 할당 라인
- 단순 object property 리터럴 라인

즉, 문서용 긴 설명 문자열은 대부분 예외지만,
`cn`/JSX 표현식/로직 라인은 80자 제한을 지키는 것이 원칙입니다.

### 알 수 없는 Tailwind 클래스 경고

`better-tailwindcss/no-unknown-classes` 경고가 발생하면:

1. 실제 Tailwind/디자인 토큰에 존재하는 클래스인지 먼저 확인합니다.
2. 프로젝트 커스텀 클래스면 `src/styles/globals.css` 기준과 일치시킵니다.
3. 반복적으로 쓰는 패턴은 ESLint ignore 패턴에 합당한 범위로 반영합니다.

## 3. JSDoc 표준 (IDE 내 문서화)

컴포넌트 JSDoc에는 아래 항목을 포함합니다.

- 컴포넌트 개요: 역할/핵심 가치
- `When`: 사용해야 하는 경우 / 사용하지 말아야 하는 경우
- `Layout behavior`: 레이아웃/동작 특성
- `Usage guidelines`: Do / Don't
- `Accessibility`: 키보드/ARIA 정보
- `Example`: `{@tool snippet}` 기반 대표 예시
- 참고 사진 링크

참고 사진 경로 규칙:

```text
https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/[Category]/[ComponentName]/For%20Jsdoc.png?raw=true
```

(스크린샷은 git action에서 자동으로 캡쳐해서 올려줍니다.)

컴포넌트 동작/모양/props가 바뀌면 JSDoc도 같은 PR에서 함께 갱신합니다.

## 4. Storybook 표준 (인터랙티브 문서)

- 새 컴포넌트에는 `.stories.tsx`를 반드시 추가합니다.
- `ForJsdoc` 스토리를 반드시 포함합니다.
- `ForJsdoc`에서는 주요 Variant(Size/Color/State 등)를 한 화면에 모아
  스크린샷 캡처와 디자인 점검이 가능해야 합니다.
- Props/인터랙션 변경 시 스토리 문서도 함께 갱신합니다.

### Stories와 JSDoc이 모두 필요한 이유

Storybook과 JSDoc은 대체 관계가 아니라 역할 분담 관계입니다.

| 구분 | Storybook (Stories) | JSDoc (In-Code) |
| --- | --- | --- |
| 주요 목적 | 실제 동작 확인, 인터랙션 검증, 온보딩 | IDE 내 즉시 가이드, 오용 방지 |
| 장점 | props를 바꿔가며 테스트 가능 | 코드 작성 중 즉시 확인 가능 |
| 운영 원칙 | 동작/상태를 넓게 보여준다 | 의도/제약/사용 기준을 명확히 남긴다 |

## 5. PR 리뷰 방법

`PR 리뷰 방법`은 `.github/pull_request_template.md` 항목을 기준으로 진행합니다.

### PR 작성자 체크리스트

1. **요약**
   - 변경 목적과 핵심 내용을 작성합니다.
2. **변경 유형**
   - `Major` / `Minor` / `Patch` / `Chore` 중 해당 항목을 체크합니다.
3. **영향 범위**
   - `Component API`
   - `Styling/Tokens`
   - `Storybook Stories`
   - `JSDoc/TSDoc`
   - `Build/Lint/Tooling`
4. **호환성 깨짐 변경 사항**
   - 하위 호환성이 깨지는 경우 변경 내용과 마이그레이션 방법을 작성합니다.
5. **사용 중단(Deprecation)**
   - `@deprecated` 추가 여부
   - "다음 Major에서 제거 예정" 문구 추가 여부
   - 대체 컴포넌트/사용법 명시 여부
6. **Storybook & JSDoc 동기화**
   - `ForJsdoc` 스토리 추가/갱신 여부
   - 주요 Variant(Size/Color/State) 확인 가능 여부
   - JSDoc 반영 여부
   - 스크린샷 링크/캡처 갱신 여부(해당 시)
7. **스크린샷 (선택)**
   - UI 변경 시 전/후 또는 핵심 화면을 첨부합니다.
8. **리뷰어 참고사항**
   - 설계 의도, 특히 확인이 필요한 부분, known issue/후속 작업을 작성합니다.

### 리뷰어 체크리스트

- PR 템플릿 항목(요약/변경 유형/영향 범위)이 누락되지 않았다.
- 체크된 변경 유형(`Major`/`Minor`/`Patch`/`Chore`)이 실제 변경과 일치한다.
- 체크된 영향 범위가 실제 diff와 일치한다.
- Breaking change가 있으면 변경 내용/마이그레이션이 작성되어 있다.
- Deprecation 관련 항목(`@deprecated`, 제거 예정 문구, 대체안)이 반영되어 있다.
- Storybook & JSDoc 동기화(ForJsdoc, Variant, 문서, 스크린샷)가 확인된다.
- 미해결 토론이 없고 재리뷰가 완료됐다.

## 6. 버전 관리 및 커밋

변경 영향도는 Semantic Versioning 기준으로 판단합니다.

- Major: 하위 호환성 깨짐 (예: 기존 props 제거, 구조 변경)
- Minor: 하위 호환 유지 + 기능 추가
- Patch: 버그 수정, 내부 개선
- Chore: 배포 영향 없는 정리/오타/설정/의존성 관리

### 자동 릴리즈 규칙(현재 저장소 기준)

- `main` push 시 기본 릴리즈 타입은 `patch`
- 커밋 메시지 토큰으로 타입 지정 가능: `[major]`, `[minor]`, `[patch]`
- 커밋 메시지에 `chore` 또는 `doc` 포함 시 자동 배포 스킵

## 7. 컴포넌트 생명주기

사용 중단 컴포넌트는 즉시 삭제하지 않고 deprecation 단계를 거칩니다.

- JSDoc에 `@deprecated`를 명시합니다.
- 아래 메시지를 포함합니다.

```text
이 컴포넌트는 다음 Major 업데이트 때 제거될 예정입니다.
대신 [대체 컴포넌트]를 사용하세요.
```

- Deprecated 컴포넌트 정리는 다음 Major 릴리즈에서 일괄 제거합니다.

## 8. 빠른 체크리스트 (신규 컴포넌트)

1. `src/components`에 컴포넌트 구현 (`cn` 컨벤션 준수)
2. `.stories.tsx` 작성 + `ForJsdoc` 포함
3. JSDoc 표준 섹션 및 스크린샷 링크 작성
4. `pnpm lint`, `pnpm type-check` 통과 확인
5. 영향도에 맞는 버전 의도로 커밋/PR 작성

## 9. JSDoc 템플릿 스니펫

````ts
/**
 * [컴포넌트 이름]: 한 줄 요약
 *
 * {@link [연관_컴포넌트]}와 함께 사용하거나 비교할 수 있습니다.
 *
 * ## When (언제 사용해야 하는가)
 *
 * **사용해야 하는 경우:**
 * - [조건 1]
 * - [조건 2]
 *
 * **사용하지 말아야 하는 경우:**
 * - [조건 1]
 * - [조건 2]
 *
 * ## Layout behavior
 * - [동작 방식 1]
 * - [동작 방식 2]
 *
 * ## Usage guidelines
 *
 * ### ✅ Do (권장 사항)
 * - [권장 1]
 *
 * ### 🚫 Don't (주의/금지 사항)
 * - [주의 1]
 *
 * ## Accessibility
 * - **Keyboard**: [키보드 대응]
 * - **Aria**: [적용 속성]
 *
 * ## Example
 * {@tool snippet}
 * ```tsx
 * <ComponentName />
 * ```
 * {@end-tool}
 *
 * See also:
 * - {@link [관련_컴포넌트_1]}
 *
 * ## 참고사진
 * ![](
 * <https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/[Category]/[ComponentName]/For%20Jsdoc.png?raw=true>
 * )
 */
````

## 10. 생산성 팁: VS Code 스니펫

매번 JSDoc 템플릿을 복사하는 대신,
VS Code `User Snippets`에 등록해 사용하면 편리합니다.

### 등록 방법

1. VS Code에서 `Cmd + Shift + P`(Mac) 또는
   `Ctrl + Shift + P`(Windows)를 누릅니다.
2. `Snippets: Configure Snippets`를 선택합니다.
   (환경에 따라 `Configure User Snippets`로 표시될 수 있습니다.)
3. `typescriptreact`를 선택합니다.
4. 아래 JSON을 붙여넣고 저장합니다.

```json
{
  "CCDS JSDoc Template": {
    "prefix": "ccdoc",
    "body": [
      "/**",
      " * ${1:컴포넌트 설명}",
      " *",
      " * ## When (언제 사용해야 하는가)",
      " *",
      " * **사용해야 하는 경우:**",
      " * - ${2:사용 사례}",
      " *",
      " * **사용하지 말아야 하는 경우:**",
      " * - ${3:미권장 사례}",
      " *",
      " * ## Usage guidelines",
      " *",
      " * ### ✅ Do (권장 사항)",
      " * - ${4:권장 사항}",
      " *",
      " * ### 🚫 Don't (주의/금지 사항)",
      " * - ${5:금지 사항}",
      " *",
      " * ## Example",
      " *",
      " * {@tool snippet}",
      " * ```tsx",
      " * <${TM_FILENAME_BASE} />",
      " * ```",
      " * {@end-tool}",
      " *",
      " * ## 참고사진",
      " * ![](<https://raw.githubusercontent.com/AlmSmartDoctor/ccds-screenshots/main/screenshots/${6:Category}/${TM_FILENAME_BASE}/For%20Jsdoc.png?raw=true>)",
      " */"
    ],
    "description": "CCDS 디자인 시스템 JSDoc 템플릿"
  }
}
```

### 사용 방법

- `.tsx` 파일에서 `ccdoc` 입력 후 `Tab`을 누르면 JSDoc 틀이 자동 생성됩니다.
