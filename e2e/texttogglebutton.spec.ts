import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const SHOWCASE =
  "/iframe.html?id=forms-texttogglebutton--showcase&viewMode=story";

// "Variant" 줄의 underline 변형 버튼. 스토리 순서가 바뀌어도 줄 단위로
// 스코프되도록 named section 기준으로 찾는다.
const collapsedButton = (page: Page) =>
  page
    .getByText("Variant", { exact: true })
    .locator("..")
    .getByRole("button", { name: "더보기" })
    .first();

test.describe("TextToggleButton 컴포넌트", () => {
  test("기본 렌더링: collapsed 상태의 레이블과 aria-expanded=false", async ({
    page,
  }) => {
    await page.goto(SHOWCASE);

    const button = collapsedButton(page);
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("클릭 시 펼침으로 토글되어 레이블과 aria-expanded가 변경된다", async ({
    page,
  }) => {
    await page.goto(SHOWCASE);

    await collapsedButton(page).click();

    const expanded = page.getByRole("button", { name: "접기" });
    await expect(expanded).toBeVisible();
    await expect(expanded).toHaveAttribute("aria-expanded", "true");

    await expanded.click();
    await expect(page.getByRole("button", { name: "접기" })).toHaveCount(0);
  });

  test("Enter 키와 Space 키로 토글된다", async ({ page }) => {
    await page.goto(SHOWCASE);

    const button = collapsedButton(page);
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "접기" })).toBeVisible();

    await page.keyboard.press("Space");
    await expect(page.getByRole("button", { name: "접기" })).toHaveCount(0);
  });

  test("disabled 상태에서는 클릭이 무시된다", async ({ page }) => {
    await page.goto(SHOWCASE);

    const disabled = page.getByRole("button", {
      name: "더보기",
      disabled: true,
    });
    await expect(disabled).toHaveCount(1);
  });
});
