import { test, expect } from "@playwright/test";

const SHOWCASE = "/iframe.html?id=forms-textinput--showcase&viewMode=story";

test.describe("TextInput 컴포넌트", () => {
  test("기본 입력 필드 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByPlaceholder("example@cashdoc.io")).toBeVisible();
  });

  test("레이블과 함께 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByText("이메일", { exact: true })).toBeVisible();
    await expect(page.getByPlaceholder("example@cashdoc.io")).toBeVisible();
  });

  test("텍스트 입력", async ({ page }) => {
    await page.goto(SHOWCASE);

    const input = page.getByPlaceholder("example@cashdoc.io");
    await input.fill("test@cashdoc.io");

    await expect(input).toHaveValue("test@cashdoc.io");
  });

  test("필수 입력 표시", async ({ page }) => {
    await page.goto(SHOWCASE);

    // "필수" 섹션의 비밀번호 입력은 required
    await expect(page.getByPlaceholder("8자 이상")).toHaveAttribute(
      "required",
      "",
    );
  });

  test("에러 상태 표시", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByText("최소 8자 이상이어야 합니다")).toBeVisible();
  });

  test("헬퍼 텍스트 표시", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByText("고객사 관리자 계정 이메일")).toBeVisible();
  });

  test("disabled 상태 확인", async ({ page }) => {
    await page.goto(SHOWCASE);

    const input = page.locator("input[disabled]").first();
    await expect(input).toHaveValue("cashdoc.io");
  });

  test("비밀번호 타입", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByPlaceholder("8자 이상")).toHaveAttribute(
      "type",
      "password",
    );
  });

  test("숫자 타입", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByPlaceholder("0")).toHaveAttribute("type", "number");
  });
});
