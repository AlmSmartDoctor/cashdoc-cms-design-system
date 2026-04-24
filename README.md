# Cashdoc CMS Design System

📘 [CCDS Contribution Guide](./CONTRIBUTING.md)

Cashdoc CMS용 디자인 시스템 컴포넌트 라이브러리

## 문서

Storybook과 JSDoc, 둘 중 더 편한 쪽을 보면 됩니다.

### Storybook

[Storybook](https://cashdoc-cms-design-system.vercel.app/?path=/docs/components-button--docs)

### JSDoc(TSDoc)

<img width="1038" height="363" alt="스크린샷 2025-12-24 오후 3 48 42" src="https://github.com/user-attachments/assets/3a2c3ef6-ab30-4130-82d1-4c7145aa8f82" />

<br />

## 기술 스택

- **React 18+** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **TailwindCSS v4** - 스타일링
- **Radix UI** - 접근성 프리미티브
- **Recharts** - 차트 렌더링
- **react-day-picker / dayjs** - 날짜 처리
- **Vite** - 빌드 도구
- **Storybook** - 컴포넌트 문서화

<br />

## 설치

```bash
pnpm install @cashdoc/cashdoc-cms-design-system
```

> `pnpm install cashdoc-cms-design-system`은 deprecated 되었습니다.

<br />

## 사용법

프로젝트 최상단에서 cashdoc-cms-design-system의 `style.css` 파일을 import 후 사용하면 됩니다.

```tsx
import "@cashdoc/cashdoc-cms-design-system/dist/style.css";
```

```tsx
import { Button, Modal, DatePicker } from "@cashdoc/cashdoc-cms-design-system";

function App() {
  return <Button variant="default">버튼</Button>;
}
```

<br />

## 컴포넌트 리스트

### Form

- `Button` - 기본 버튼
- `Checkbox` - 체크박스
- `RadioButton` - 라디오 버튼
- `Switch` - 토글 스위치
- `SegmentedControls` - 세그먼티드 컨트롤
- `FilterToggleGroup` - 상태 집계 + 단일 선택 필터 토글
- `TextInput` - 텍스트 입력 필드
- `TagInput` - 태그 입력 필드
- `FileUpload` - 파일 업로드
- `ImageUpload` - 이미지 업로드

### Data Input

- `DatePicker` - 날짜 선택
- `DateRangePicker` - 기간 선택
- `MonthRangePicker` - 월 기간 선택
- `YearRangePicker` - 연도 기간 선택
- `TimePicker` - 시간 선택
- `Dropdown` - 드롭다운 메뉴
- `Select` - 선택 입력
- `Combobox` - 검색 가능한 선택

### Feedback

- `Modal` - 모달 다이얼로그
  - `ConfirmModal` / `DeleteModal` / `ErrorModal` / `SuccessModal` / `WarningModal`
- `Toast` - 토스트 알림
- `ToolTip` - 툴팁
- `LoadingCircle` - 로딩 인디케이터

### Navigation

- `SideNavigation` - 사이드바 네비게이션
- `Pagination` - 페이지네이션
- `Popover` - 팝오버 메뉴

### Data Display

- `Table` - 테이블 (정렬/스트라이프/hover/compact)
- `BarChart` - 막대 차트
- `Text` - 타이포그래피
- `Icons` - 아이콘 세트

#

<br />
# 개발

## 요구사항

- **Node.js**: 22.0.0 이상
- **pnpm**: 10.0.0 이상

이 프로젝트는 pnpm v10을 사용합니다. pnpm v10의 주요 변경사항:

- 빌드 스크립트 실행이 기본적으로 제한됨 (보안 강화)
- `.npmrc` 파일에 `only-built-dependencies` 설정으로 허용된 패키지만 빌드 스크립트 실행

pnpm 설치:

```bash
npm install -g pnpm@latest
```

### 로컬 개발 서버

```bash
pnpm dev
```

### Storybook 실행

```bash
pnpm storybook
```

### 빌드

```bash
pnpm build
```

### 타입 체크

```bash
pnpm type-check
```

### 린트

```bash
pnpm lint
```

### 릴리즈 버전 규칙

- 수동 배포: `Actions > Release > Run workflow`에서 `patch/minor/major` 선택
- 자동 배포(`main` push): 기본은 `patch`
- 커밋 메시지에 `chore` 또는 `doc`이 포함되면 자동 배포 스킵
- 커밋 메시지에 토큰을 넣으면 버전 타입 지정 가능
- `major`: `[major]`
- `minor`: `[minor]`
- `patch`: `[patch]` (생략하면 기본 `patch`)

<!-- trigger release workflow -->
