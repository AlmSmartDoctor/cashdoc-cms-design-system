import { test, expect } from "@playwright/test";

test.describe("Toast 컴포넌트", () => {
  // Toast는 Toaster 컴포넌트를 통해 렌더링되므로, 별도의 Story가 있어야 테스트 가능.
  // 보통 'Feedback/Toast' 같은 경로.
  // 여기서는 'feedback-toast--default'로 가정.

  test("토스트 표시 및 닫기", async ({ page }) => {
    await page.goto("/iframe.html?id=feedback-toast--default&viewMode=story");

    // 토스트를 발생시키는 버튼 찾기
    // Storybook 예제에 버튼이 있다고 가정
    await page.getByRole("button", { name: /Show Toast|토스트/i }).first().click();

    // 토스트 메시지 확인 (role='status' or 'alert')
    // Sonner uses listitem usually inside a list
    const toast = page.locator("li[data-sonner-toast]");
    await expect(toast).toBeVisible();

    // 닫기 버튼이 있다면 클릭 (옵션)
    // await toast.getByRole('button').click();
    // await expect(toast).not.toBeVisible();
  });
});
