import { test, expect } from "@playwright/test";

const SHOWCASE = "/iframe.html?id=feedback-modal--showcase&viewMode=story";
const CONFIRM = "/iframe.html?id=feedback-modal--confirm&viewMode=story";

test.describe("Modal 컴포넌트", () => {
  test("기본 모달 열기 및 닫기", async ({ page }) => {
    await page.goto(SHOWCASE);

    await page.getByRole("button", { name: "기본 모달" }).click();

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "변경사항을 저장할까요?" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "취소" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // 다시 열기
    await page.getByRole("button", { name: "기본 모달" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("확인 모달", async ({ page }) => {
    await page.goto(CONFIRM);

    await page.getByRole("button", { name: "확인 모달" }).click();

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByText("본문 메시지입니다", { exact: false }),
    ).toBeVisible();

    await page.getByRole("button", { name: "확인" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("ESC 키로 모달 닫기", async ({ page }) => {
    await page.goto(SHOWCASE);

    await page.getByRole("button", { name: "기본 모달" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});
