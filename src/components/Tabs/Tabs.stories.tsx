import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "동일 영역에 여러 콘텐츠 패널을 전환해 보여주는 탭. Radix Tabs primitive 기반으로 키보드/ARIA 자동 처리.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="mb-2 text-[12px] font-medium text-cms-gray-550">
      {label}
    </div>
    {children}
  </div>
);

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Section label="기본 · 2개 탭">
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
      </Section>

      <Section label="여러 탭">
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
      </Section>

      <Section label="Disabled 포함">
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
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
