import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { useState } from "react";
import { Button } from "../Button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "데이터를 행과 열로 구조화하여 표시하는 테이블 컴포넌트입니다. Compound Component 패턴을 사용하여 TableHeader, TableBody, TableRow, TableCell 등을 조합하여 유연하게 구성할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    striped: {
      control: "boolean",
      description: "zebra stripe 패턴을 적용합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    hoverable: {
      control: "boolean",
      description: "행에 마우스를 올렸을 때 hover 효과를 적용합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    bordered: {
      control: "boolean",
      description: "테이블에 테두리를 표시합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    compact: {
      control: "boolean",
      description: "좁은 padding을 적용합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
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

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: "기본 테이블입니다. 최소한의 스타일만 적용되어 있습니다.",
      },
    },
  },
};

export const Striped: Story = {
  render: () => (
    <Table striped>
      <TableHeader>
        <TableRow>
          <TableHead>제품명</TableHead>
          <TableHead>카테고리</TableHead>
          <TableHead align="right">가격</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>노트북</TableCell>
          <TableCell>전자기기</TableCell>
          <TableCell align="right">1,200,000원</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>마우스</TableCell>
          <TableCell>주변기기</TableCell>
          <TableCell align="right">35,000원</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>키보드</TableCell>
          <TableCell>주변기기</TableCell>
          <TableCell align="right">89,000원</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>모니터</TableCell>
          <TableCell>전자기기</TableCell>
          <TableCell align="right">450,000원</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>헤드셋</TableCell>
          <TableCell>오디오</TableCell>
          <TableCell align="right">120,000원</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "striped prop을 true로 설정하면 짝수 행에 배경색이 적용되어 가독성이 향상됩니다.",
      },
    },
  },
};

export const Hoverable: Story = {
  render: () => (
    <Table hoverable>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>작성자</TableHead>
          <TableHead>날짜</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>첫 번째 게시글</TableCell>
          <TableCell>홍길동</TableCell>
          <TableCell>2024-01-15</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>두 번째 게시글</TableCell>
          <TableCell>김철수</TableCell>
          <TableCell>2024-01-16</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>세 번째 게시글</TableCell>
          <TableCell>이영희</TableCell>
          <TableCell>2024-01-17</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "hoverable prop을 true로 설정하면 마우스를 올린 행에 하이라이트 효과가 적용됩니다.",
      },
    },
  },
};

export const Bordered: Story = {
  render: () => (
    <Table bordered>
      <TableHeader>
        <TableRow>
          <TableHead>국가</TableHead>
          <TableHead>수도</TableHead>
          <TableHead align="right">인구</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>대한민국</TableCell>
          <TableCell>서울</TableCell>
          <TableCell align="right">51,780,579</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>일본</TableCell>
          <TableCell>도쿄</TableCell>
          <TableCell align="right">125,124,989</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>중국</TableCell>
          <TableCell>베이징</TableCell>
          <TableCell align="right">1,411,750,000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: "bordered prop을 true로 설정하면 테이블 외곽에 테두리가 표시됩니다.",
      },
    },
  },
};

export const Compact: Story = {
  render: () => (
    <Table compact>
      <TableHeader>
        <TableRow>
          <TableHead>코드</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>KR</TableCell>
          <TableCell>대한민국</TableCell>
          <TableCell>활성</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>JP</TableCell>
          <TableCell>일본</TableCell>
          <TableCell>활성</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>CN</TableCell>
          <TableCell>중국</TableCell>
          <TableCell>활성</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>US</TableCell>
          <TableCell>미국</TableCell>
          <TableCell>활성</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "compact prop을 true로 설정하면 셀의 padding이 줄어들어 더 많은 데이터를 표시할 수 있습니다.",
      },
    },
  },
};

export const WithSorting: Story = {
  render: () => {
    type SortKey = "name" | "price" | "stock";
    const [sortKey, setSortKey] = useState<SortKey>("name");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const products = [
      { id: 1, name: "노트북", price: 1200000, stock: 5 },
      { id: 2, name: "마우스", price: 35000, stock: 50 },
      { id: 3, name: "키보드", price: 89000, stock: 23 },
      { id: 4, name: "모니터", price: 450000, stock: 12 },
    ];

    const handleSort = (key: SortKey) => {
      if (sortKey === key) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setSortDirection("asc");
      }
    };

    const sortedProducts = [...products].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      const modifier = sortDirection === "asc" ? 1 : -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * modifier;
      }
      return ((aValue as number) - (bValue as number)) * modifier;
    });

    return (
      <Table hoverable>
        <TableHeader>
          <TableRow>
            <TableHead
              sortable
              sortDirection={sortKey === "name" ? sortDirection : null}
              onSort={() => handleSort("name")}
            >
              제품명
            </TableHead>
            <TableHead
              sortable
              sortDirection={sortKey === "price" ? sortDirection : null}
              onSort={() => handleSort("price")}
              align="right"
            >
              가격
            </TableHead>
            <TableHead
              sortable
              sortDirection={sortKey === "stock" ? sortDirection : null}
              onSort={() => handleSort("stock")}
              align="right"
            >
              재고
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">{product.price.toLocaleString()}원</TableCell>
              <TableCell align="right">{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "TableHead의 sortable prop과 sortDirection, onSort를 사용하여 정렬 기능을 구현할 수 있습니다. 헤더를 클릭하면 오름차순/내림차순으로 정렬됩니다.",
      },
    },
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<number | null>(2);

    return (
      <Table hoverable>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>부서</TableHead>
            <TableHead>직급</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            selected={selectedId === 1}
            onClick={() => setSelectedId(1)}
            className="cursor-pointer"
          >
            <TableCell>1</TableCell>
            <TableCell>홍길동</TableCell>
            <TableCell>개발팀</TableCell>
            <TableCell>팀장</TableCell>
          </TableRow>
          <TableRow
            selected={selectedId === 2}
            onClick={() => setSelectedId(2)}
            className="cursor-pointer"
          >
            <TableCell>2</TableCell>
            <TableCell>김철수</TableCell>
            <TableCell>디자인팀</TableCell>
            <TableCell>대리</TableCell>
          </TableRow>
          <TableRow
            selected={selectedId === 3}
            onClick={() => setSelectedId(3)}
            className="cursor-pointer"
          >
            <TableCell>3</TableCell>
            <TableCell>이영희</TableCell>
            <TableCell>마케팅팀</TableCell>
            <TableCell>과장</TableCell>
          </TableRow>
          <TableRow
            selected={selectedId === 4}
            onClick={() => setSelectedId(4)}
            className="cursor-pointer"
          >
            <TableCell>4</TableCell>
            <TableCell>박민수</TableCell>
            <TableCell>영업팀</TableCell>
            <TableCell>사원</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "TableRow의 selected prop을 사용하여 선택된 행을 강조 표시할 수 있습니다.",
      },
    },
  },
};

export const ComplexTable: Story = {
  render: () => {
    const orders = [
      { id: "ORD-001", customer: "홍길동", amount: 150000, status: "완료" },
      { id: "ORD-002", customer: "김철수", amount: 89000, status: "배송중" },
      { id: "ORD-003", customer: "이영희", amount: 230000, status: "완료" },
      { id: "ORD-004", customer: "박민수", amount: 45000, status: "처리중" },
      { id: "ORD-005", customer: "최지우", amount: 320000, status: "완료" },
    ];

    const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
    const completedAmount = orders
      .filter((o) => o.status === "완료")
      .reduce((sum, order) => sum + order.amount, 0);

    return (
      <Table striped hoverable bordered>
        <TableCaption>2024년 1월 주문 내역</TableCaption>
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
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell align="right">{order.amount.toLocaleString()}원</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-block px-2 py-1 text-xs rounded-full",
                    order.status === "완료" && "bg-green-100 text-green-800",
                    order.status === "배송중" && "bg-blue-100 text-blue-800",
                    order.status === "처리중" && "bg-yellow-100 text-yellow-800",
                  )}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-3 w-3" />
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
              {totalAmount.toLocaleString()}원
            </TableCell>
            <TableCell colSpan={2} />
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>완료된 주문 합계</TableCell>
            <TableCell align="right" className="font-bold">
              {completedAmount.toLocaleString()}원
            </TableCell>
            <TableCell colSpan={2} />
          </TableRow>
        </TableFooter>
      </Table>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "실제 애플리케이션에서 사용될 법한 복잡한 테이블입니다. Caption, Footer, 액션 버튼, 상태 배지 등을 포함합니다.",
      },
    },
  },
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const Responsive: Story = {
  render: () => {
    const wideData = [
      {
        id: 1,
        name: "홍길동",
        email: "hong@example.com",
        phone: "010-1234-5678",
        department: "개발팀",
        position: "팀장",
        joined: "2020-01-15",
        status: "재직중",
      },
      {
        id: 2,
        name: "김철수",
        email: "kim@example.com",
        phone: "010-2345-6789",
        department: "디자인팀",
        position: "대리",
        joined: "2021-03-20",
        status: "재직중",
      },
      {
        id: 3,
        name: "이영희",
        email: "lee@example.com",
        phone: "010-3456-7890",
        department: "마케팅팀",
        position: "과장",
        joined: "2019-05-10",
        status: "재직중",
      },
    ];

    return (
      <div className="max-w-4xl">
        <Table striped hoverable>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>전화번호</TableHead>
              <TableHead>부서</TableHead>
              <TableHead>직급</TableHead>
              <TableHead>입사일</TableHead>
              <TableHead>상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wideData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>{item.joined}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "열이 많은 테이블은 자동으로 스크롤 가능한 컨테이너로 래핑되어 모바일이나 좁은 화면에서도 사용할 수 있습니다.",
      },
    },
  },
};

export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>
        최근 7일간의 웹사이트 방문 통계입니다. 데이터는 매일 자정에 업데이트됩니다.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>날짜</TableHead>
          <TableHead align="right">방문자</TableHead>
          <TableHead align="right">페이지뷰</TableHead>
          <TableHead align="right">체류시간</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>2024-01-15</TableCell>
          <TableCell align="right">1,234</TableCell>
          <TableCell align="right">3,456</TableCell>
          <TableCell align="right">2m 34s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024-01-16</TableCell>
          <TableCell align="right">1,567</TableCell>
          <TableCell align="right">4,123</TableCell>
          <TableCell align="right">3m 12s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024-01-17</TableCell>
          <TableCell align="right">1,890</TableCell>
          <TableCell align="right">5,234</TableCell>
          <TableCell align="right">2m 56s</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TableCaption을 사용하여 테이블의 목적이나 데이터 출처를 설명할 수 있습니다. 접근성 향상에도 도움이 됩니다.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-semibold mb-3">기본 테이블</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>제품</TableHead>
              <TableHead align="right">가격</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>노트북</TableCell>
              <TableCell align="right">1,200,000원</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>마우스</TableCell>
              <TableCell align="right">35,000원</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Striped + Hoverable</h3>
        <Table striped hoverable>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>역할</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>홍길동</TableCell>
              <TableCell>관리자</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>김철수</TableCell>
              <TableCell>사용자</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>이영희</TableCell>
              <TableCell>편집자</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Bordered + Compact</h3>
        <Table bordered compact>
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
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">With Footer</h3>
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHead>항목</TableHead>
              <TableHead align="right">금액</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>상품 A</TableCell>
              <TableCell align="right">10,000원</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>상품 B</TableCell>
              <TableCell align="right">20,000원</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>합계</TableCell>
              <TableCell align="right" className="font-bold">
                30,000원
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Table 컴포넌트의 다양한 조합을 한눈에 볼 수 있습니다.",
      },
    },
  },
};
