# BRANCH_RELEASE_POLICY

## 1. 브랜치 모델 (Git Flow 기반)

이 저장소는 npm에 버전을 publish하는 **라이브러리**이므로, 릴리즈 기반
git flow를 따릅니다(환경 배포 앱의 `test/prod` 환경 브랜치 모델과 다름).

| 브랜치      | 역할                                                            |
| ----------- | --------------------------------------------------------------- |
| `main`      | **배포(publish)된 것만.** 커밋 1개 = 릴리즈 1개. 버전 태그.      |
| `develop`   | **기본/통합 브랜치.** 다음 릴리즈 내용이 여기 모입니다.         |
| `feature/*` | `develop`에서 분기 → `develop`으로 PR (기능/수정 단위).         |
| `fix/*`     | 버그 수정. `develop`으로 PR.                                    |

- **기본 브랜치는 `develop`** 입니다. 모든 feature PR은 `develop`을 대상으로 합니다.
- `main`에는 **`develop → main` 릴리즈 PR로만** 도달합니다. `main`에 직접 push 금지.
- `release/*` 중간 브랜치는 사용하지 않습니다(버전 bump가 CI로 자동화돼 있고
  별도 QA 환경이 없으므로). 안정화(freeze) 단계가 필요해지면 그때 도입합니다.

## 2. 브랜치 보호 룰 (admin이 설정)

`main`, `develop` 모두:

- PR을 통해서만 병합(직접 push 금지, force push/삭제 금지)
- 필수 status check: **Build**, **Lint & Type Check**, **Validate PR title token**
  - E2E Tests는 인프라 timeout 이슈로 **필수에서 제외**(필수로 걸면 병합 불가)
- `main`은 릴리즈 이벤트이므로 리뷰 승인 요구를 권장(팀 리뷰어 확보 후 상향)

> 브랜치 보호와 기본 브랜치 변경은 **repo admin 권한**이 필요합니다.

## 3. 릴리즈 흐름

1. `feature/*` → `develop` PR (여러 개 누적)
2. 릴리즈할 때 **`develop → main` PR** 을 올립니다. 이 PR이 곧 **배포 이력**
   입니다(무엇이/누가/언제 배포됐는지가 레포 안에 남습니다).
3. 이 PR을 병합하면 `main` push가 발생 → **release workflow 자동 실행**:
   버전 bump → `CHANGELOG.md` 생성 → 태그 → npm publish → GitHub Release.
4. 릴리즈 직후 **`main → develop` 백머지**로 버전 bump 커밋을 develop에 되돌려
   이격(divergence)을 방지합니다.

CLI/UI 수동 dispatch는 배포 이력이 레포 밖에 흩어져 추적이 어려우므로,
정식 릴리즈는 **`develop → main` PR**로 진행합니다(수동 dispatch는 비상용).

## 4. PR 타이틀 규칙

`pr-title-guard` 기준으로 PR 제목에 아래 토큰이 필요합니다.

- `[major]` / `[minor]` / `[patch]` / `[docs]` / `[chore]`

- feature PR: 해당 변경의 영향도 라벨.
- **릴리즈 PR(`develop → main`)**: 이번 배치에 포함된 변경 중 **최고 영향도**를
  토큰으로 답니다. release workflow가 병합 커밋 메시지에서 이 토큰을 읽어
  버전 타입을 결정합니다.

## 5. 버전 기준

- **Major**: 하위 호환성 깨짐
- **Minor**: 하위 호환 유지 + 기능 추가/가시적 변경
- **Patch**: 버그 수정/내부 개선
- `docs/chore`: 릴리즈 스킵

## 6. 병합 전 체크

- 릴리즈 PR 토큰/영향도가 실제 배치 내용과 일치하는지 확인
- breaking 변경이면 마이그레이션 가이드를 남김
- 릴리즈 직후 `main → develop` 백머지를 잊지 않기
