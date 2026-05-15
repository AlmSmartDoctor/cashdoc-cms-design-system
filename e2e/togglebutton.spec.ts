import { test, expect } from "@playwright/test";

test.describe("ToggleButton 컴포넌트", () => {
  test("기본 렌더링: 눌리지 않은 상태의 aria-pressed=false", async ({
    page,
  }) => {
    await page.goto("/iframe.html?id=forms-togglebutton--default");

    const button = page.getByRole("button", { name: "좋아요" });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("aria-pressed", "false");
  });

  test("클릭 시 pressed 상태로 전환되고 레이블이 변경된다", async ({
    page,
  }) => {
    await page.goto("/iframe.html?id=forms-togglebutton--default");

    const button = page.getByRole("button", { name: "좋아요" });
    await button.click();

    const pressed = page.getByRole("button", { name: "좋아요 취소" });
    await expect(pressed).toBeVisible();
    await expect(pressed).toHaveAttribute("aria-pressed", "true");

    await pressed.click();
    await expect(page.getByRole("button", { name: "좋아요" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  test("Enter / Space 키로 토글된다", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-togglebutton--default");

    const button = page.getByRole("button", { name: "좋아요" });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("button", { name: "좋아요 취소" }),
    ).toBeVisible();

    await page.keyboard.press("Space");
    await expect(page.getByRole("button", { name: "좋아요" })).toBeVisible();
  });

  test("disabled 상태에서는 비활성화된다", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-togglebutton--disabled");

    const button = page.getByRole("button", { name: "좋아요" });
    await expect(button).toBeDisabled();
  });
});
