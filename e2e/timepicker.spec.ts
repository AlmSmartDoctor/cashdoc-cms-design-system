import { test, expect } from "@playwright/test";

test.describe("TimePicker 컴포넌트", () => {
  test("시간 선택 및 적용", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-timepicker--default&viewMode=story");

    // Input 클릭
    await page.getByRole("textbox").click();

    // 팝오버 확인 (exact: true로 정확히 "시"만 매칭)
    await expect(page.getByText("시", { exact: true })).toBeVisible();
    await expect(page.getByText("분", { exact: true })).toBeVisible();

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
    // Format12Hour 스토리 사용
    await page.goto(
      "/iframe.html?id=forms-timepicker--format-12-hour&viewMode=story",
    );

    await page.getByRole("textbox").click();

    // Dialog 열릴 때까지 대기
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // AM/PM 버튼 확인
    await expect(dialog.getByRole("button", { name: "AM" })).toBeVisible();
    await expect(dialog.getByRole("button", { name: "PM" })).toBeVisible();

    // 시간(10) 선택 - 12시간 모드에서는 숫자만 표시
    await dialog.getByRole("button", { name: "10", exact: true }).click();

    // 분(30분) 선택 - "30 minutes" 형식
    await dialog.getByRole("button", { name: "30 minutes" }).click();

    // AM 선택
    await dialog.getByRole("button", { name: "AM" }).click();

    // 적용 버튼 클릭
    await dialog.getByRole("button", { name: "적용" }).click();

    // Input 값이 12시간 형식으로 표시되는지 확인
    await expect(page.getByRole("textbox")).toHaveValue("10:30 AM");
  });

  // CSD-8027: Modal(Dialog) 내부에서 TimePicker 팝오버 클릭이 죽지 않는지 검증.
  test("모달 내부에서 시/분 선택 동작", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-timepicker--in-modal&viewMode=story");

    // 모달 열기
    await page.getByRole("button", { name: "모달 열기" }).click();
    await expect(
      page.getByRole("dialog", { name: "발송 시간 설정" }),
    ).toBeVisible();

    // 모달 안 TimePicker 입력창 클릭 → 팝오버 오픈
    await page.getByRole("textbox").click();

    // 시/분 선택 (모달 pointer-events 차단에도 클릭이 살아있어야 함)
    await page.getByRole("button", { name: "10시" }).click();
    await page.getByRole("button", { name: "30분" }).click();
    await page.getByRole("button", { name: "적용" }).click();

    // 선택 값이 입력창에 반영되어야 함
    await expect(page.getByRole("textbox")).toHaveValue("10:30");
  });
});
