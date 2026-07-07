import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BarChart,
  Calendar,
  FileText,
  Home,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "../SideNavigation/SideNavigation";
import { SideNavigation } from "../SideNavigation/SideNavigation";
import { ContentArea } from "../ContentArea/ContentArea";
import { Layout } from "./Layout";

const meta: Meta = {
  title: "Layout/Layout",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "사이드바와 본문을 가로로 배치하는 어드민 페이지 셸. Layout.Root/Sidebar/Main 복합 컴포넌트로 구성됩니다.",
      },
    },
  },
  tags: ["autodocs"],
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
  { url: "/settings", title: "설정", icon: <Settings /> },
];

const Demo = () => {
  const [selected, setSelected] = useState("/events/list");
  return (
    <Layout.Root>
      <Layout.Sidebar>
        <SideNavigation
          title="관리자 메뉴"
          menus={sampleMenus}
          selectedUrl={selected}
          onMenuClick={setSelected}
        />
      </Layout.Sidebar>
      <Layout.Main className="p-6">
        <ContentArea>
          <h2 className="mb-4 text-base font-bold">이벤트 목록</h2>
          <p className="text-sm text-cms-gray-700">
            선택된 URL: <span className="font-mono">{selected}</span>
          </p>
          <p className="mt-2 text-sm text-cms-gray-550">
            본문은 ContentArea로 감싸 플랫 카드 형태로 보여집니다.
          </p>
        </ContentArea>
      </Layout.Main>
    </Layout.Root>
  );
};

export const Showcase: Story = {
  render: () => <Demo />,
};

export const ForJsdoc: Story = Showcase;
