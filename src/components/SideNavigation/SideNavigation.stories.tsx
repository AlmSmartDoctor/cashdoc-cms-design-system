import type { Meta, StoryObj } from "@storybook/react";
import {
  BarChart,
  Calendar,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "./SideNavigation";
import { SideNavigation } from "./SideNavigation";

const meta: Meta<typeof SideNavigation> = {
  title: "Navigation/SideNavigation",
  component: SideNavigation,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "다크 surface + 브랜드 옐로우 액센트의 사이드 네비게이션. Radix Accordion으로 서브메뉴를 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    selectedUrl: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMenus: MenuItem[] = [
  { url: "/home", title: "홈", icon: <Home /> },
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
  { url: "/reports", title: "리포트", icon: <FileText /> },
  { url: "/analytics", title: "분석", icon: <BarChart /> },
  {
    url: "/reviews",
    title: "후기 관리",
    icon: <Star />,
    subMenu: [
      { url: "/reviews/list", title: "후기 목록" },
      { url: "/reviews/pending", title: "승인 대기" },
    ],
  },
  { url: "/qna", title: "Q&A 관리", icon: <MessageSquare /> },
  { url: "/settings", title: "설정", icon: <Settings /> },
];

const Demo = ({
  initial = "/users/list",
  ...props
}: Omit<
  React.ComponentProps<typeof SideNavigation>,
  "selectedUrl" | "onMenuClick"
> & { initial?: string }) => {
  const [selected, setSelected] = useState(initial);
  return (
    <div className="flex h-screen">
      <SideNavigation
        {...props}
        selectedUrl={selected}
        onMenuClick={setSelected}
      />
      <div className="flex-1 bg-cms-gray-50 p-8">
        <h1 className="text-xl font-bold text-cms-gray-900">
          선택된 URL: {selected}
        </h1>
        <p className="mt-2 text-sm text-cms-gray-600">
          왼쪽 메뉴를 클릭해 보세요. 서브메뉴는 펼침/접기가 가능합니다.
        </p>
      </div>
    </div>
  );
};

export const Showcase: Story = {
  render: () => <Demo title="관리자 메뉴" menus={sampleMenus} />,
};

export const Minimal: Story = {
  render: () => (
    <Demo
      title="간단한 메뉴"
      menus={[
        { url: "/home", title: "홈", icon: <Home /> },
        { url: "/settings", title: "설정", icon: <Settings /> },
      ]}
      initial="/home"
    />
  ),
};

const footerButtonClass =
  "h-9 flex-1 rounded-lg border border-white/40 text-sm font-medium text-white";

export const WithFooter: Story = {
  render: () => (
    <Demo
      title="관리자 메뉴"
      menus={sampleMenus}
      footerSlot={
        <div className="flex items-center gap-3 px-6 pt-3 pb-6">
          <button type="button" className={footerButtonClass}>
            로그아웃
          </button>
          <button type="button" className={footerButtonClass}>
            계정 설정
          </button>
        </div>
      }
    />
  ),
};

export const ForJsdoc: Story = Showcase;
