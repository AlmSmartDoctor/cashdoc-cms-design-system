import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";
import { Switch } from "../Switch";

const meta = {
  title: "Data Display/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "여러 섹션을 접어 두고 필요한 것만 펼쳐 보는 접이식 컴포넌트. Radix Accordion primitive 기반으로 키보드/ARIA와 펼침 애니메이션이 자동 처리됩니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: { type: "single" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["bordered", "separated"],
      table: { defaultValue: { summary: "bordered" } },
    },
    type: {
      control: "inline-radio",
      options: ["single", "multiple"],
    },
    collapsible: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Accordion>;

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

const SwitchRow = ({ label }: { label: string }) => {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[13px] text-cms-gray-600">{label}</span>
      <Switch checked={on} onCheckedChange={setOn} />
    </div>
  );
};

export const Showcase: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-8">
      <Section label="bordered · multiple (설정 폼 + Switch)">
        <Accordion type="multiple" defaultValue={["review"]}>
          <AccordionItem value="review">
            <AccordionTrigger>후기등록</AccordionTrigger>
            <AccordionContent>
              <SwitchRow label="알림톡" />
              <SwitchRow label="이메일" />
              <SwitchRow label="문자" />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="qna">
            <AccordionTrigger>Q&A등록</AccordionTrigger>
            <AccordionContent>
              <SwitchRow label="알림톡" />
              <SwitchRow label="이메일" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section label="separated · single + collapsible (FAQ)">
        <Accordion type="single" collapsible variant="separated">
          <AccordionItem value="q1">
            <AccordionTrigger>배송은 얼마나 걸리나요?</AccordionTrigger>
            <AccordionContent>영업일 기준 2~3일 소요됩니다.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>교환·반품이 가능한가요?</AccordionTrigger>
            <AccordionContent>수령 후 7일 이내 가능합니다.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section label="disabled 포함">
        <Accordion type="single" collapsible>
          <AccordionItem value="a">
            <AccordionTrigger>활성 섹션</AccordionTrigger>
            <AccordionContent>펼칠 수 있는 섹션입니다.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b" disabled>
            <AccordionTrigger>비활성 섹션</AccordionTrigger>
            <AccordionContent>
              이 섹션은 비활성화되어 있습니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>
    </div>
  ),
};

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="payment">
        <AccordionTrigger>결제 정보</AccordionTrigger>
        <AccordionContent>카드/계좌이체로 결제할 수 있습니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger>배송 정보</AccordionTrigger>
        <AccordionContent>영업일 기준 2~3일 소요됩니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="refund">
        <AccordionTrigger>환불 정책</AccordionTrigger>
        <AccordionContent>수령 후 7일 이내 환불 가능합니다.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={[]} className="w-96">
      <AccordionItem value="review">
        <AccordionTrigger>후기등록</AccordionTrigger>
        <AccordionContent>
          <SwitchRow label="알림톡" />
          <SwitchRow label="이메일" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="qna">
        <AccordionTrigger>Q&A등록</AccordionTrigger>
        <AccordionContent>
          <SwitchRow label="알림톡" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Separated: Story = {
  render: () => (
    <Accordion
      type="multiple"
      variant="separated"
      defaultValue={["a"]}
      className="w-96"
    >
      <AccordionItem value="a">
        <AccordionTrigger>개별 박스 A</AccordionTrigger>
        <AccordionContent>아이템마다 분리된 박스입니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>개별 박스 B</AccordionTrigger>
        <AccordionContent>간격을 두고 배치됩니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>개별 박스 C</AccordionTrigger>
        <AccordionContent>독립적으로 펼칠 수 있습니다.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="active">
        <AccordionTrigger>활성 섹션</AccordionTrigger>
        <AccordionContent>펼칠 수 있는 섹션입니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="disabled" disabled>
        <AccordionTrigger>비활성 섹션</AccordionTrigger>
        <AccordionContent>비활성화된 섹션입니다.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

const ControlledDemo = () => {
  const [value, setValue] = useState("");
  return (
    <div className="flex w-96 flex-col gap-3">
      <p className="text-[12px] text-cms-gray-550">
        열린 항목:{" "}
        <span
          data-testid="open-value"
          className="font-medium text-cms-gray-800"
        >
          {value || "없음"}
        </span>
      </p>
      <Accordion
        type="single"
        collapsible
        value={value}
        onValueChange={setValue}
      >
        <AccordionItem value="payment">
          <AccordionTrigger>결제 정보</AccordionTrigger>
          <AccordionContent>결제 관련 내용입니다.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger>배송 정보</AccordionTrigger>
          <AccordionContent>배송 관련 내용입니다.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const LongContent: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="terms" className="w-96">
      <AccordionItem value="terms">
        <AccordionTrigger>이용약관 전문</AccordionTrigger>
        <AccordionContent>
          <p className="leading-relaxed">
            제1조(목적) 본 약관은 회사가 제공하는 서비스의 이용 조건 및 절차,
            회사와 회원 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
            제2조(정의) 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            제3조(약관의 효력 및 변경) 회사는 관련 법령을 위배하지 않는 범위에서
            본 약관을 개정할 수 있습니다.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="privacy">
        <AccordionTrigger>개인정보 처리방침</AccordionTrigger>
        <AccordionContent>
          <p className="leading-relaxed">
            회사는 이용자의 개인정보를 중요시하며, 관련 법령을 준수합니다.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const ForJsdoc: Story = Showcase;
