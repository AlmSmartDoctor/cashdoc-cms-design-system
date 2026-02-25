import { transformStringLiteral } from "./transformer.mjs";

export function visit(
  /** @type {import("eslint").Rule.RuleContext} */ context,
  /** @type {import("estree-jsx").Node} */ node,
) {
  if (node.type === "Literal") {
    Literal(context, node);
  } else if (node.type === "TemplateLiteral") {
    TemplateLiteral(context, node);
  }
}

export function Literal(
  /** @type {import("eslint").Rule.RuleContext} */ context,
  /** @type {import("estree-jsx").Literal} */ node,
) {
  if (typeof node.value !== "string") return;

  const [newText, changes] = transformStringLiteral(node.value);
  if (newText) {
    context.report({
      node,
      message: "Use named color instead of hex color: {{ changes }}",
      data: { changes },
      fix(fixer) {
        return fixer.replaceText(node, `"${newText.replace(/"/g, '\\"')}"`);
      },
    });
  }
}

export function TemplateLiteral(
  /** @type {import("eslint").Rule.RuleContext} */ context,
  /** @type {import("estree-jsx").TemplateLiteral} */ node,
) {
  for (const quasi of node.quasis) {
    if (quasi.type === "TemplateElement") {
      const [newText, changes] = transformStringLiteral(quasi.value.raw);
      if (newText) {
        context.report({
          node: quasi,
          message: "Use named color instead of hex color: {{ changes }}",
          data: { changes },
          fix(fixer) {
            return fixer.replaceTextRange(quasi.range, `\`${newText}\``);
          },
        });
      }
    }
  }
}
