import type { Meta, StoryObj } from "@storybook/react-vite";
import { cn } from "@/utils/cn";
import * as Icons from "./index";

const meta: Meta = {
  title: "Icons/Icons",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Lucide-react 기반 표준 아이콘 세트. currentColor 상속, size prop으로 크기 조절.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

type IconComponent = typeof Icons.CheckIcon;
type IconEntry = [name: string, Icon: IconComponent];
const isIconComponent = (value: unknown): value is IconComponent =>
  typeof value === "function" ||
  (typeof value === "object" && value !== null && "$$typeof" in value);

const iconEntries = Object.entries(Icons).filter(
  (entry): entry is IconEntry => {
    const [name, Icon] = entry;
    return name.endsWith("Icon") && isIconComponent(Icon);
  },
);

const categories: Record<string, IconEntry[]> = {
  Navigation: iconEntries.filter(
    ([n]) =>
      n.includes("Chevron") ||
      n.includes("Arrow") ||
      n.includes("Menu") ||
      n.includes("Align"),
  ),
  "Status & Feedback": iconEntries.filter(
    ([n]) =>
      n.includes("XIcon") ||
      n.includes("Check") ||
      n.includes("Info") ||
      n.includes("Error") ||
      n.includes("Warning") ||
      n.includes("Help"),
  ),
  Actions: iconEntries.filter(([n]) =>
    [
      "PlusIcon",
      "PlusCircleIcon",
      "TrashIcon",
      "SaveIcon",
      "RefreshIcon",
      "LinkIcon",
      "PinIcon",
      "CloseIcon",
      "SearchIcon",
      "SettingsIcon",
    ].includes(n),
  ),
  Edit: iconEntries.filter(([n]) => n.includes("Edit")),
  Files: iconEntries.filter(
    ([n]) =>
      n.includes("File") ||
      n.includes("Excel") ||
      n.includes("Calendar") ||
      n.includes("Image"),
  ),
  User: iconEntries.filter(([n]) => n.includes("User")),
  Messages: iconEntries.filter(([n]) => n.includes("Message")),
  List: iconEntries.filter(([n]) => n.includes("List")),
  Analytics: iconEntries.filter(
    ([n]) => n.includes("Trending") || n.includes("BarChart"),
  ),
  Payment: iconEntries.filter(([n]) => n.includes("CreditCard")),
  Books: iconEntries.filter(([n]) => n.includes("Book")),
  Brand: iconEntries.filter(
    ([n]) => n.includes("Medicash") || n.includes("Badge"),
  ),
  "Communication & Reward": iconEntries.filter(([n]) =>
    ["PhoneIcon", "LightbulbIcon", "BoltIcon", "GiftIcon"].includes(n),
  ),
};

// 어떤 name-match 버킷에도 걸리지 않는 아이콘이 Showcase에서 누락되지 않도록
// catch-all 버킷을 둔다. (신규 아이콘 추가 시 시각 게이트 노출 보장)
const categorizedNames = new Set(
  Object.values(categories).flatMap((entries) => entries.map(([n]) => n)),
);
const uncategorized = iconEntries.filter(([n]) => !categorizedNames.has(n));
if (uncategorized.length > 0) {
  categories["기타"] = uncategorized;
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <h3 className="text-[12px] font-semibold tracking-wide text-cms-gray-550 uppercase">
      {title}
    </h3>
    {children}
  </div>
);

const IconCell = ({ name, Icon }: { name: string; Icon: IconComponent }) => (
  <div
    className={cn(
      "flex flex-col items-center gap-1.5 rounded-cms-md p-3",
      "border border-cms-gray-200",
      `transition-colors hover:bg-cms-gray-50`,
    )}
  >
    <Icon className="text-cms-gray-900" size={20} />
    <p className="text-center font-mono text-[10px] leading-tight text-cms-gray-550">
      {name}
    </p>
  </div>
);

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Section title="Sizes">
        <div className="flex items-end gap-6">
          <div className="flex flex-col items-center gap-1">
            <Icons.ChevronRightIcon size={16} className="text-cms-gray-900" />
            <span className="text-[10px] text-cms-gray-550">16</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Icons.ChevronRightIcon size={20} className="text-cms-gray-900" />
            <span className="text-[10px] text-cms-gray-550">20</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Icons.ChevronRightIcon size={24} className="text-cms-gray-900" />
            <span className="text-[10px] text-cms-gray-550">24</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Icons.ChevronRightIcon size={32} className="text-cms-gray-900" />
            <span className="text-[10px] text-cms-gray-550">32</span>
          </div>
        </div>
      </Section>

      <Section title="Colors (currentColor)">
        <div className="flex items-center gap-6">
          <Icons.CheckCircleIcon className="text-cms-green-500" size={20} />
          <Icons.ErrorIcon className="text-cms-red-500" size={20} />
          <Icons.InfoIcon className="text-cms-blue-500" size={20} />
          <Icons.WarningIcon className="text-cms-orange-500" size={20} />
          <Icons.MedicashIcon className="text-cms-pink-500" size={20} />
        </div>
      </Section>

      {Object.entries(categories).map(
        ([title, icons]) =>
          icons.length > 0 && (
            <Section key={title} title={title}>
              <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-8">
                {icons.map(([name, Icon]) => (
                  <IconCell key={name} name={name} Icon={Icon} />
                ))}
              </div>
            </Section>
          ),
      )}
    </div>
  ),
};

export const ForJsdoc: Story = Showcase;
