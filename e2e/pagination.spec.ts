import { test, expect } from "@playwright/test";

test.describe("Pagination 컴포넌트", () => {
  test("페이지 이동", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=data-display-pagination--default&viewMode=story",
    );

    // 현재 페이지 1 확인 (aria-current="page")
    await expect(
      page.getByRole("button", { name: "1", exact: true }),
    ).toHaveAttribute("aria-current", "page");

    // 2페이지 클릭
    await page.getByRole("button", { name: "2", exact: true }).click();

    // 2페이지가 현재 페이지인지 확인
    await expect(
      page.getByRole("button", { name: "2", exact: true }),
    ).toHaveAttribute("aria-current", "page");

    // 다음 페이지 버튼 클릭 (chevron-right icon or similar)
    // Assuming standard aria-label or identifying by order if icons are used
    // Radix-like pagination often uses aria-label="Go to next page"
    // Using a more generic selector if aria-label is not guaranteed
    const nextButton = page.locator("button").filter({ has: page.locator("svg.lucide-chevron-right") });
    if (await nextButton.count() > 0) {
        await nextButton.click();
    } else {
        // Fallback or specific implementation check
        // Trying by order if it's the last button in nav
        await page.locator("nav button").last().click();
    }

    // 3페이지가 현재 페이지인지 확인 (Assuming next moves one page)
    await expect(
      page.getByRole("button", { name: "3", exact: true }),
    ).toHaveAttribute("aria-current", "page");
  });
});