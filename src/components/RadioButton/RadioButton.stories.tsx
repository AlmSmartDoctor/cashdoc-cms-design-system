import type { Meta, StoryObj } from "@storybook/react";
import {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupItemProps,
} from "./RadioButton";

const meta: Meta<typeof RadioGroupItem> = {
  title: "Components/RadioButton",
  component: RadioGroupItem,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Cms Design System의 라디오 버튼 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["black", "default", "green", "blue", "red"],
      description: "라디오 버튼 색상 변형",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "라디오 버튼 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
  decorators: [
    (Story, context) => (
      <RadioGroup defaultValue={context.args.value || "default"}>
        <Story />
      </RadioGroup>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadioGroupItem>;

const LabeledRadioItem = (
  props: RadioGroupItemProps & { label: string; value: string }
) => (
  <div className="flex items-center space-x-2">
    <RadioGroupItem
      {...props}
      id={`${props.value}-${props.size}-${props.variant}`}
    />
    <label
      htmlFor={`${props.value}-${props.size}-${props.variant}`}
      className="text-cms-sm cursor-pointer"
    >
      {props.label}
    </label>
  </div>
);

export const Default: Story = {
  render: (args) => <LabeledRadioItem label="Default Radio" {...args} />,
  args: {
    value: "default",
    variant: "black",
    size: "md",
  },
};

export const Small: Story = {
  render: (args) => <LabeledRadioItem label="Small Radio" {...args} />,
  args: {
    value: "small",
    variant: "black",
    size: "sm",
  },
};

export const Large: Story = {
  render: (args) => <LabeledRadioItem label="Large Radio" {...args} />,
  args: {
    value: "large",
    variant: "black",
    size: "lg",
  },
};

export const Green: Story = {
  render: (args) => <LabeledRadioItem label="Green Radio" {...args} />,
  args: {
    value: "green",
    variant: "green",
    size: "md",
  },
};

export const Blue: Story = {
  render: (args) => <LabeledRadioItem label="Blue Radio" {...args} />,
  args: {
    value: "blue",
    variant: "blue",
    size: "md",
  },
};

export const Red: Story = {
  render: (args) => <LabeledRadioItem label="Red Radio" {...args} />,
  args: {
    value: "red",
    variant: "red",
    size: "md",
  },
};

export const Disabled: Story = {
  render: (args) => <LabeledRadioItem label="Disabled Radio" {...args} />,
  args: {
    value: "disabled",
    variant: "black",
    size: "md",
    disabled: true,
  },
};

export const AllVariantsAndSizes: Story = {
  render: () => (
    <RadioGroup defaultValue="Black-md">
      <div className="flex flex-col gap-8 p-4">
        <div className="flex items-start gap-10">
          <div>
            <h3 className="text-cms-md font-semibold mb-4">Small</h3>
            <div className="flex flex-col gap-4">
              <LabeledRadioItem
                variant="black"
                size="sm"
                value="Black-sm"
                label="Black"
              />
              <LabeledRadioItem
                variant="default"
                size="sm"
                value="Default-sm"
                label="Default"
              />
              <LabeledRadioItem
                variant="green"
                size="sm"
                value="Green-sm"
                label="Green"
              />
              <LabeledRadioItem
                variant="blue"
                size="sm"
                value="Blue-sm"
                label="Blue"
              />
              <LabeledRadioItem
                variant="red"
                size="sm"
                value="Red-sm"
                label="Red"
              />
            </div>
          </div>
          <div>
            <h3 className="text-cms-md font-semibold mb-4">Medium</h3>
            <div className="flex flex-col gap-4">
              <LabeledRadioItem
                variant="black"
                size="md"
                value="Black-md"
                label="Black"
              />
              <LabeledRadioItem
                variant="default"
                size="md"
                value="Default-md"
                label="Default"
              />
              <LabeledRadioItem
                variant="green"
                size="md"
                value="Green-md"
                label="Green"
              />
              <LabeledRadioItem
                variant="blue"
                size="md"
                value="Blue-md"
                label="Blue"
              />
              <LabeledRadioItem
                variant="red"
                size="md"
                value="Red-md"
                label="Red"
              />
            </div>
          </div>
          <div>
            <h3 className="text-cms-md font-semibold mb-4">Large</h3>
            <div className="flex flex-col gap-4">
              <LabeledRadioItem
                variant="black"
                size="lg"
                value="Black-lg"
                label="Black"
              />
              <LabeledRadioItem
                variant="default"
                size="lg"
                value="Default-lg"
                label="Default"
              />
              <LabeledRadioItem
                variant="green"
                size="lg"
                value="Green-lg"
                label="Green"
              />
              <LabeledRadioItem
                variant="blue"
                size="lg"
                value="Blue-lg"
                label="Blue"
              />
              <LabeledRadioItem
                variant="red"
                size="lg"
                value="Red-lg"
                label="Red"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-cms-md font-semibold mb-4">Disabled</h3>
          <RadioGroup defaultValue="Checked-md-disabled">
            <div className="flex gap-4">
              <LabeledRadioItem
                variant="black"
                size="md"
                value="Unchecked-md-disabled"
                label="Unchecked"
                disabled
              />
              <LabeledRadioItem
                variant="black"
                size="md"
                value="Checked-md-disabled"
                label="Checked"
                disabled
              />
            </div>
          </RadioGroup>
        </div>
      </div>
    </RadioGroup>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story: "모든 라디오 버튼 변형과 크기를 한 번에 보여줍니다.",
      },
    },
  },
};
