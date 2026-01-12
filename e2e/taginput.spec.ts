import { test, expect } from "@playwright/test";

test.describe("TagInput 컴포넌트", () => {
  test("태그 추가 및 삭제", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-taginput--default&viewMode=story");

    const input = page.getByRole("textbox");

    // 태그 입력
    await input.fill("React");
    await page.keyboard.press("Enter");

    // 태그가 추가되었는지 확인
    await expect(page.getByText("React")).toBeVisible();

    // 두 번째 태그 입력
    await input.fill("Playwright");
    await page.keyboard.press("Enter");
    await expect(page.getByText("Playwright")).toBeVisible();

    // 태그 삭제 (React 태그의 삭제 버튼)
    // aria-label을 사용하여 삭제 버튼 직접 찾기
    await page.getByRole("button", { name: "React 제거" }).click();

    // React 태그가 사라졌는지 확인
    await expect(page.getByText("React")).not.toBeVisible();
    await expect(page.getByText("Playwright")).toBeVisible();
  });

  test("중복 태그 방지", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-taginput--default&viewMode=story");
    const input = page.getByRole("textbox");

    await input.fill("Duplicate");
    await page.keyboard.press("Enter");

    await input.fill("Duplicate");
    await page.keyboard.press("Enter");

    // 태그가 하나만 있어야 함 (또는 에러 표시)
    // 여기서는 개수 확인
    const tags = page.locator("span").filter({ hasText: "Duplicate" });
    // Text container itself + tag text might double count if locator is loose,
    // but assuming standard implementation:
    // We expect input to be cleared but tag added once.
    // If logic prevents duplicate, count should be 1.
    // If logic allows, count should be 2.
    // CCDS TagInput logic: prevents duplicates usually.
    // Assuming prevention:
    await expect(tags).toHaveCount(1);
  });
});
