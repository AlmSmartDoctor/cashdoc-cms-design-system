import { test, expect } from "@playwright/test";

const SHOWCASE = "/iframe.html?id=forms-togglebutton--showcase&viewMode=story";

test.describe("ToggleButton 컴포넌트", () => {
  test("기본 렌더링: 눌리지 않은 상태의 aria-pressed=false", async ({
    page,
  }) => {
    await page.goto(SHOWCASE);

    const button = page.getByRole("button", { name: "Default · OFF" });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("aria-pressed", "false");
  });

  test("클릭 시 pressed 상태가 토글된다", async ({ page }) => {
    await page.goto(SHOWCASE);

    const button = page.getByRole("button", { name: "Default · OFF" });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");

    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "false");
  });

  test("Enter / Space 키로 토글된다", async ({ page }) => {
    await page.goto(SHOWCASE);

    const button = page.getByRole("button", { name: "Default · OFF" });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-pressed", "true");

    await page.keyboard.press("Space");
    await expect(button).toHaveAttribute("aria-pressed", "false");
  });

  test("disabled 상태에서는 비활성화된다", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(
      page.getByRole("button", { name: "OFF disabled" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "ON disabled" }),
    ).toBeDisabled();
  });
});
