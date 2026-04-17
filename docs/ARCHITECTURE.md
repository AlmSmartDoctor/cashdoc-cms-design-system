# ARCHITECTURE

## 1. 개요

`cashdoc-cms-design-system`은 앱이 재사용하는 UI 컴포넌트를
라이브러리 형태로 배포하는 저장소입니다.

핵심 목표:

- 타입 안전한 public API 제공
- 일관된 디자인 토큰/접근성 유지
- Storybook 기반 문서화/검증

## 2. 엔트리포인트 구조

- `src/index.ts`
  - 글로벌 스타일(`src/styles/globals.css`) 로드
  - `src/components` 전체 export
  - `src/utils/cn.ts` export
- `src/components/index.ts`
  - 각 컴포넌트 모듈의 public export 집합

이 두 파일이 사실상 라이브러리의 외부 경계입니다.

## 3. 컴포넌트 표준 단위

컴포넌트는 디렉터리 단위로 관리합니다.

```text
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.stories.tsx
  variants.ts (선택)
  index.ts
```

권장 의존 순서:

- `ComponentName.tsx` → `variants.ts`/`utils/cn.ts`
- stories는 컴포넌트를 소비하는 문서/검증 계층

## 4. 의존성 경계

- UI primitive: Radix UI
- 스타일 variant: class-variance-authority
- 클래스 병합: `cn()`
- 공통 스타일: `src/styles/globals.css` 토큰

지양:

- 소비 앱 내부 모듈 직접 import
- 컴포넌트 간 순환 의존
- 강한 런타임 결합(글로벌 mutable state)

## 5. 렌더링/상태 원칙

- 기본은 stateless/controlled props 우선
- 내부 상태는 UI 상호작용 범위에서만 최소 사용
- 무거운 연산은 렌더 경로 밖으로 분리

## 6. 접근성 기본 원칙

- semantic element 우선 사용
- role/aria 속성은 실제 상태와 동기화
- 키보드 탐색 가능한 인터랙션 제공

## 7. 변경 영향 체크

아래 중 하나라도 포함되면 public 영향 가능성이 큽니다.

- props 타입/기본값 변경
- `src/components/index.ts` export 변경
- variant key 변경
- Storybook 스토리 id 변경

해당 변경은 `docs/API.md`, `docs/WORKFLOWS.md`를 함께 확인하세요.
