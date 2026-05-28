import type { Meta, StoryObj } from "@storybook/react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableExpandableRow,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const meta: Meta<typeof Table> = {
  title: "Data Display/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "행과 열로 데이터를 표시하는 테이블. Compound Component 패턴으로 Header/Body/Row/Cell을 조합합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    striped: { control: "boolean" },
    hoverable: { control: "boolean" },
    bordered: { control: "boolean" },
    compact: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleUsers = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "사용자" },
  { id: 4, name: "박민수", email: "park@example.com", role: "편집자" },
];

const orders = [
  { id: "ORD-001", customer: "홍길동", amount: 150000, status: "완료" },
  { id: "ORD-002", customer: "김철수", amount: 89000, status: "배송중" },
  { id: "ORD-003", customer: "이영희", amount: 230000, status: "처리중" },
];

const expandableOrders = [
  {
    id: "ORD-1001",
    customer: "홍길동",
    total: "150,000원",
    items: [
      { name: "노트북", qty: 1, price: "1,200,000원" },
      { name: "마우스", qty: 2, price: "35,000원" },
    ],
  },
  {
    id: "ORD-1002",
    customer: "김철수",
    total: "89,000원",
    items: [{ name: "키보드", qty: 1, price: "89,000원" }],
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

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={cn(
      "inline-block rounded-cms-sm px-2 py-0.5 text-[11px] font-semibold",
      status === "완료" && "bg-cms-green-50 text-cms-green-600",
      status === "배송중" && "bg-cms-blue-50 text-cms-blue-700",
      status === "처리중" && "bg-cms-orange-50 text-cms-orange-500",
    )}
  >
    {status}
  </span>
);

const SelectionTable = () => {
  const [selected, setSelected] = useState<Set<number>>(new Set([2]));
  const toggle = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  return (
    <Table hoverable bordered>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10" aria-hidden />
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleUsers.map((u) => (
          <TableRow key={u.id} selected={selected.has(u.id)}>
            <TableCell>
              <Checkbox
                checked={selected.has(u.id)}
                onCheckedChange={() => toggle(u.id)}
              />
            </TableCell>
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Section label="기본">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>역할</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleUsers.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      <Section label="Striped + Hoverable + Bordered + Caption + Footer">
        <Table striped hoverable bordered>
          <TableCaption>2026년 5월 주문 내역</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>주문번호</TableHead>
              <TableHead>고객명</TableHead>
              <TableHead align="right">금액</TableHead>
              <TableHead>상태</TableHead>
              <TableHead align="center">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono">{o.id}</TableCell>
                <TableCell>{o.customer}</TableCell>
                <TableCell align="right">
                  {o.amount.toLocaleString()}원
                </TableCell>
                <TableCell>
                  <StatusBadge status={o.status} />
                </TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>합계</TableCell>
              <TableCell align="right" className="font-bold">
                {orders
                  .reduce((s, o) => s + o.amount, 0)
                  .toLocaleString()}원
              </TableCell>
              <TableCell colSpan={2} />
            </TableRow>
          </TableFooter>
        </Table>
      </Section>

      <Section label="Compact">
        <Table compact bordered>
          <TableHeader>
            <TableRow>
              <TableHead>코드</TableHead>
              <TableHead>이름</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>KR</TableCell>
              <TableCell>대한민국</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>JP</TableCell>
              <TableCell>일본</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      <Section label="선택된 행 (selected)">
        <SelectionTable />
      </Section>

      <Section label="Expandable rows">
        <Table hoverable>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" aria-hidden />
              <TableHead>주문번호</TableHead>
              <TableHead>고객명</TableHead>
              <TableHead align="right">합계</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expandableOrders.map((order) => (
              <TableExpandableRow
                key={order.id}
                defaultExpanded={order.id === "ORD-1001"}
                expandedContent={
                  <Table compact bordered>
                    <TableHeader>
                      <TableRow>
                        <TableHead>상품명</TableHead>
                        <TableHead align="right">수량</TableHead>
                        <TableHead align="right">단가</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align="right">{item.qty}</TableCell>
                          <TableCell align="right">{item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                }
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell align="right">{order.total}</TableCell>
              </TableExpandableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
