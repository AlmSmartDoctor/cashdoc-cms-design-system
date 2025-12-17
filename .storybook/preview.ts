import type { Preview } from "@storybook/react";
import React from "react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: "cashdoc-light",
      values: [
        {
          name: "cashdoc-light",
          value: "#f6f6f9",
        },
        {
          name: "cashdoc-dark",
          value: "#1a1a1a",
        },
        {
          name: "white",
          value: "#ffffff",
        },
      ],
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        "div",
        { className: "cashdoc-ds" },
        React.createElement(Story)
      ),
  ],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
