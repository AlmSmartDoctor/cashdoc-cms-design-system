import { Literal, TemplateLiteral } from "./visitor.mjs";

/** @type {import("eslint").Rule.RuleModule} */
export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce the use of named colors predefined in Tailwind CSS",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      Literal(node) {
        return Literal(context, node);
      },
      TemplateLiteral(node) {
        return TemplateLiteral(context, node);
      },
    };
  },
};
