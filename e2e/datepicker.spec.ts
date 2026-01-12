import { test, expect } from "@playwright/test";

test.describe("DatePicker 컴포넌트", () => {
  test("기본 DatePicker 렌더링 및 날짜 선택", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-datepicker--default&viewMode=story");

    // 달력 아이콘 또는 input 클릭
    await page.getByRole("textbox").click();

    // 팝오버가 열렸는지 확인 (dialog 역할이나 특정 클래스)
    await expect(page.getByRole("dialog")).toBeVisible();

    // 오늘 날짜 또는 특정 날짜 선택 (예: 15일)
    // 현재 월의 15일을 클릭한다고 가정
    await page.getByRole("gridcell", { name: "15" }).first().click();

    // 적용 버튼 클릭
    await page.getByRole("button", { name: "적용" }).click();

    // 팝오버가 닫혔는지 확인
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Input에 값이 들어갔는지 확인 (YYYY-MM-15 형식 포함)
    await expect(page.getByRole("textbox")).toHaveValue(/-15$/);
  });

  test("직접 입력 방지 (readonly)", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-datepicker--default&viewMode=story");
    const input = page.getByRole("textbox");

    // 읽기 전용 속성 확인
    await expect(input).toHaveAttribute("readonly");
  });
});
