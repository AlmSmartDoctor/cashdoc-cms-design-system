import { regex } from "arkregex";
import { getTailwindColorNames } from "./loader.mjs";

/**
 * @param {string} text
 * @returns {[newText: string | null, changes: string]}
 */
export function transformStringLiteral(text) {
  let isDirty = false;

  const colorNames = getTailwindColorNames();

  const hexColorRegex = regex("(?<=-)\\[(#[0-9a-f]{3,8})\\]", "gi");
  const rgbaColorRegex = regex(
    "(?<=-)\\[(rgb\\(_*\\d{1,3}_+\\d{1,3}_+\\d{1,3}_*(/_*[0-9\\.]+?%?)?\\)|rgb\\(_*\\d{1,3}_*,_*\\d{1,3}_*,_*\\d{1,3}_*(,_*[0-9\\.]+?%?)?\\)|rgba\\(_*\\d{1,3}_+\\d{1,3}_+\\d{1,3}_*(_+[0-9\\.]+?%?)?\\)|rgba\\(_*\\d{1,3},_*\\d{1,3},_*\\d{1,3}_*(,_*[0-9\\.]+?%?)?\\))\\]",
    "gi",
  );

  const changes = [];

  const handleHexColor = (
    /** @type {string} */ _hexColor,
    /** @type {string} */ _originalColor = _hexColor,
  ) => {
    const hexColor = _hexColor.toLowerCase();

    const isWithAlpha = hexColor.length === 5 || hexColor.length === 9;
    if (!isWithAlpha) {
      const candidates =
        hexColor.length === 4
          ? [
              hexColor,
              `#${Array.from(hexColor.slice(1))
                .map((c) => c + c)
                .join("")}`,
            ]
          : [hexColor];

      for (const candidate of candidates) {
        if (colorNames[candidate]) {
          isDirty = true;
          const change = `${hexColor} → ${colorNames[candidate]}`;
          if (!changes.includes(change)) {
            changes.push(change);
          }
          return colorNames[candidate];
        }
      }
    } else {
      const alphaHex =
        hexColor.length === 5 ? hexColor[4] + hexColor[4] : hexColor.slice(7);
      const alphaAsPercentage = Math.max(
        0,
        Math.min(100, Math.round((parseInt(alphaHex, 16) / 0xff) * 100)),
      );

      const candidates =
        hexColor.length === 5
          ? [
              hexColor.slice(0, 4),
              `#${Array.from(hexColor.slice(1, 4))
                .map((c) => c + c)
                .join("")}`,
            ]
          : [hexColor.slice(0, 7)];

      for (const candidate of candidates) {
        if (colorNames[candidate]) {
          isDirty = true;
          const change = `${hexColor} → ${colorNames[candidate]}/${alphaAsPercentage}`;
          if (!changes.includes(change)) {
            changes.push(change);
          }
          return `${colorNames[candidate]}/${alphaAsPercentage}`;
        }
      }
    }

    return `[${_originalColor}]`;
  };

  const rgbaToHex = (/** @type {string} */ _rgbaColor) => {
    const rgbaColor = _rgbaColor
      .toLowerCase()
      .replace(/[_,\/]/g, " ")
      .replace(/\s+/g, " ")
      .replace(/rgba?|\(|\)/gi, "")
      .trim();
    const [_r, _g, _b, _a] = rgbaColor.split(" ");
    const r = parseInt(_r, 10);
    const g = parseInt(_g, 10);
    const b = parseInt(_b, 10);
    let a = 255;
    if (_a) {
      if (_a.endsWith("%")) {
        a = parseFloat(_a.slice(0, -1)) / 100;
      } else {
        a = parseFloat(_a);
      }
      a = Math.max(0, Math.min(Math.round(a * 255), 255));
    }
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}${a !== 255 ? a.toString(16).padStart(2, "0") : ""}`;
  };

  const newText = text
    .replace(hexColorRegex, (_, hexColor) => handleHexColor(hexColor))
    .replace(rgbaColorRegex, (_, rgbaColor) =>
      handleHexColor(rgbaToHex(rgbaColor), rgbaColor),
    );

  if (!isDirty) return [null, ""];

  return [newText, changes.join(", ")];
}
