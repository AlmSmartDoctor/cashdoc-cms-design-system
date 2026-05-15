import { test, expect } from "@playwright/test";

test.describe("TextToggleButton 컴포넌트", () => {
  test("기본 렌더링: collapsed 상태의 레이블과 aria-expanded=false", async ({
    page,
  }) => {
    await page.goto("/iframe.html?id=forms-texttogglebutton--default");

    const button = page.getByRole("button", { name: "더보기" });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("클릭 시 펼침으로 토글되어 레이블과 aria-expanded가 변경된다", async ({
    page,
  }) => {
    await page.goto("/iframe.html?id=forms-texttogglebutton--default");

    const collapsed = page.getByRole("button", { name: "더보기" });
    await collapsed.click();

    const expanded = page.getByRole("button", { name: "접기" });
    await expect(expanded).toBeVisible();
    await expect(expanded).toHaveAttribute("aria-expanded", "true");

    await expanded.click();
    await expect(page.getByRole("button", { name: "더보기" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  test("Enter 키와 Space 키로 토글된다", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-texttogglebutton--default");

    const button = page.getByRole("button", { name: "더보기" });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "접기" })).toBeVisible();

    await page.keyboard.press("Space");
    await expect(page.getByRole("button", { name: "더보기" })).toBeVisible();
  });

  test("controls prop은 aria-controls 속성으로 출력된다", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=forms-texttogglebutton--with-disclosure",
    );

    const button = page.getByRole("button", { name: "더보기" });
    await expect(button).toHaveAttribute("aria-controls", "review-body");
  });

  test("disabled 상태에서는 클릭이 무시된다", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-texttogglebutton--disabled");

    const button = page.getByRole("button", { name: "더보기" });
    await expect(button).toBeDisabled();
  });
});
