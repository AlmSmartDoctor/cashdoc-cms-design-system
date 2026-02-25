// https://github.com/schoero/eslint-plugin-better-tailwindcss/issues/269#issuecomment-3724158959
/** @type {import("eslint").ESLint.Plugin} */
const plugin = {
  rules: {
    "multiline-classname": {
      meta: {
        type: "suggestion",
        schema: [],
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (node.name?.type !== "JSXIdentifier") return;
            if (node.name.name !== "className") return;

            // Only handle: className="...multiline..."
            if (
              node.value?.type === "Literal" &&
              typeof node.value.value === "string" &&
              node.value.value.includes("\n")
            ) {
              context.report({
                node: node.value,
                message:
                  "Multiline className strings can cause hydration errors. Use a cn(...) expression instead.",
              });
            }
          },
        };
      },
    },
  },
};

export default plugin;
