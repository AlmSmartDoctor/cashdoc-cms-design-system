import { test, expect } from "@playwright/test";

test.describe("Icons", () => {
  test("Showcase 렌더링", async ({ page }) => {
    await page.goto("/iframe.html?id=icons-icons--showcase");

    // Showcase에 아이콘 셀(라벨 + SVG)이 렌더되는지 확인
    const chevron = page.getByText("ChevronRightIcon", { exact: true });
    await expect(chevron).toBeVisible();
  });

  test("FlagIcon 노출", async ({ page }) => {
    await page.goto("/iframe.html?id=icons-icons--showcase");

    // 신규 FlagIcon이 Showcase 목록에 노출되는지 확인
    const label = page.getByText("FlagIcon", { exact: true });
    await expect(label).toBeVisible();

    // 라벨과 같은 셀에 SVG 아이콘이 함께 렌더되는지 확인
    const cell = label.locator("xpath=..");
    await expect(cell.locator("svg")).toBeVisible();
  });
});
