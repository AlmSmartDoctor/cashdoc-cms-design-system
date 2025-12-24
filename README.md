# Cashdoc CMS Design System

Cashdoc CMS용 디자인 시스템 컴포넌트 라이브러리

## 문서
Storybook과 JSDoc, 둘 중 더 편한 쪽을 보면 됩니다.
### Storybook
[Storybook](https://cashdoc-cms-design-system.vercel.app/?path=/docs/components-button--docs)

### JSDoc(TSDoc)
<img width="1038" height="363" alt="스크린샷 2025-12-24 오후 3 48 42" src="https://github.com/user-attachments/assets/1178fa60-30cb-436b-944c-495417179ac3" />

<br />

## 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **TailwindCSS** - 스타일링
- **Radix UI** - 접근성 프리미티브
- **Framer Motion** - 애니메이션
- **Vite** - 빌드 도구
- **Storybook** - 컴포넌트 문서화

<br />

## 설치

```bash
pnpm install cashdoc-cms-design-system
```

<br />

## 사용법

프로젝트 최상단에서 cashdoc-cms-design-system의 `style.css` 파일을 import 후 사용하면 됩니다.

```tsx
import "cashdoc-cms-design-system/dist/style.css";
```

```tsx
import { Button, Modal, DatePicker } from "cashdoc-cms-design-system";

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
- `TextInput` - 텍스트 입력 필드
- `TagInput` - 태그 입력 필드

### Data Input

- `DatePicker` - 날짜 선택
- `DateRangePicker` - 기간 선택
- `Dropdown` - 드롭다운 메뉴
- `Select` - 선택 입력
- `Combobox` - 검색 가능한 선택

### Feedback

- `Modal` - 모달 다이얼로그
  - `ConfirmModal` - 확인 모달
  - `DeleteModal` - 삭제 확인 모달
  - `ErrorModal` - 에러 알림
  - `SuccessModal` - 성공 알림
  - `WarningModal` - 경고 알림
- `Toast` - 토스트 알림
- `LoadingCircle` - 로딩 인디케이터

### Navigation

- `SideNavigation` - 사이드바 네비게이션
- `Popover` - 팝오버 메뉴

### Display

- `Text` - 타이포그래피
- `Icons` - 아이콘 세트

#
<br />
# 개발

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
