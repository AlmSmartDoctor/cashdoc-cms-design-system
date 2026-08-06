import { test, expect } from "@playwright/test";

const SHOWCASE = "/iframe.html?id=forms-datepicker--showcase&viewMode=story";

test.describe("DatePicker 컴포넌트", () => {
  test("기본 DatePicker 렌더링 및 날짜 선택", async ({ page }) => {
    await page.goto(SHOWCASE);

    await page.getByRole("textbox").click();

    await expect(page.getByRole("dialog")).toBeVisible();

    // 현재 월의 15일 선택
    await page.getByRole("gridcell", { name: "15" }).first().click();

    await page.getByRole("button", { name: "적용" }).click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByRole("textbox")).toHaveValue(/-15$/);
  });

  test("직접 입력 방지 (readonly)", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByRole("textbox")).toHaveAttribute("readonly", "");
  });
});
