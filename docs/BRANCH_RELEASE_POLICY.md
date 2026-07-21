# BRANCH_RELEASE_POLICY

## 1. 브랜치 모델 (Trunk-based)

이 저장소는 npm에 버전을 publish하는 **라이브러리**입니다. 성숙도가
아직 낮아 버그 수정이 잦고, 그만큼 patch 릴리즈가 자주 나가는 것이
**정상**입니다. 릴리즈 빈도를 브랜치로 억제하기보다, 수정을 빠르게
소비 앱에 흘려보내는 **trunk-based**를 따릅니다.

| 브랜치      | 역할                                                              |
| ----------- | ----------------------------------------------------------------- |
| `main`      | **트렁크(기본 브랜치).** 항상 릴리즈 가능한 상태. 머지 1개 = 릴리즈 1개(버전 태그). |
| `feature/*` | 기능 추가. `main`에서 분기 → `main`으로 PR.                        |
| `fix/*`     | 버그 수정. `main`에서 분기 → `main`으로 PR.                        |
| `chore/*` · `docs/*` | 설정/문서. `main`으로 PR(릴리즈 스킵 토큰).              |

- **모든 PR은 `main`을 대상**으로 합니다. 통합 브랜치(`develop`)는 두지
  않습니다 — 별도 QA/freeze 환경이 없어 통합 브랜치가 실질 게이트 없이
  의식만 되기 때문입니다.
- `main`에 **직접 push는 금지**, PR로만 병합합니다.
- `release/*` 중간 브랜치도 사용하지 않습니다(버전 bump가 CI로 자동화).

> **긴급 수정에도 별도 flow가 필요 없습니다.** trunk-based에는 미릴리즈
> 작업이 쌓이는 `develop`이 없으므로, 급한 fix도 그냥 `fix/*` → `main`
> PR로 그 변경만 독립적으로 배포하면 됩니다.

> 참고: 이 모델은 npm publish 라이브러리 기준입니다. 환경 배포 앱의
> `test/prod` 환경 브랜치 모델과는 다릅니다.

## 2. 브랜치 보호 룰 (admin이 설정)

`main`:

- PR을 통해서만 병합(직접 push 금지, force push/삭제 금지)
- 리뷰 승인 **1개 이상** 필수(릴리즈 이벤트이므로)
- 필수 status check: **Build**, **Lint & Type Check**, **Validate PR title token**
  - E2E Tests는 인프라 timeout 이슈로 **필수에서 제외**(필수로 걸면 병합 불가)

> 브랜치 보호와 기본 브랜치 변경은 **repo admin 권한**이 필요합니다.

### ⚠️ 브랜치 보호와 자동 릴리즈의 충돌 — `RELEASE_TOKEN` 필수

release workflow는 버전 bump 커밋을 `git push --follow-tags origin main`으로 **`main`에 직접
push**한다(§3). 그런데 위 보호 룰은 직접 push를 막으므로, 둘을 그대로 두면 릴리즈가 항상 실패한다.

- Actions 기본 `GITHUB_TOKEN`은 **관리자가 아니다** → `enforce_admins: false`(관리자 우회 허용)
  설정의 혜택을 받지 못하고 보호 룰에 그대로 막힌다.
- 그래서 `release.yml`의 checkout은 **관리자 PAT(`secrets.RELEASE_TOKEN`)** 를 사용한다.
  이후 `git push`는 checkout이 심어둔 자격증명을 그대로 쓴다.

**`RELEASE_TOKEN` 시크릿이 등록돼 있지 않으면 릴리즈는 실패한다.** 등록: `Settings → Secrets and
variables → Actions → New repository secret` (이름 `RELEASE_TOKEN`, 값 = `repo`,`workflow` 스코프의
관리자 PAT).

> 실패 시 증상: `Push changes` 스텝에서 `GH006: Protected branch update failed` +
> `remote rejected main -> main`. 이때 **태그는 이미 push된 뒤라** 유령 태그가 남는다
> (`git push --follow-tags`는 원자적이지 않다). 재시도 전에 해당 태그를 지워야 한다:
> `git push origin --delete vX.Y.Z && git tag -d vX.Y.Z`

## 3. 릴리즈 흐름

1. `feature/*` · `fix/*` → **`main` PR**. 제목에 영향도 토큰(§4)을 답니다.
2. 리뷰 승인 + status check 통과 후 병합하면 `main` push가 발생 →
   **release workflow 자동 실행**: 병합 커밋의 토큰으로 버전 타입 결정 →
   버전 bump → `CHANGELOG.md` 생성 → 태그 → npm publish → GitHub Release.
3. `docs`/`chore` 토큰 PR은 버전 bump 없이 병합됩니다(릴리즈 스킵, §5).

- **머지 = 릴리즈**이므로, 배포 이력은 각 PR + `CHANGELOG.md` + 태그 +
  GitHub Release에 그대로 남습니다(무엇이/누가/언제 배포됐는지).
- 릴리즈 cadence를 배치로 묶고 싶어지면(버전 churn이 거슬리면) `develop`
  브랜치 대신 **changesets/release-please** 방식(누적 release PR)을 도입합니다.

CLI/UI 수동 dispatch(`workflow_dispatch`)는 배포 이력이 레포 밖에 흩어져
추적이 어려우므로, 자동 릴리즈가 실패했을 때의 **복구용**으로만 씁니다.

## 4. PR 타이틀 규칙

`pr-title-guard` 기준으로 PR 제목에 아래 토큰이 필요합니다.

- `[major]` / `[minor]` / `[patch]` / `[docs]` / `[chore]`

- 각 PR의 토큰이 **그 머지로 발생할 릴리즈의 버전 타입**을 결정합니다.
  release workflow가 병합 커밋 메시지에서 이 토큰을 읽습니다.
- 한 PR에 여러 성격이 섞이면 **최고 영향도**를 토큰으로 답니다.

## 5. 버전 기준

- **Major**: 하위 호환성 깨짐
- **Minor**: 하위 호환 유지 + 기능 추가/가시적 변경
- **Patch**: 버그 수정/내부 개선
- `docs/chore`: 릴리즈 스킵

## 6. 병합 전 체크

- PR 토큰/영향도가 실제 변경 내용과 일치하는지 확인
- breaking 변경이면 마이그레이션 가이드를 남김
- `main`은 머지 즉시 배포되므로, 병합 전 status check(Build/Lint/Type)
  통과를 반드시 확인
