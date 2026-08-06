import { test, expect } from "@playwright/test";

const SHOWCASE = "/iframe.html?id=forms-taginput--showcase&viewMode=story";

test.describe("TagInput 컴포넌트", () => {
  test("태그 추가 및 삭제", async ({ page }) => {
    await page.goto(SHOWCASE);

    // "빈 상태" 섹션 (담당자) — 태그가 있으면 placeholder가 사라지므로
    // label 연결(htmlFor)로 입력을 찾는다.
    const input = page.getByLabel("담당자");

    await input.fill("Playwright");
    await page.keyboard.press("Enter");
    await expect(page.getByText("Playwright")).toBeVisible();

    // "기본" 섹션의 기존 태그 삭제
    await page.getByRole("button", { name: "보험 제거" }).click();
    await expect(page.getByRole("button", { name: "보험 제거" })).toHaveCount(
      0,
    );
    await expect(page.getByText("Playwright")).toBeVisible();
  });

  test("중복 태그 방지", async ({ page }) => {
    await page.goto(SHOWCASE);

    const input = page.getByLabel("담당자");

    await input.fill("중복태그");
    await page.keyboard.press("Enter");
    await input.fill("중복태그");
    await page.keyboard.press("Enter");

    // 동일 태그는 1개만 유지
    await expect(
      page.getByRole("button", { name: "중복태그 제거" }),
    ).toHaveCount(1);
  });

  test("readOnly 태그는 삭제 버튼이 없다", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByText("VIP")).toBeVisible();
    await expect(page.getByRole("button", { name: "VIP 제거" })).toHaveCount(0);
  });
});
