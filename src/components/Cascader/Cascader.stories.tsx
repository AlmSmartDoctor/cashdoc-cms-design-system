import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Cascader } from "./";
import type { CascaderOption } from "./";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";

const meta: Meta<typeof Cascader> = {
  title: "Forms/Cascader",
  component: Cascader,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "상위 선택에 따라 하위 선택지가 바뀌는 계층형(캐스케이딩) 선택 " +
          "컴포넌트. Radix Popover 기반 멀티컬럼 패널.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      table: { defaultValue: { summary: "default" } },
    },
    expandTrigger: {
      control: "inline-radio",
      options: ["hover", "click"],
      table: { defaultValue: { summary: "hover" } },
    },
    changeOnSelect: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    label: { control: "text" },
    error: { control: "text" },
    helperText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const regionOptions: CascaderOption[] = [
  {
    value: "seoul",
    label: "서울특별시",
    children: [
      {
        value: "gangnam",
        label: "강남구",
        children: [
          { value: "yeoksam", label: "역삼동" },
          { value: "samsung", label: "삼성동" },
          { value: "cheongdam", label: "청담동" },
        ],
      },
      {
        value: "seocho",
        label: "서초구",
        children: [
          { value: "seocho-dong", label: "서초동" },
          { value: "banpo", label: "반포동" },
        ],
      },
      {
        value: "songpa",
        label: "송파구",
        children: [
          { value: "jamsil", label: "잠실동" },
          { value: "garak", label: "가락동" },
        ],
      },
    ],
  },
  {
    value: "gyeonggi",
    label: "경기도",
    children: [
      {
        value: "seongnam",
        label: "성남시",
        children: [
          { value: "bundang", label: "분당구" },
          { value: "sujeong", label: "수정구" },
        ],
      },
      {
        value: "suwon",
        label: "수원시",
        children: [
          { value: "yeongtong", label: "영통구" },
          { value: "paldal", label: "팔달구" },
        ],
      },
    ],
  },
  {
    value: "busan",
    label: "부산광역시",
    disabled: true,
    children: [{ value: "haeundae", label: "해운대구" }],
  },
];

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <span className="text-[12px] font-medium text-cms-gray-550">{label}</span>
    {children}
  </div>
);

type CtrlProps = Omit<
  React.ComponentProps<typeof Cascader>,
  "value" | "onChange" | "options"
>;

const Ctrl = (props: CtrlProps) => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Cascader
      {...props}
      options={regionOptions}
      value={value}
      onChange={(next) => setValue(next)}
    />
  );
};

/**
 * 기본/필수/에러/도움말/변형/사이즈와 changeOnSelect·expandTrigger 조합을
 * 한눈에 보여주는 쇼케이스입니다.
 */
export const Showcase: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5">
      <Section label="기본 (leaf 선택)">
        <Ctrl label="지역" placeholder="지역을 선택하세요" />
      </Section>
      <Section label="필수 (required)">
        <Ctrl label="지역" required placeholder="지역을 선택하세요" />
      </Section>
      <Section label="도움말 (helperText)">
        <Ctrl
          label="지역"
          helperText="시/도 → 구/군 → 동 순으로 선택하세요"
          placeholder="지역을 선택하세요"
        />
      </Section>
      <Section label="에러 (error)">
        <Ctrl
          label="지역"
          error="지역을 선택하는 것은 필수입니다"
          placeholder="지역을 선택하세요"
        />
      </Section>
      <Section label="changeOnSelect (중간 노드도 확정)">
        <Ctrl label="지역" changeOnSelect placeholder="아무 단계나 선택" />
      </Section>
      <Section label="expandTrigger = click">
        <Ctrl label="지역" expandTrigger="click" placeholder="클릭으로 펼침" />
      </Section>
      <Section label="Variant · outline">
        <Ctrl label="지역" variant="outline" placeholder="Outline" />
      </Section>
      <Section label="Size sm / lg + Disabled">
        <div className="flex flex-col gap-2">
          <Ctrl size="sm" placeholder="sm" />
          <Ctrl size="lg" placeholder="lg" />
          <Ctrl disabled placeholder="Disabled" />
        </div>
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;

/* ── 깊이가 서로 다른 가지 공존 ── */

const mixedDepthOptions: CascaderOption[] = [
  {
    value: "seoul",
    label: "서울특별시",
    children: [
      {
        value: "gangnam",
        label: "강남구",
        children: [
          { value: "yeoksam", label: "역삼동" },
          { value: "samsung", label: "삼성동" },
        ],
      },
      { value: "jung", label: "중구" }, // 2단(구가 leaf)
    ],
  },
  { value: "sejong", label: "세종특별자치시" }, // 1단(시가 leaf)
  {
    value: "jeju",
    label: "제주특별자치도",
    children: [
      { value: "jeju-si", label: "제주시" }, // 2단
      { value: "seogwipo", label: "서귀포시" },
    ],
  },
];

const MixedDepthCtrl = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Cascader
      label="지역 (가지별 깊이 다름)"
      options={mixedDepthOptions}
      value={value}
      onChange={(next) => setValue(next)}
      placeholder="세종=1단, 제주=2단, 서울강남=3단"
    />
  );
};

/**
 * 가지마다 깊이가 달라도 한 트리에서 공존합니다. 자식이 없는 노드는
 * leaf로 취급되어 클릭 즉시 확정됩니다(세종=1단, 제주시=2단, 역삼동=3단).
 */
export const MixedDepth: Story = {
  render: () => (
    <div className="max-w-sm">
      <MixedDepthCtrl />
    </div>
  ),
};

/* ── 깊은 트리(4~5단) + 가지별 다른 깊이·개수 ── */

const deepOptions: CascaderOption[] = [
  {
    value: "electronics",
    label: "전자제품",
    children: [
      {
        value: "computer",
        label: "컴퓨터",
        children: [
          {
            value: "laptop",
            label: "노트북",
            children: [
              {
                value: "gaming",
                label: "게이밍",
                children: [
                  { value: "17in", label: "17인치" }, // 5단
                  { value: "15in", label: "15인치" },
                  { value: "14in", label: "14인치" },
                ],
              },
              { value: "office", label: "사무용" }, // 4단
              { value: "ultrabook", label: "울트라북" },
            ],
          },
          { value: "desktop", label: "데스크탑" }, // 3단
        ],
      },
      {
        value: "mobile",
        label: "모바일",
        children: [
          { value: "phone", label: "스마트폰" }, // 3단
          { value: "tablet", label: "태블릿" },
        ],
      },
      { value: "camera", label: "카메라" }, // 2단
    ],
  },
  {
    value: "clothing",
    label: "의류",
    children: [
      {
        value: "men",
        label: "남성",
        children: [
          { value: "top", label: "상의" }, // 3단
          { value: "bottom", label: "하의" },
          { value: "outer", label: "아우터" },
          { value: "acc", label: "액세서리" },
        ],
      },
      { value: "women", label: "여성" }, // 2단
    ],
  },
  { value: "books", label: "도서" }, // 1단(leaf)
];

const DeepCtrl = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Cascader
      label="카테고리 (1~5단 혼재)"
      options={deepOptions}
      value={value}
      onChange={(next) => setValue(next)}
      placeholder="전자>컴퓨터>노트북>게이밍>17인치 (5단)"
    />
  );
};

/**
 * 최대 5단 깊이에, 가지마다 깊이(1~5단)와 항목 개수가 다른 트리입니다.
 * 각 컬럼은 그 컬럼을 연 부모 항목의 높이에서 시작합니다(flyout-down).
 */
export const Deep: Story = {
  render: () => (
    <div className="max-w-sm">
      <DeepCtrl />
    </div>
  ),
};

/* ── 고정 너비 + 옆 요소 정렬 ── */

const dbOptions = [
  { value: "all", label: "전체" },
  { value: "a", label: "A DB" },
  { value: "b", label: "B DB" },
];

const assignOptions = [
  { value: "all", label: "전체" },
  { value: "mine", label: "내 배정" },
  { value: "none", label: "미배정" },
];

const FixedWidthRowDemo = () => {
  const [status, setStatus] = useState<string[]>([]);
  const [db, setDb] = useState("all");
  const [assign, setAssign] = useState("all");
  return (
    <div className="flex items-center gap-1">
      {/*
        Dropdown은 chevron이 바깥 wrapper에 absolute 배치라, 고정폭을
        트리거 button에 직접 주면 chevron이 박스 밖으로 분리됨. 그래서
        폭은 감싸는 div로 준다(Dropdown outer가 w-full로 채움). Cascader는
        chevron이 트리거 in-flow라 className으로 폭을 직접 줘도 정렬 유지.
      */}
      <div className="w-21">
        <Dropdown
          options={dbOptions}
          value={db}
          onValueChange={setDb}
          multiple={false}
          variant="outline"
          size="sm"
        />
      </div>
      <Cascader
        options={regionOptions}
        value={status}
        onChange={(next) => setStatus(next)}
        variant="outline"
        size="sm"
        className="w-32"
        placeholder="상담 상태"
      />
      <div className="w-33">
        <Dropdown
          options={assignOptions}
          value={assign}
          onValueChange={setAssign}
          multiple={false}
          variant="outline"
          size="sm"
        />
      </div>
    </div>
  );
};

/**
 * `className`으로 넘긴 `width`가 트리거에 그대로 반영됩니다. 짧은 값(예:
 * "대기")을 선택해도 트리거가 `w-32`(128px)를 지키며, 옆의 `Dropdown`들과
 * 너비·정렬이 어긋나지 않습니다.
 *
 * 회귀 방지: 이전에는 `className`이 바깥 wrapper에만 붙어 트리거 button이
 * flex-shrink로 `128px` 밑으로 눌렸습니다. 이제 트리거 button에 직접
 * 적용되어 shrink 대상에서 제외됩니다.
 */
export const FixedWidthWithSiblings: Story = {
  name: "고정 너비 + 옆 Dropdown 정렬",
  render: () => <FixedWidthRowDemo />,
};

/* ── 모달 내부 ── */

const InModalDemo = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal open={open} onOpenChange={setOpen} title="지역 선택">
        <Cascader
          label="지역"
          options={regionOptions}
          value={value}
          onChange={(next) => setValue(next)}
          placeholder="지역을 선택하세요"
        />
      </Modal>
    </>
  );
};

/**
 * Modal 내부에서도 정상 동작합니다. Radix Dialog가 `body`에
 * `pointer-events: none`을 적용하지만, Cascader가 `usePortalContainer`로
 * 모달 콘텐츠에 portal되어 클릭이 막히지 않습니다.
 */
export const InModal: Story = {
  name: "모달 내부",
  render: () => <InModalDemo />,
};
