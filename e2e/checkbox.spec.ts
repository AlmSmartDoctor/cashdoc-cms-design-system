import { test, expect } from "@playwright/test";

const SHOWCASE = "/iframe.html?id=forms-checkbox--showcase&viewMode=story";

test.describe("Checkbox 컴포넌트", () => {
  test("기본 체크박스 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    const checkbox = page.getByRole("checkbox", { name: "기본" });
    await expect(checkbox).toBeVisible();
    await expect(page.getByText("기본", { exact: true })).toBeVisible();
  });

  test("레이블 없는 체크박스", async ({ page }) => {
    await page.goto(SHOWCASE);

    // "Without label" 줄의 이름 없는 체크박스 4개
    const row = page.getByText("Without label", { exact: true }).locator("..");
    await expect(row.getByRole("checkbox")).toHaveCount(4);
  });

  test("체크박스 토글", async ({ page }) => {
    await page.goto(SHOWCASE);

    const checkbox = page.getByRole("checkbox", { name: "기본" });

    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
  });

  test("체크된 상태로 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByRole("checkbox", { name: "체크됨" })).toBeChecked();
  });

  test("disabled 상태 확인", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(
      page.getByRole("checkbox", { name: "비활성", exact: true }),
    ).toBeDisabled();
    await expect(
      page.getByRole("checkbox", { name: "체크 + 비활성", exact: true }),
    ).toBeDisabled();
  });

  test("레이블 클릭으로 토글", async ({ page }) => {
    await page.goto(SHOWCASE);

    const checkbox = page.getByRole("checkbox", { name: "기본" });
    await page.getByText("기본", { exact: true }).click();
    await expect(checkbox).toBeChecked();
  });
});
