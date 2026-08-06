import { test, expect } from "@playwright/test";

const SHOWCASE = "/iframe.html?id=forms-switch--showcase&viewMode=story";

test.describe("Switch 컴포넌트", () => {
  test("기본 스위치 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    const switches = page.getByRole("switch");
    await expect(switches.first()).toBeVisible();
    // Variant 6 + State 4 + With label 2
    await expect(switches).toHaveCount(12);
  });

  test("체크된 상태로 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    // "Variant · ON" 줄의 스위치 6개는 전부 checked
    const row = page.getByText("Variant · ON", { exact: true }).locator("..");
    const switches = row.getByRole("switch");
    await expect(switches).toHaveCount(6);
    for (const sw of await switches.all()) {
      await expect(sw).toBeChecked();
    }
  });

  test("disabled 상태 확인", async ({ page }) => {
    await page.goto(SHOWCASE);

    // State 줄의 off/on disabled 2개
    await expect(page.locator('[role="switch"][disabled]')).toHaveCount(2);
  });

  test("내부 라벨 표시 및 토글", async ({ page }) => {
    await page.goto(SHOWCASE);

    // uncontrolled 스위치 (checkedLabel=공개 / uncheckedLabel=비공개)
    // 두 라벨 모두 DOM에 상주하고 상태에 따라 visibility만 바뀐다.
    const switchButton = page.getByRole("switch").filter({ hasText: "비공개" });

    // 초기 상태(Off): 미체크 + 비공개 라벨만 노출
    await expect(switchButton).not.toBeChecked();
    await expect(page.getByText("비공개", { exact: true })).toBeVisible();
    await expect(page.getByText("공개", { exact: true })).toBeHidden();

    // 토글 후(On): 체크 + 공개 라벨로 전환
    await switchButton.click();
    await expect(switchButton).toBeChecked();
    await expect(page.getByText("공개", { exact: true })).toBeVisible();
    await expect(page.getByText("비공개", { exact: true })).toBeHidden();
  });
});
