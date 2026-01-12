import { test, expect } from "@playwright/test";

test.describe("TimePicker 컴포넌트", () => {
  test("시간 선택 및 적용", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-timepicker--default&viewMode=story");

    // Input 클릭
    await page.getByRole("textbox").click();

    // 팝오버 확인
    await expect(page.getByText("시")).toBeVisible();
    await expect(page.getByText("분")).toBeVisible();

    // 시간(10시) 선택
    await page.getByRole("button", { name: "10시" }).click();

    // 분(30분) 선택
    await page.getByRole("button", { name: "30분" }).click();

    // 적용 버튼 클릭
    await page.getByRole("button", { name: "적용" }).click();

    // Input 값 확인
    await expect(page.getByRole("textbox")).toHaveValue("10:30");
  });

  test("12시간제 모드 확인", async ({ page }) => {
    // 12시간제 스토리 ID 필요 (예: forms-timepicker--twelve-hour)
    // Storybook ID가 확실치 않으므로 default에서 확인하거나 Args를 변경해서 테스트해야 함.
    // 여기서는 별도의 Story가 있다고 가정하거나 Default를 테스트.
    await page.goto(
      "/iframe.html?id=forms-timepicker--default&viewMode=story&args=format:12h",
    );

    await page.getByRole("textbox").click();

    // AM/PM 선택 확인
    await expect(page.getByRole("button", { name: "AM" })).toBeVisible();
    await expect(page.getByRole("button", { name: "PM" })).toBeVisible();
  });
});
