# BRANCH_RELEASE_POLICY

## 1. 브랜치 운영

- 기본 보호 브랜치: `main`
- 작업 브랜치: 기능 단위로 분리
- 자동화 에이전트 브랜치 prefix: `codex/*` 권장

## 2. PR 타이틀 규칙

`pr-title-guard` 기준으로 PR 제목에 아래 토큰이 필요합니다.

- `[major]`
- `[minor]`
- `[patch]`
- `[docs]`
- `[chore]`

## 3. 릴리즈 트리거

`main` push 시 release workflow가 동작합니다.

- 기본 릴리즈 타입: `patch`
- 커밋 메시지 토큰으로 override 가능
  - `[major]`, `[minor]`, `[patch]`
- `docs/chore` 성격 커밋은 릴리즈 스킵 가능

## 4. 버전 기준

- Major: 하위 호환성 깨짐
- Minor: 하위 호환 유지 + 기능 추가
- Patch: 버그 수정/내부 개선

## 5. 수동 릴리즈

`workflow_dispatch`로 `patch/minor/major`를 선택해 실행할 수 있습니다.

## 6. 병합 전 체크

- 릴리즈 토큰/영향도가 PR 설명과 일치하는지 확인
- breaking 변경이면 마이그레이션 가이드를 남김
- `CHANGELOG.md` 자동 생성 흐름과 충돌 없는지 확인
