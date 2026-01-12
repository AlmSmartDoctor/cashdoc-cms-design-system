import type { Meta, StoryObj } from "@storybook/react";
import { SideNavigation, MenuItem } from "./SideNavigation";
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart,
  Calendar,
  MessageSquare,
  Star,
} from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof SideNavigation> = {
  title: "Navigation/SideNavigation",
  component: SideNavigation,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "다크 테마의 사이드 네비게이션 컴포넌트입니다. Radix UI Accordion을 기반으로 서브메뉴를 지원합니다. cashdoc-hospital-event의 yeogiya-admin 디자인을 참조했습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description:
        "사이드바 최상단에 표시될 제목입니다. headerSlot이 제공되면 표시되지 않습니다.",
      table: {
        type: { summary: "string" },
      },
    },
    menus: {
      description:
        "사이드바에 렌더링될 메뉴 항목 배열입니다. 아이콘과 서브메뉴를 포함할 수 있습니다.",
      table: {
        type: { summary: "MenuItem[]" },
      },
    },
    selectedUrl: {
      control: "text",
      description:
        "현재 선택된(활성화된) 페이지의 URL입니다. 이 값과 일치하는 메뉴 항목이 하이라이트됩니다.",
      table: {
        type: { summary: "string" },
      },
    },
    onMenuClick: {
      description: "메뉴 항목을 클릭했을 때 호출되는 콜백 함수입니다.",
      table: {
        type: { summary: "(url: string) => void" },
      },
    },
    headerSlot: {
      description:
        "제목 대신 커스텀하게 구성할 수 있는 헤더 영역입니다. 로고나 사용자 정보 등을 포함할 때 사용합니다.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    className: {
      control: "text",
      description: "사이드바 전체 컨테이너에 추가할 커스텀 CSS 클래스입니다.",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideNavigation>;

const sampleMenus: MenuItem[] = [
  {
    url: "/home",
    title: "홈",
    icon: <Home />,
  },
  {
    url: "/users",
    title: "사용자 관리",
    icon: <Users />,
    subMenu: [
      { url: "/users/list", title: "사용자 목록" },
      { url: "/users/roles", title: "권한 관리" },
      { url: "/users/groups", title: "그룹 관리" },
    ],
  },
  {
    url: "/events",
    title: "이벤트 관리",
    icon: <Calendar />,
    subMenu: [
      { url: "/events/list", title: "이벤트 목록" },
      { url: "/events/create", title: "이벤트 생성" },
      { url: "/events/analytics", title: "이벤트 통계" },
    ],
  },
  {
    url: "/reports",
    title: "리포트",
    icon: <FileText />,
  },
  {
    url: "/analytics",
    title: "분석",
    icon: <BarChart />,
  },
  {
    url: "/reviews",
    title: "후기 관리",
    icon: <Star />,
    subMenu: [
      { url: "/reviews/list", title: "후기 목록" },
      { url: "/reviews/pending", title: "승인 대기" },
    ],
  },
  {
    url: "/qna",
    title: "Q&A 관리",
    icon: <MessageSquare />,
  },
  {
    url: "/settings",
    title: "설정",
    icon: <Settings />,
  },
];

export const Default: Story = {
  render: (args) => {
    const [selectedUrl, setSelectedUrl] = useState("/home");
    return (
      <div className="flex h-screen">
        <SideNavigation
          {...args}
          selectedUrl={selectedUrl}
          onMenuClick={setSelectedUrl}
        />
        <div className="flex-1 bg-gray-50 p-8">
          <h1 className="text-2xl font-bold">선택된 URL: {selectedUrl}</h1>
          <p className="mt-4 text-gray-600">
            왼쪽 메뉴를 클릭하여 네비게이션을 테스트하세요.
          </p>
        </div>
      </div>
    );
  },
  args: {
    title: "관리자 메뉴",
    menus: sampleMenus,
  },
};

export const WithHeader: Story = {
  render: (args) => {
    const [selectedUrl, setSelectedUrl] = useState("/home");
    return (
      <div className="flex h-screen">
        <SideNavigation
          {...args}
          selectedUrl={selectedUrl}
          onMenuClick={setSelectedUrl}
          headerSlot={
            <div className="flex flex-col gap-5 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC107]">
                  <span className="text-xl font-bold text-black">C</span>
                </div>
                <span className="text-xl font-bold text-white">캐시닥</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="pl-3 text-base font-semibold text-white">
                  캐시닥병원
                </span>
                <button className="rounded-2xl bg-[#FFC107] px-4 py-1.5 text-sm font-medium text-black">
                  로그아웃
                </button>
              </div>
              <div className="rounded bg-[#4C4D50] px-3 py-2.5 text-sm text-gray-300">
                잔액 : 329,099P
              </div>
            </div>
          }
        />
        <div className="flex-1 bg-gray-50 p-8">
          <h1 className="text-2xl font-bold">선택된 URL: {selectedUrl}</h1>
          <p className="mt-4 text-gray-600">
            커스텀 헤더가 포함된 사이드바입니다.
          </p>
        </div>
      </div>
    );
  },
  args: {
    menus: sampleMenus,
  },
  parameters: {
    docs: {
      description: {
        story:
          "headerSlot을 사용하여 커스텀 헤더를 추가할 수 있습니다. 로고, 사용자 정보, 로그아웃 버튼, 잔액 표시 등을 자유롭게 구성할 수 있습니다.",
      },
    },
  },
};

export const MinimalMenus: Story = {
  render: (args) => {
    const [selectedUrl, setSelectedUrl] = useState("/home");
    return (
      <div className="flex h-screen">
        <SideNavigation
          {...args}
          selectedUrl={selectedUrl}
          onMenuClick={setSelectedUrl}
        />
        <div className="flex-1 bg-gray-50 p-8">
          <h1 className="text-2xl font-bold">선택된 URL: {selectedUrl}</h1>
        </div>
      </div>
    );
  },
  args: {
    title: "간단한 메뉴",
    menus: [
      { url: "/home", title: "홈", icon: <Home /> },
      { url: "/users", title: "사용자", icon: <Users /> },
      { url: "/settings", title: "설정", icon: <Settings /> },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "서브메뉴 없이 간단한 메뉴 구조만 사용하는 예제입니다.",
      },
    },
  },
};

export const OnlySubMenus: Story = {
  render: (args) => {
    const [selectedUrl, setSelectedUrl] = useState("/users/list");
    return (
      <div className="flex h-screen">
        <SideNavigation
          {...args}
          selectedUrl={selectedUrl}
          onMenuClick={setSelectedUrl}
        />
        <div className="flex-1 bg-gray-50 p-8">
          <h1 className="text-2xl font-bold">선택된 URL: {selectedUrl}</h1>
        </div>
      </div>
    );
  },
  args: {
    title: "서브메뉴만",
    menus: [
      {
        url: "/users",
        title: "사용자 관리",
        icon: <Users />,
        subMenu: [
          { url: "/users/list", title: "사용자 목록" },
          { url: "/users/roles", title: "권한 관리" },
          { url: "/users/groups", title: "그룹 관리" },
        ],
      },
      {
        url: "/events",
        title: "이벤트 관리",
        icon: <Calendar />,
        subMenu: [
          { url: "/events/list", title: "이벤트 목록" },
          { url: "/events/create", title: "이벤트 생성" },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "모든 메뉴가 서브메뉴를 가진 구조입니다.",
      },
    },
  },
};

export const WithoutIcons: Story = {
  render: (args) => {
    const [selectedUrl, setSelectedUrl] = useState("/home");
    return (
      <div className="flex h-screen">
        <SideNavigation
          {...args}
          selectedUrl={selectedUrl}
          onMenuClick={setSelectedUrl}
        />
        <div className="flex-1 bg-gray-50 p-8">
          <h1 className="text-2xl font-bold">선택된 URL: {selectedUrl}</h1>
        </div>
      </div>
    );
  },
  args: {
    title: "아이콘 없는 메뉴",
    menus: [
      { url: "/home", title: "홈" },
      {
        url: "/users",
        title: "사용자 관리",
        subMenu: [
          { url: "/users/list", title: "사용자 목록" },
          { url: "/users/roles", title: "권한 관리" },
        ],
      },
      { url: "/settings", title: "설정" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "아이콘 없이 텍스트만 표시하는 메뉴입니다.",
      },
    },
  },
};

export const ForJsdoc: Story = {
  render: (args) => {
    const [selectedUrl, setSelectedUrl] = useState("/home");
    return (
      <div className="relative flex h-150 overflow-hidden rounded-lg border border-gray-200">
        <SideNavigation
          {...args}
          selectedUrl={selectedUrl}
          onMenuClick={setSelectedUrl}
          headerSlot={
            <div className="flex flex-col gap-5 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC107]">
                  <span className="text-xl font-bold text-black">C</span>
                </div>
                <span className="text-xl font-bold text-white">캐시닥</span>
              </div>
            </div>
          }
        />
        <div className="flex-1 bg-gray-50 p-8">
          <h1 className="text-2xl font-bold">Content Area</h1>
        </div>
      </div>
    );
  },
  args: {
    menus: sampleMenus,
  },
  parameters: {
    docs: { disable: true },
    layout: "centered",
  },
};
