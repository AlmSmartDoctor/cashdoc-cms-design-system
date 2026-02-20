import { test, expect } from "@playwright/test";

test.describe("Switch 컴포넌트", () => {
  test("기본 스위치 렌더링", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-switch--default");

    const switchButton = page.getByRole("switch");
    await expect(switchButton).toBeVisible();
  });

  test("스위치 토글", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-switch--default");

    const switchButton = page.getByRole("switch");

    // 초기 상태 확인 (unchecked)
    await expect(switchButton).not.toBeChecked();

    // 클릭해서 체크
    await switchButton.click();
    await expect(switchButton).toBeChecked();

    // 다시 클릭해서 체크 해제
    await switchButton.click();
    await expect(switchButton).not.toBeChecked();
  });

  test("체크된 상태로 렌더링", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-switch--green");

    const switchButton = page.getByRole("switch");
    await expect(switchButton).toBeChecked();
  });

  test("disabled 상태 확인", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-switch--disabled");

    const switchButton = page.getByRole("switch");
    await expect(switchButton).toBeDisabled();
  });

  test("내부 라벨 표시 및 토글", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-switch--with-inner-labels");

    const switchButton = page.getByRole("switch");
    const checkedLabel = page.getByText("노출", { exact: true });
    const uncheckedLabel = page.getByText("미노출", { exact: true });

    // 초기 상태(Off): 우측 라벨만 노출
    await expect(switchButton).not.toBeChecked();
    await expect(uncheckedLabel).toBeVisible();
    await expect(checkedLabel).toBeHidden();

    // 토글 후(On): 좌측 라벨로 전환
    await switchButton.click();
    await expect(switchButton).toBeChecked();
    await expect(checkedLabel).toBeVisible();
    await expect(uncheckedLabel).toBeHidden();
  });
});
