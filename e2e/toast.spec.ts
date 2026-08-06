import { test, expect } from "@playwright/test";

const SHOWCASE = "/iframe.html?id=feedback-toast--showcase&viewMode=story";

test.describe("Toast 컴포넌트", () => {
  test("정적 Toast 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByText("캠페인이 발행되었습니다")).toBeVisible();
    await expect(page.getByText("발송에 실패했어요")).toBeVisible();
  });

  test("런타임 토스트 표시 (sonner)", async ({ page }) => {
    await page.goto(SHOWCASE);

    // 런타임 섹션의 트리거 버튼 클릭
    await page.getByRole("button", { name: "기본", exact: true }).click();

    // sonner 토스트가 표시되는지 확인
    const toast = page.locator("li[data-sonner-toast]");
    await expect(toast).toBeVisible();
    await expect(toast.getByText("초안이 자동저장되었어요")).toBeVisible();
  });
});
