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

- 증상: 모달 안에서 라벨과 `YYYY-MM-DD` 값 사이 간격이 사라짐.
- 근본 원인: Modal이 `children`을 `<DialogPrimitive.Description>`(=`<p>`)에
  렌더(`Modal.tsx:322-329`). block 픽커(`<div>`)를 `<p>` 안에 넣으면
  브라우저가 무효 HTML로 판단해 `<p>`를 강제 종료하고 픽커를 밖으로 hoist →
  width/layout 컨텍스트가 깨져 픽커 내부 절대배치 라벨 정렬이 무너짐.
- 결정 (Modal API 개선, non-breaking):
  - `children` 컨테이너를 `<p>` → `<div>`로 변경. 클래스
    (`px-6 pt-1 pb-5 text-sm/relaxed text-cms-gray-700`)는 그대로 유지해
    시각적 동일성 보장.
  - 접근성용 `description?: React.ReactNode` optional prop 신설. 값이 있으면
    시각 숨김(`sr-only`) `<DialogPrimitive.Description>`에 렌더해
    `aria-describedby` 자동 배선 유지.
  - `description` 없으면 `<Content>`에 `aria-describedby={undefined}`를
    명시해 Radix "Missing Description" 콘솔 워닝 억제.

#### 소비처 영향

- **필수 변경 소비처: 0건.** 기존 모달은 `children`만 넘기던 대로 동작하며
  시각적으로 동일. `description`은 additive optional prop → 빌드 안 깨짐.
- 트레이드오프: 기존 텍스트 설명 모달은 `<p>`→`<div>` 이동으로 Radix 자동
  `aria-describedby` 배선이 사라짐. 스크린리더 설명 연결이 필요한 모달만
  `description` prop을 추가해 점진 복원(선택).

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
