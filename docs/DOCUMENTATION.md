# DOCUMENTATION

## 1. 목적

컴포넌트 변경 시 Storybook/JSDoc/README를 동시에 맞춰
문서와 실제 동작이 어긋나지 않도록 관리합니다.

## 2. 문서화 대상

- 컴포넌트 사용법과 props 설명
- variant/state별 시각적 예시
- 접근성(키보드/ARIA) 안내
- breaking/deprecation 안내

## 3. 필수 동기화 규칙

1. 컴포넌트 API 변경 시 JSDoc 업데이트
2. 동작/스타일 변경 시 `.stories.tsx` 갱신
3. `ForJsdoc` 스토리 유지 및 최신화
4. public 사용 예시 변화 시 `README.md` 반영

## 4. JSDoc 체크리스트

- 언제 사용/비권장 사용 케이스 포함
- 접근성 정보 포함
- 실제 동작하는 snippet 예시 포함
- 관련 컴포넌트 링크(See also) 업데이트

## 5. Storybook 체크리스트

- 대표 기본 상태(Default) 확인 가능
- 주요 variant(size/tone/state) 노출
- disabled/error/loading 등 회귀 포인트 노출
- E2E가 참조하는 story id 변경 시 테스트 동시 수정

## 6. 스크린샷 운영

- 문서 스크린샷 갱신 필요 시 `pnpm screenshot` 실행
- 산출물 경로: `__screenshots__/`
- CI 스크린샷 워크플로우 실패 시 로그 확인 후 재실행

## 7. 리뷰 기준

- 문서 누락은 단순 코멘트가 아니라 회귀 리스크로 판단
- API 변경인데 문서 미동기화면 머지 보류 대상
- 취향 차이보다 사용성/오해 가능성을 우선 검토
