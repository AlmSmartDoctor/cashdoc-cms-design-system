import { test, expect } from "@playwright/test";

test.describe("Pagination 컴포넌트", () => {
  test("페이지 이동", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=data-display-pagination--default&viewMode=story",
    );

    // 현재 페이지 1 확인 (aria-current="page")
    await expect(
      page.getByRole("button", { name: "페이지 1 (현재 페이지)" }),
    ).toHaveAttribute("aria-current", "page");

    // 2페이지 클릭
    await page.getByRole("button", { name: "페이지 2로 이동" }).click();

    // 2페이지가 현재 페이지인지 확인
    await expect(
      page.getByRole("button", { name: "페이지 2 (현재 페이지)" }),
    ).toHaveAttribute("aria-current", "page");

    // 다음 페이지 버튼 클릭 (aria-label 사용)
    await page.getByRole("button", { name: "다음 페이지" }).click();

    // 3페이지가 현재 페이지인지 확인
    await expect(
      page.getByRole("button", { name: "페이지 3 (현재 페이지)" }),
    ).toHaveAttribute("aria-current", "page");
  });
});
