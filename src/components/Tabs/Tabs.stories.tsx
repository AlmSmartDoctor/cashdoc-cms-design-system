import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "동일한 영역에 여러 콘텐츠 패널을 전환해 보여주는 탭 컴포넌트입니다. Radix UI Tabs primitive를 기반으로 키보드 내비게이션과 ARIA가 자동 처리됩니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="paid" className="w-150">
      <TabsList>
        <TabsTrigger value="free">무료 포인트</TabsTrigger>
        <TabsTrigger value="paid">유료 포인트</TabsTrigger>
      </TabsList>
      <TabsContent value="free">
        <p className="text-sm text-cms-gray-700">무료 포인트 적립·차감 내역</p>
      </TabsContent>
      <TabsContent value="paid">
        <p className="text-sm text-cms-gray-700">유료 포인트 적립·차감 내역</p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본 탭. 활성 탭에 검은색 underline indicator가 표시됩니다.",
      },
    },
  },
};

export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-200">
      <TabsList>
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="analytics">통계</TabsTrigger>
        <TabsTrigger value="reports">리포트</TabsTrigger>
        <TabsTrigger value="settings">설정</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-cms-gray-700">전체 개요 대시보드</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="text-sm text-cms-gray-700">상세 통계 데이터</p>
      </TabsContent>
      <TabsContent value="reports">
        <p className="text-sm text-cms-gray-700">기간별 리포트</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-cms-gray-700">설정 패널</p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "여러 탭을 사용하는 예시. 2~6개 범위 권장.",
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const ControlledTabs = () => {
      const [value, setValue] = useState("free");
      return (
        <div className="flex w-150 flex-col gap-3">
          <p className="text-xs text-cms-gray-600">
            현재 선택값: <code>{value}</code>
          </p>
          <Tabs value={value} onValueChange={setValue}>
            <TabsList>
              <TabsTrigger value="free">무료 포인트</TabsTrigger>
              <TabsTrigger value="paid">유료 포인트</TabsTrigger>
            </TabsList>
            <TabsContent value="free">
              <p className="text-sm text-cms-gray-700">무료 포인트 내역</p>
            </TabsContent>
            <TabsContent value="paid">
              <p className="text-sm text-cms-gray-700">유료 포인트 내역</p>
            </TabsContent>
          </Tabs>
        </div>
      );
    };
    return <ControlledTabs />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "`value` + `onValueChange`로 controlled 사용. 외부 상태와 동기화가 필요할 때 사용합니다.",
      },
    },
  },
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-150">
      <TabsList>
        <TabsTrigger value="active">활성</TabsTrigger>
        <TabsTrigger value="pending">대기</TabsTrigger>
        <TabsTrigger value="archived" disabled>
          보관됨 (비활성)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <p className="text-sm text-cms-gray-700">활성 항목</p>
      </TabsContent>
      <TabsContent value="pending">
        <p className="text-sm text-cms-gray-700">대기 중 항목</p>
      </TabsContent>
      <TabsContent value="archived">
        <p className="text-sm text-cms-gray-700">보관된 항목</p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`disabled` prop으로 특정 탭을 비활성화할 수 있습니다. 키보드 내비게이션에서도 건너뜁니다.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="mb-3 text-sm font-semibold">기본 (2개 탭)</h3>
        <Tabs defaultValue="paid" className="w-150">
          <TabsList>
            <TabsTrigger value="free">무료 포인트</TabsTrigger>
            <TabsTrigger value="paid">유료 포인트</TabsTrigger>
          </TabsList>
          <TabsContent value="free">
            <p className="text-sm text-cms-gray-700">무료 포인트 내역</p>
          </TabsContent>
          <TabsContent value="paid">
            <p className="text-sm text-cms-gray-700">유료 포인트 내역</p>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">여러 탭 (4개)</h3>
        <Tabs defaultValue="overview" className="w-200">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="analytics">통계</TabsTrigger>
            <TabsTrigger value="reports">리포트</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-sm text-cms-gray-700">개요 대시보드</p>
          </TabsContent>
          <TabsContent value="analytics">
            <p className="text-sm text-cms-gray-700">통계</p>
          </TabsContent>
          <TabsContent value="reports">
            <p className="text-sm text-cms-gray-700">리포트</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-sm text-cms-gray-700">설정</p>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Disabled 포함</h3>
        <Tabs defaultValue="active" className="w-150">
          <TabsList>
            <TabsTrigger value="active">활성</TabsTrigger>
            <TabsTrigger value="pending">대기</TabsTrigger>
            <TabsTrigger value="archived" disabled>
              보관됨
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <p className="text-sm text-cms-gray-700">활성 항목</p>
          </TabsContent>
          <TabsContent value="pending">
            <p className="text-sm text-cms-gray-700">대기 중 항목</p>
          </TabsContent>
          <TabsContent value="archived">
            <p className="text-sm text-cms-gray-700">보관된 항목</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs의 다양한 조합을 한눈에 보여줍니다.",
      },
    },
  },
};

export const ForJsdoc: Story = AllStates;
