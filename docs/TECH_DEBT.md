# TECH_DEBT

## 1. 목적

이번 PR 범위에서 바로 해결하지 못한 구조적 문제를
재현 가능하고 추적 가능한 형태로 남기기 위한 문서입니다.

## 2. 기술 부채로 분류하는 기준

- 반복적으로 재발하는 패턴
- scope 밖이지만 사용자/운영 영향이 명확한 문제
- 후속 owner 또는 액션을 지정할 수 있는 문제

## 3. 분류 레벨

- P1: 즉시 대응 필요 (심각 회귀 위험)
- P2: 단기 대응 권장 (품질/개발속도 저하)
- P3: 중장기 개선 항목 (일관성/구조 정리)

## 4. 기록 템플릿

```md
- [P2] 제목
  - 위치: `path/to/file.tsx`
  - 증상: 어떤 문제가 어떤 조건에서 나타나는지
  - 영향: 사용자/운영/개발 효율 영향
  - 제안: 현실적인 개선 방향
  - owner: 담당자 또는 팀
  - target: 목표 버전/마일스톤
```

## 5. 운영 원칙

- 취향 차이는 기술 부채로 등록하지 않습니다.
- 반드시 증상과 영향이 함께 있어야 합니다.
- 다음 PR에서 해결할 항목은 링크를 남겨 연결합니다.

## 6. 현재 추적 중인 기술 부채

> 최초 작성: 2026-04-20. 프로젝트 전반 스캔 기반 초기 등록.
> owner/target은 추후 지정합니다.

### 6.1 접근성 & 폼 시맨틱

- [P1] TagInput 검증 실패 시 `alert()` 사용
  - 위치: `src/components/TagInput/TagInput.tsx:231,236,243`
  - 증상: 최대 개수 초과, 중복 태그, `validateTag` 실패 케이스에서 브라우저 `alert()`를 호출합니다.
  - 영향: 메인 스레드를 블로킹하며, 디자인 시스템 톤앤매너와 맞지 않고, 스토리북/e2e 환경에서 대화상자를 유발해 테스트를 방해합니다. 스크린리더 사용자에게도 컨텍스트가 전달되지 않습니다.
  - 제안: `onError?: (message: string) => void` 콜백으로 내보내고 컴포넌트 내부에서는 `helperText`/에러 상태만 표시합니다. 기본 케이스도 inline message로 대체합니다.
  - owner: TBD
  - target: TBD

- [P2] TextInput 에러 상태가 `aria-invalid` / `aria-describedby`와 동기화되지 않음
  - 위치: `src/components/TextInput/TextInput.tsx:206-219, 245-258`
  - 증상: `error` prop이 true여도 `<input>`에 `aria-invalid="true"`가 설정되지 않고, `errorMessage`에도 id가 없어 `aria-describedby`로 연결되지 않습니다.
  - 영향: 스크린리더가 입력 자체가 에러 상태임을 전달받지 못합니다. WCAG 4.1.2 (Name, Role, Value) 기준 회귀.
  - 제안: error message에 `id = ${inputId}-error` 부여 후 `<input>`에 `aria-invalid={!!error}`와 `aria-describedby`(error 시 error id, 그 외 helperText id)를 동기화합니다.
  - owner: TBD
  - target: TBD

- [P2] Modal이 `onOpenAutoFocus`를 `preventDefault`로 막아 초기 포커스가 이동하지 않음
  - 위치: `src/components/Modal/Modal.tsx:228`
  - 증상: Radix Dialog의 기본 초기 포커스 이동을 막고 있어, 모달이 열려도 키보드 포커스는 트리거에 남아 있습니다.
  - 영향: JSDoc은 "포커스 트랩"을 약속하지만 실제로는 스크린리더/키보드 사용자가 모달 진입을 인지하기 어렵습니다. WCAG 2.4.3 (Focus Order) 위반 가능.
  - 제안: `onOpenAutoFocus` 기본값을 복원하고, 커스텀이 필요하면 JSDoc으로 명시적 opt-out 가이드를 제공합니다.
  - owner: TBD
  - target: TBD

### 6.2 스타일 & 디자인 토큰

- [P2] Checkbox에서 `cms-*` 토큰 대신 원시 Tailwind 색상 사용
  - 위치: `src/components/Checkbox/Checkbox.tsx:107-130`
  - 증상: `border-gray-400`, `bg-white`, `data-[state=checked]:border-black`, `data-[state=checked]:bg-black`, `text-white`, `text-gray-500`, `hover:text-black`가 하드코딩되어 있습니다.
  - 영향: 디자인 토큰 계약 위반. 테마/리브랜딩 시 일괄 갱신이 어렵고, 다른 컴포넌트의 `cms-*` 팔레트와 미묘하게 어긋날 수 있습니다.
  - 제안: `cms-gray-400`, `cms-white`, `cms-black`, `cms-gray-500/600`, `cms-gray-700` 등으로 교체합니다.
  - owner: TBD
  - target: TBD

- [P2] Modal 본문·닫기 아이콘 배경이 `bg-white`, `text-cms-*`가 아닌 `rounded-lg` 사용
  - 위치: `src/components/Modal/Modal.tsx:234`
  - 증상: Modal Content가 `bg-white`와 Tailwind 기본 `rounded-lg`를 사용합니다. 토큰(`bg-cms-white`, `rounded-cms-*`) 체계와 분리되어 있습니다.
  - 영향: 모서리/배경 일관성 저하. 테마 변경 시 Modal만 비동기적으로 영향이 빠질 수 있습니다.
  - 제안: `bg-cms-white`, `rounded-cms-lg` 혹은 동급 토큰으로 전환합니다.
  - owner: TBD
  - target: TBD

- [P3] 오버레이 z-index 계층이 매직 넘버로 분산되어 있음
  - 위치: `src/components/Modal/Modal.tsx:219,230` (`z-150`), `src/components/ToolTip/ToolTip.tsx:164` / `src/components/Popover/Popover.tsx:94` / `src/components/Dropdown/Dropdown.tsx:365,550` / `src/components/DatePicker/DatePicker.tsx:230` 등 (`z-50`)
  - 증상: Modal은 `z-150`, 나머지 플로팅 UI는 `z-50`으로 선언되어 있습니다. 명시적 계층 정의가 없습니다.
  - 영향: 앱 소비 측에서 Tooltip이 Modal 위에 떠야 할 때 뒤집히는 순서를 예측하기 어렵습니다. 신규 overlay 추가 시마다 충돌 가능성이 생깁니다.
  - 제안: Tailwind `@theme`에 `--z-dropdown / --z-popover / --z-tooltip / --z-modal` 같은 시맨틱 토큰을 정의하고, 컴포넌트는 이 토큰만 참조합니다.
  - owner: TBD
  - target: TBD

### 6.3 상태 & API

- [P1] TagInput이 controlled/uncontrolled 혼합 상태로 소비측 value를 덮어쓸 수 있음
  - 위치: `src/components/TagInput/TagInput.tsx:205-215`
  - 증상: `value` prop에서 초기화한 `tags` 상태를 `useEffect`로 매번 `setTags(value)` 동기화합니다. 내부 액션에서도 `setTags`로 독립 업데이트하므로 부모가 재렌더될 때 사용자가 막 추가한 태그가 이전 값으로 복원될 수 있습니다.
  - 영향: controlled 사용 시 태그 추가/삭제가 간헐적으로 유실될 수 있습니다. 최초 증상은 "드물게 태그가 사라진다" 형태로만 드러나 디버깅 난이도가 높습니다.
  - 제안: 완전 controlled로 단일화하거나(`value`를 항상 사용, `onChange`만 호출), 완전 uncontrolled(`defaultValue`)로 양방향 분리합니다. 혼합 모드를 지원해야 한다면 `value === undefined`일 때만 내부 state를 사용하도록 분기합니다.
  - owner: TBD
  - target: TBD

- [P2] TextInput이 `value`, `defaultValue`, 내부 state를 동시에 사용
  - 위치: `src/components/TextInput/TextInput.tsx:171-186, 214-216, 253-255`
  - 증상: `internalValue`를 두고, 두 input 분기 모두에 `value`와 `defaultValue`를 동시에 전달합니다. `value`가 초기 `undefined`였다가 이후 string으로 바뀌면 React가 controlled/uncontrolled 경고를 출력하고 입력이 리셋될 수 있습니다.
  - 영향: 소비 앱이 초기 로딩 후 값을 주입하는 흔한 패턴에서 경고/회귀가 발생합니다. 글자 수 카운터도 소스가 이중화되어 드리프트 가능성이 있습니다.
  - 제안: `value`가 정의되어 있으면 `defaultValue`를 전달하지 않도록 분기하고, `internalValue`는 uncontrolled 경로에서만 사용합니다. 글자 수는 단일 소스에서 계산합니다.
  - owner: TBD
  - target: TBD

- [P2] Dropdown `onValueChange`가 다중 선택 시 콤마 구분 문자열을 반환
  - 위치: `src/components/Dropdown/Dropdown.tsx:23,225,238`
  - 증상: `multiple=true`일 때 `onValueChange`가 `"a,b,c"` 형태 문자열을 넘깁니다. JSDoc/타입에 이 계약이 명시되어 있지 않습니다.
  - 영향: 소비 앱이 `value.split(",").filter(Boolean)`을 매번 재구현해야 하며, 값 자체에 콤마가 포함되는 경우 파싱이 깨집니다.
  - 제안: 시그니처를 `(value: string | string[]) => void`로 확장하거나, 다중 모드 전용 `onValuesChange?: (values: string[]) => void` 콜백을 추가합니다. 기존 호출부 호환을 위해 두 콜백을 병행 지원한 뒤 deprecation 절차를 밟습니다.
  - owner: TBD
  - target: TBD

### 6.4 Export & 공개 API 표면

- [P2] `DropdownOption` / `DropdownProps` 타입이 배럴에 없음
  - 위치: `src/components/Dropdown/index.ts`
  - 증상: `Dropdown` 컴포넌트와 `Select`/`Combobox`의 Props 타입만 export되고, 기반 타입 `DropdownOption`과 `DropdownProps`는 파일 직접 임포트를 강제합니다.
  - 영향: 소비 앱이 옵션 배열을 타입 안전하게 선언하려면 deep import를 써야 합니다. Conventions의 "배럴 기반 public export" 원칙과 어긋납니다.
  - 제안: `index.ts`에 `export type { DropdownOption, DropdownProps } from "./Dropdown"`를 추가합니다.
  - owner: TBD
  - target: TBD

- [P2] `SegmentedControlsProps`와 `Option` 타입이 export되지 않음
  - 위치: `src/components/SegmentedControls/SegmentedControls.tsx:4-14`, `src/components/SegmentedControls/index.ts`
  - 증상: 제네릭 `SegmentedControlsProps<T>` 타입이 파일 내 `type`으로만 선언되어 있고 export되지 않습니다.
  - 영향: 소비 앱이 래퍼/프리셋 컴포넌트를 만들 때 props 타입을 직접 재정의해야 합니다.
  - 제안: `export type { SegmentedControlsProps }` 선언 후 `index.ts`에서 re-export합니다.
  - owner: TBD
  - target: TBD

- [P2] Modal 패밀리의 Button deep-import 혼재
  - 위치: `src/components/Modal/ConfirmModal.tsx:4`, `DeleteModal.tsx:4`, `ErrorModal.tsx:4`, `SuccessModal.tsx:4`, `WarningModal.tsx:4`, `Modal.stories.tsx` 등
  - 증상: 같은 디렉토리 내 파일들이 `../Button/Button`(파일 직접 import)과 `../Button`(배럴)을 혼용합니다.
  - 영향: 배럴 경로 규약이 흔들리고, 향후 Button 파일 분리/재구성 시 여러 파일을 수정해야 합니다.
  - 제안: Modal 패밀리 전체를 `../Button` 배럴 import로 통일합니다.
  - owner: TBD
  - target: TBD

- [P3] `MonthRangePicker` / `YearRangePicker`가 `DateRangePicker`의 `DateRange` 타입을 deep-import
  - 위치: `src/components/MonthRangePicker/index.ts`, `src/components/YearRangePicker/index.ts`
  - 증상: 두 컴포넌트가 `DateRange` 타입을 DateRangePicker에서 직접 가져오지만 자체 index에서 re-export하지 않습니다.
  - 영향: 소비 앱이 어떤 컴포넌트를 썼는지와 무관하게 `DateRangePicker`에서 `DateRange`를 import해야 합니다.
  - 제안: 각 index에서 `export type { DateRange } from "../DateRangePicker"`로 투명 재노출합니다. 장기적으로는 공용 `date-types.ts`로 분리합니다.
  - owner: TBD
  - target: TBD

### 6.5 구조 & 중복

- [P3] 5개 Picker가 동일한 Popover disclosure 상태를 각자 재구현
  - 위치: `src/components/DatePicker/DatePicker.tsx:107`, `src/components/DateRangePicker/DateRangePicker.tsx:212`, `src/components/MonthRangePicker/MonthRangePicker.tsx:146`, `src/components/YearRangePicker/YearRangePicker.tsx:140`, `src/components/TimePicker/TimePicker.tsx:118`
  - 증상: `[isOpen, setIsOpen] = useState(false)`와 `onOpenChange` 핸들러 보일러플레이트가 각 Picker에 반복됩니다.
  - 영향: "ESC로 닫히지 않는다", "외부 클릭 감지 오작동" 같은 버그를 발견해도 5군데 수정이 필요합니다.
  - 제안: `src/hooks/useDisclosure.ts`를 추가해 `{ isOpen, open, close, toggle, onOpenChange }`를 반환하고 Picker들이 이를 소비합니다.
  - owner: TBD
  - target: TBD

- [P3] 스크롤 인디케이터 로직이 Table/Dropdown에 각자 구현됨
  - 위치: `src/components/Table/Table.tsx:147-210`, `src/components/Dropdown/Dropdown.tsx:155, 270-310`
  - 증상: 가로/세로 스크롤 hint 표시 로직이 각각 `useState` + 이벤트 리스너 수동 관리로 작성되어 있습니다.
  - 영향: 리스너 누수 위험과 스크롤 초기화 버그가 컴포넌트별로 독립 발생합니다.
  - 제안: `useScrollIndicator(ref, { axis: "x" | "y" })` 훅으로 추출합니다.
  - owner: TBD
  - target: TBD

- [P3] 날짜 범위 포맷/파싱 로직이 Date·Month·Year RangePicker에 중복
  - 위치: `src/components/DateRangePicker/DateRangePicker.tsx:50-56` (`toDayjsRange`), `src/components/MonthRangePicker/MonthRangePicker.tsx:103-110`, `src/components/YearRangePicker/YearRangePicker.tsx:82-109`
  - 증상: dayjs 변환/포맷 유틸이 각 파일에 유사 패턴으로 존재합니다.
  - 영향: 포맷 규칙 변경(예: locale, 구분자) 시 3곳을 동기화해야 하며 누락 가능성이 큽니다.
  - 제안: `src/utils/dateRange.ts`로 `toDayjsRange`, `formatDateRange`, `parseDateRange`를 통합합니다.
  - owner: TBD
  - target: TBD

- [P3] `Dropdown.tsx`, `DateRangePicker.tsx`가 600줄 이상으로 단일 파일 집중도가 높음
  - 위치: `src/components/Dropdown/Dropdown.tsx` (~625줄), `src/components/DateRangePicker/DateRangePicker.tsx` (~623줄)
  - 증상: 옵션 렌더링/검색/스크롤/서브메뉴 또는 달력/빠른 선택/범위 검증 로직이 한 파일에 집약되어 있습니다.
  - 영향: 기능 단위 테스트와 회귀 추적이 어렵습니다. 한 영역 수정이 다른 영역에 영향을 주기 쉽습니다.
  - 제안: 하위 요소(`DropdownSearch`, `DropdownMenu`, `DropdownSubmenu`, `QuickSelectPanel` 등)로 분해하고 상위는 오케스트레이션만 담당합니다.
  - owner: TBD
  - target: TBD

### 6.6 빌드 & 의존성

- [P1] `BarChart`가 미설치된 `recharts`에 의존하여 타입 체크 실패
  - 위치: `src/components/BarChart/BarChart.tsx:13-14`
  - 증상: `pnpm type-check` 실행 시 `TS2307: Cannot find module 'recharts'` 에러가 발생합니다. 추가로 `BarChart.tsx:345`의 `labelProps`가 `implicit any`로 판정됩니다.
  - 영향: CI의 타입 체크 단계가 상시 실패 상태이며, 소비 앱이 `pnpm build`로 빌드하려 할 때 막힙니다. 다른 컴포넌트 변경도 "원래 실패하는 줄 알고" 무시될 수 있어 품질 신호가 무뎌집니다.
  - 제안: `recharts`를 `dependencies`(또는 `peerDependencies`)에 명시하고, `labelProps` 파라미터에 명시 타입을 지정합니다. 장기적으로는 BarChart를 optional entry로 분리해 recharts를 미사용하는 소비자가 번들에서 제외할 수 있게 합니다.
  - owner: TBD
  - target: TBD

### 6.7 성능

- [P2] Dropdown의 옵션 map 내부에서 `onMouseEnter` 핸들러 매 렌더마다 재생성
  - 위치: `src/components/Dropdown/Dropdown.tsx:419-516` (옵션 map 내부)
  - 증상: 옵션별 `onMouseEnter`/서브메뉴 위치 계산 함수가 map 안에서 인라인 생성되어 매 렌더마다 새 참조가 발생합니다.
  - 영향: 옵션 수가 많거나 `React.memo`된 row를 쓰는 소비 시 memo 효과가 무력화되고, 서브메뉴 hover가 과도하게 재평가됩니다.
  - 제안: 핸들러를 `useCallback`으로 뽑아 map에 prop으로 전달하거나, 옵션 ID 기반 dispatch 패턴으로 단일화합니다.
  - owner: TBD
  - target: TBD

- [P3] Table의 스크롤 체크 리스너가 렌더마다 재등록될 가능성
  - 위치: `src/components/Table/Table.tsx:158-179`
  - 증상: `checkScroll`이 렌더 바디에 선언되어 있어, 관련 `useEffect` deps 구성에 따라 리스너 attach/detach가 반복될 수 있습니다.
  - 영향: 부모 재렌더가 잦은 경우 DOM 리스너 교체 비용이 누적됩니다.
  - 제안: `useCallback`으로 고정하고 `useEffect`에서 ref 기반으로 한 번만 붙입니다.
  - owner: TBD
  - target: TBD

## 7. 최근 스캔 결과 요약 (2026-04-20)

- P1: 3건 (TagInput `alert()`, TagInput controlled/uncontrolled 혼합, BarChart recharts 미설치)
- P2: 10건 (접근성 3, 스타일 2, 상태·API 2, Export 3)
- P3: 7건 (구조·중복 4, z-index 계층, 성능 2)

### 해결 진행 현황 (2026-04-20)

- ✅ Export 보강: Dropdown / SegmentedControls / Month·YearRangePicker 배럴에 타입 re-export, Modal 패밀리 Button import 통일
- ✅ TextInput 접근성: `aria-invalid`, `aria-describedby` 연결 + error/helper id 부여
- ✅ 토큰 치환: Checkbox / Modal에서 `gray/black/white`, `bg-white`, `rounded-lg` → `cms-*` 토큰

## 8. 다음 단계

- 저위험 P2(Export 추가, 하드코딩 색상 → 토큰 치환, `aria-invalid` 동기화) 우선 정리
- P1은 API 영향 범위 합의 후 진행 (TagInput `onError` 콜백 설계)
- 구조·중복 P3는 `useDisclosure`부터 착수해 후속 Picker 리팩터링의 기반 마련
