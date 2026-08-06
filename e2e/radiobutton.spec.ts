import { test, expect } from "@playwright/test";

const SHOWCASE = "/iframe.html?id=forms-radiobutton--showcase&viewMode=story";

test.describe("RadioButton 컴포넌트", () => {
  test("기본 라디오 버튼 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByRole("radio", { name: "즉시 발송" })).toBeVisible();
  });

  test("라디오 버튼 선택", async ({ page }) => {
    await page.goto(SHOWCASE);

    const target = page.getByRole("radio", { name: "예약 발송" });
    await expect(target).not.toBeChecked();

    await target.click();

    await expect(target).toBeChecked();
    await expect(
      page.getByRole("radio", { name: "즉시 발송" }),
    ).not.toBeChecked();
  });

  test("disabled 상태 확인", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByRole("radio", { name: "비활성" })).toBeDisabled();
  });

  test("다양한 크기 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    for (const name of ["sm", "md", "lg"]) {
      await expect(page.getByRole("radio", { name })).toBeVisible();
    }
  });
});
