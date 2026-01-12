import { test, expect } from "@playwright/test";

test.describe("DateRangePicker 컴포넌트", () => {
  test("기본 DateRangePicker 렌더링 및 기간 선택", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=forms-daterangepicker--default&viewMode=story",
    );

    // 시작일 입력창 클릭
    await page.getByLabel("시작일자").click();

    // 팝오버(달력) 확인
    await expect(page.getByRole("dialog")).toBeVisible();

    // 시작일(10일) 및 종료일(20일) 선택
    await page.getByRole("gridcell", { name: "10" }).first().click();
    await page.getByRole("gridcell", { name: "20" }).first().click();

    // 적용 버튼 클릭
    await page.getByRole("button", { name: "적용" }).click();

    // 팝오버 닫힘 확인
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // 입력창에 선택된 날짜가 반영되었는지 확인
    await expect(page.getByLabel("시작일자")).toHaveValue(/-10$/);
    await expect(page.getByLabel("종료일자")).toHaveValue(/-20$/);
  });

  test("빠른 선택 기능 작동", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=forms-daterangepicker--default&viewMode=story",
    );

    await page.getByLabel("시작일자").click();

    // '오늘' 버튼 클릭
    await page.getByRole("button", { name: "오늘" }).click();

    // 적용 클릭
    await page.getByRole("button", { name: "적용" }).click();

    // 오늘 날짜가 들어갔는지 확인 (YYYY-MM-DD 형식)
    const todayStr = new Date().toISOString().split("T")[0];
    await expect(page.getByLabel("시작일자")).toHaveValue(todayStr);
    await expect(page.getByLabel("종료일자")).toHaveValue(todayStr);
  });
});
