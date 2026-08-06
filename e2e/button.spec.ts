import { test, expect } from "@playwright/test";

const SHOWCASE = "/iframe.html?id=forms-button--showcase&viewMode=story";

test.describe("Button 컴포넌트", () => {
  test("기본 버튼 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    const button = page.getByRole("button", { name: "Default" }).first();
    await expect(button).toBeVisible();
  });

  test("버튼 클릭 이벤트", async ({ page }) => {
    await page.goto(SHOWCASE);

    const button = page.getByRole("button", { name: "Default" }).first();

    await expect(button).toBeEnabled();
    await button.click();
    await expect(button).toBeVisible();
  });

  test("다양한 variant 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    for (const name of ["Secondary", "Ghost", "Warning", "Danger", "Link"]) {
      await expect(page.getByRole("button", { name })).toBeVisible();
    }
    await expect(
      page.getByRole("button", { name: "Outline" }).first(),
    ).toBeVisible();
  });

  test("disabled 상태 확인", async ({ page }) => {
    await page.goto(SHOWCASE);

    const disabled = page.getByRole("button", { name: "Disabled" });
    await expect(disabled).toHaveCount(2);
    for (const button of await disabled.all()) {
      await expect(button).toBeDisabled();
    }
  });
});
