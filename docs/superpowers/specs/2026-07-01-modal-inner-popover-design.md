# Modal 내부 Popover 계열 정렬·간격·패딩 정리 — 설계

- 이슈: #40 `[design] Modal 내부 Popover 계열 정렬·간격·패딩 정리`
- 브랜치: `fix/modal-inner-design`
- 관련 선행 작업: #39 (CSD-8027, Modal 안 Popover portal/클릭 수정)

## 배경

CSD-8027(portal 동작)과 별개로 순수 스타일/레이아웃 5건. portal 수정과
무관하며, 대부분 Modal이 `children`을 `<p>`(`DialogPrimitive.Description`)에
렌더하는 기존 구조가 block 픽커를 넣자 드러난 문제.

## 항목별 설계

### 1. Popover 기본 정렬 (`Popover.tsx:106`)

- 증상: `PopoverContent`가 트리거보다 왼쪽에 뜸.
- 원인: `align` 기본값이 `"end"`.
- 결정: 기본값 `"end"` → `"start"`. 트리거 왼쪽 선에 팝오버 왼쪽 보더 정렬.
- 영향: `PopoverContent` 소비처는 `src/components` 내부 0건(픽커들은
  `PopoverPrimitive.Content`를 직접 쓰며 이미 `align="start"`). 외부 앱은
  `align` prop으로 override 가능 → 저위험. CHANGELOG에 시각 변경 명시.

### 2. TimePicker 우측 패딩 과다 (`TimePicker.tsx:355`)

- 증상: 인풋 우측 패딩 과다.
- 원인: `pr-8`이 `showIcon` 여부와 무관하게 항상 적용. 아이콘 없을 때도
  32px 우측 패딩이 남음.
- 결정: `pr-8`을 `showIcon`일 때만 조건부 적용. 아이콘 없으면 `px-3`만.

### 3·4·5. 모달 내부 라벨↔값 간격 사라짐 (DateRange/MonthRange/YearRangePicker)

- 증상: 모달 안에서 라벨과 `YYYY-MM-DD` 값 사이 간격이 사라짐(붙음).
- **실측으로 확정한 근본 원인 (이슈의 초기 가설과 다름):** Modal은 Radix
  `DialogPrimitive.Portal`로 콘텐츠를 `document.body`에 portal한다. 앱 폰트
  `Pretendard`는 `.cms-cashdoc-ds` 루트 + descendant에만 적용되므로
  (`globals.css:252-286`), portal된 모달 콘텐츠는 그 inherit 체인 밖으로
  나가 OS serif(Times)로 fallback한다. `globals.css:288-301`이 Popover/
  Dropdown/Tooltip poppers와 픽커 캘린더 wrapper에는 Pretendard를 재선언하나
  **Radix Dialog(Modal) 콘텐츠는 그 셀렉터 목록에 없다.** serif로 렌더된
  라벨 "시작일자"가 sans보다 넓어져(48px vs 42px) 고정 `pl-14-75`(59px) 값
  패딩을 침범 → 라벨↔값이 붙는다.
- **실측 증거 (Storybook chrome-devtools):**
  - 단독: `labelFont=Pretendard`, `labelWidth=42px`, gap `+5px`.
  - 모달(수정 전): `labelFont=Times`, `labelWidth=48px`, gap `-1px`(붙음).
  - 모달 `[role=dialog]`에 `cms-cashdoc-ds` 주입 시: `Pretendard`, `42px`,
    gap `+5px` → 단독과 완전 일치.
- **결정 (핵심 fix):** `Modal.tsx`의 `DialogPrimitive.Content`에
  `cms-cashdoc-ds` 클래스를 부여해 portal된 모달을 DS 폰트 루트로 만든다.
  Pretendard/font-weight 등 DS 타이포 전체를 복원 → 3·4·5 균일 해결.
- **보조 개선 (별개 정합성):** `children` 컨테이너를 `<p>` → `<div>`로 변경.
  블록 픽커(`<div>`)를 `<p>`(Description)에 넣으면 무효 HTML이라 브라우저가
  픽커를 `<p>` 밖으로 hoist → `px-6` 패딩 컨테이너를 잃는다. `<div>`로
  바꾸면 픽커가 패딩 컨테이너 안에 정상 유지된다. 시맨틱 변경 보완용으로
  접근성 `description?: React.ReactNode` optional prop을 신설(시각 숨김
  `<Description>`으로 `aria-describedby` 배선), 없으면 `<Content>`에
  `aria-describedby={undefined}`로 Radix 워닝 억제.

#### 소비처 영향

- **필수 변경 소비처: 0건.** 폰트 fix는 내부 클래스 추가. `description`은
  additive optional prop. 기존 모달은 그대로 동작.
- 트레이드오프: `<p>`→`<div>` 이동으로 Radix 자동 `aria-describedby` 배선이
  사라짐. 스크린리더 설명 연결이 필요한 모달만 `description`을 추가해 점진
  복원(선택).

## 검증 계획

- 각 컴포넌트 `InModal` 스토리(Popover/TimePicker/DateRange/MonthRange/
  YearRangePicker)에서 단독 사용과 모달 내부 렌더가 동일한지 확인.
- 기존 Modal 스토리 전반 회귀 확인(텍스트 children 시각/패딩 동일, 워닝 없음).
- `pnpm lint`, `pnpm type-check`, `pnpm build`. 필요 시 Storybook 시각 확인.

## 완료 기준

- 1: 단독 Popover 기본 정렬이 트리거 왼쪽에 맞음.
- 2: TimePicker 아이콘 없을 때 우측 패딩 정상.
- 3·4·5: 모달 내부 라벨↔값 간격이 단독 사용과 동일.
- Modal JSDoc + 스토리에 `description` prop 반영.
- 콘솔에 Radix Description 워닝 없음.
