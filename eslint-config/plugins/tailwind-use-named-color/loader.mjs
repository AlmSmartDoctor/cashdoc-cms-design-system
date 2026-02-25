import { regex } from "arkregex";
import fs from "node:fs";
import path from "node:path";

// NOTE: hard-coded globals.css 파일 경로
const entryPoint = path.resolve(
  import.meta.dirname,
  "../../../src/styles/globals.css",
);

let cachedColorNames = null;

export function getTailwindColorNames() {
  if (cachedColorNames) return cachedColorNames;

  const css = fs.readFileSync(entryPoint, "utf8");

  const colorNames = /** @type {{[hex: string]: string}} */ ({});
  const colorRegex = regex(
    "(?:--color-(?<name>.*?)):\\s*(?<value>#[0-9a-fA-F]{3,8})",
    "g",
  );

  while (true) {
    const match = colorRegex.exec(css);
    if (!match) break;

    const { name, value } = match.groups;
    colorNames[value] = name;
  }

  cachedColorNames = colorNames;

  return colorNames;
}
