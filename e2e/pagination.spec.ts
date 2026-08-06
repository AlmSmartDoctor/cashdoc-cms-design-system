import { test, expect } from "@playwright/test";

const SHOWCASE =
  "/iframe.html?id=data-display-pagination--showcase&viewMode=story";

test.describe("Pagination 컴포넌트", () => {
  test("페이지 이동", async ({ page }) => {
    await page.goto(SHOWCASE);

    // 첫 번째 페이지네이션 (totalPages=5, 현재 3페이지)
    const nav = page.getByRole("navigation", { name: "페이지네이션" }).first();

    await expect(
      nav.getByRole("button", { name: "페이지 3 (현재 페이지)" }),
    ).toHaveAttribute("aria-current", "page");

    // 4페이지 클릭
    await nav.getByRole("button", { name: "페이지 4로 이동" }).click();
    await expect(
      nav.getByRole("button", { name: "페이지 4 (현재 페이지)" }),
    ).toHaveAttribute("aria-current", "page");

    // 다음 페이지 버튼 클릭
    await nav.getByRole("button", { name: "다음 페이지" }).click();
    await expect(
      nav.getByRole("button", { name: "페이지 5 (현재 페이지)" }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("disabled 페이지네이션", async ({ page }) => {
    await page.goto(SHOWCASE);

    // 마지막 페이지네이션 (Disabled)
    const nav = page.getByRole("navigation", { name: "페이지네이션" }).last();
    await expect(
      nav.getByRole("button", { name: "페이지 5 (현재 페이지)" }),
    ).toBeDisabled();
  });
});
