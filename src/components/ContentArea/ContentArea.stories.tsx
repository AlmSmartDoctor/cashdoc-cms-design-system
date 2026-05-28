import type { Meta, StoryObj } from "@storybook/react";
import { ContentArea } from "./ContentArea";

const meta: Meta<typeof ContentArea> = {
  title: "Layout/ContentArea",
  component: ContentArea,
  parameters: {
    layout: "padded",
    backgrounds: { default: "gray" },
    docs: {
      description: {
        component:
          "흰색 배경 · 1px 외곽선 · 8px 라운드의 플랫 카드 컨테이너. 단일 컨테이너로 사용하거나 Header/Body/Footer 서브 컴포넌트로 조립합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
    },
  },
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
    <div className="flex flex-col gap-6 bg-cms-gray-50 p-6">
      <Section label="기본 (padding=md)">
        <ContentArea>
          <h3 className="mb-2 text-sm font-bold">이벤트 목록</h3>
          <p className="text-sm text-cms-gray-700">
            기본 카드 컨테이너. 그림자 없이 외곽선만으로 영역을 구분합니다.
          </p>
        </ContentArea>
      </Section>

      <Section label="padding=none (표가 카드 전체를 채울 때)">
        <ContentArea padding="none">
          <div className="border-b border-cms-gray-200 p-4 text-sm font-bold">
            헤더
          </div>
          <div className="p-4 text-sm text-cms-gray-700">
            내부에서 padding을 직접 다룰 때 사용합니다.
          </div>
        </ContentArea>
      </Section>

      <Section label="padding=sm / lg">
        <div className="flex flex-col gap-4">
          <ContentArea padding="sm">
            <p className="text-sm">padding=sm (16px)</p>
          </ContentArea>
          <ContentArea padding="lg">
            <p className="text-sm">padding=lg (32px)</p>
          </ContentArea>
        </div>
      </Section>
    </div>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <div className="bg-cms-gray-50 p-6">
      <ContentArea padding="none">
        <ContentArea.Header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`
                rounded-cms-sm bg-cms-gray-900 px-2 py-1
                text-[11px] font-semibold text-cms-white
              `}
            >
              전체 47
            </span>
            <span
              className={`
                rounded-cms-sm bg-cms-gray-100 px-2 py-1
                text-[11px] font-medium text-cms-gray-700
              `}
            >
              노출 중 12
            </span>
            <span
              className={`
                rounded-cms-sm bg-cms-gray-100 px-2 py-1
                text-[11px] font-medium text-cms-gray-700
              `}
            >
              종료 32
            </span>
          </div>
          <input
            type="search"
            placeholder="검색"
            className={`
              h-8 rounded-cms-sm border border-cms-gray-200 px-3 text-sm
              outline-none placeholder:text-cms-gray-450
            `}
          />
        </ContentArea.Header>
        <ContentArea.Body>
          <table className="w-full text-sm">
            <thead className="border-b border-cms-gray-200 text-left">
              <tr className="text-[12px] text-cms-gray-550">
                <th className="px-5 py-3 font-medium">대메뉴</th>
                <th className="px-5 py-3 font-medium">중메뉴</th>
                <th className="px-5 py-3 font-medium">노출기간</th>
              </tr>
            </thead>
            <tbody className="text-cms-gray-800">
              <tr className="border-b border-cms-gray-150">
                <td className="px-5 py-3">메디캐시 관리</td>
                <td className="px-5 py-3">메디캐시 통계</td>
                <td className="px-5 py-3">2026-01-01 ~ 2026-01-31</td>
              </tr>
              <tr className="border-b border-cms-gray-150">
                <td className="px-5 py-3">통계 관리</td>
                <td className="px-5 py-3">기간별 이벤트 인기도</td>
                <td className="px-5 py-3">2026-01-12 ~ 2026-08-29</td>
              </tr>
            </tbody>
          </table>
        </ContentArea.Body>
        <ContentArea.Footer className="flex items-center justify-between">
          <span className="text-[12px] text-cms-gray-550">
            10건 / 전체 47건
          </span>
          <div className="text-[12px] text-cms-gray-700">
            1 2 3 4 5
          </div>
        </ContentArea.Footer>
      </ContentArea>
    </div>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <div className="bg-cms-gray-50 p-6">
      <ContentArea padding="none">
        <ContentArea.Header className="flex items-center justify-between">
          <h2 className="text-sm font-bold">이벤트 목록</h2>
          <button className={`
            h-7 rounded-cms-sm border border-cms-gray-250 px-3 text-[12px]
            font-semibold text-cms-gray-850 hover:bg-cms-gray-50
          `}>
            새로 만들기
          </button>
        </ContentArea.Header>
        <ContentArea.Body>
          <div className="p-5 text-sm text-cms-gray-700">
            본문 영역입니다.
          </div>
        </ContentArea.Body>
      </ContentArea>
    </div>
  ),
};

export const ForJsdoc: Story = {
  render: () => (
    <div className="bg-cms-gray-50 p-6">
      <ContentArea padding="none">
        <ContentArea.Header className="flex items-center justify-between">
          <h2 className="text-sm font-bold">이벤트 목록</h2>
          <span className="text-[12px] text-cms-gray-550">47건</span>
        </ContentArea.Header>
        <ContentArea.Body>
          <div className="p-5 text-sm text-cms-gray-700">
            플랫 카드 컨테이너에 Header / Body / Footer를 조립한 모습입니다.
          </div>
        </ContentArea.Body>
        <ContentArea.Footer className="flex items-center justify-between">
          <span className="text-[12px] text-cms-gray-550">
            10건 / 전체 47건
          </span>
          <div className="text-[12px] text-cms-gray-700">1 2 3 4 5</div>
        </ContentArea.Footer>
      </ContentArea>
    </div>
  ),
};
