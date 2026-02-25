import useNamedColor from "./use-named-color.mjs";

/** @type {import("eslint").ESLint.Plugin} */
const plugin = {
  rules: {
    "use-named-color": useNamedColor,
  },
};

export default plugin;
