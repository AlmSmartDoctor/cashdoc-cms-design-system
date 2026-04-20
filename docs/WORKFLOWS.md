# WORKFLOWS

## 1. 구현 워크플로우

1. 요구사항 분류 (`feature/style/refactor/test/review`)
2. 관련 docs 로드
3. 최소 단위 구현
4. Storybook/JSDoc 동기화
5. 린트/타입/테스트 검증
6. PR 템플릿 기준으로 요약/영향 범위 작성

## 2. PR 작성 워크플로우

- `요약`에 변경 목적과 사용자 영향 명시
- `변경 유형`(Major/Minor/Patch/Chore) 체크
- `영향 범위`(API/Styling/Stories/JSDoc/Tooling) 체크
- 필요 시 deprecation/마이그레이션 정보 작성

## 3. 리뷰 워크플로우

리뷰 출력 기본 형식:
- Findings (P1/P2/P3)
- Open Questions
- Change Summary

리뷰 우선순위:
- 타입 호환성/런타임 오류
- 접근성 회귀
- API 일관성
- 테스트 누락
- 문서 동기화 누락

## 4. 머지 게이트

최소 통과 조건:
- lint/type-check 통과
- build 통과
- 변경 범위에 맞는 E2E 또는 검증 근거 확보
- PR 템플릿 필수 항목 작성

## 5. 사후 작업

즉시 수정하지 않는 항목은 `docs/TECH_DEBT.md` 규칙으로
추적 가능한 형태로 남깁니다.
