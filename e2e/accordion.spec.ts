import { test, expect } from "@playwright/test";

test.describe("Accordion 컴포넌트", () => {
  test("기본 펼침/접힘 토글", async ({ page }) => {
    await page.goto("/iframe.html?id=data-display-accordion--default");

    const trigger = page.getByRole("button", { name: "결제 정보" });
    const content = page.getByText("카드/계좌이체로 결제할 수 있습니다.");

    // 초기 상태: 접힘
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(content).toBeHidden();

    // 클릭해서 펼침
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(content).toBeVisible();

    // 다시 클릭해서 접힘
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(content).toBeHidden();
  });

  test("multiple 타입은 여러 섹션을 동시에 펼친다", async ({ page }) => {
    await page.goto("/iframe.html?id=data-display-accordion--multiple");

    const review = page.getByRole("button", { name: "후기등록" });
    const qna = page.getByRole("button", { name: "Q&A등록" });

    await review.click();
    await qna.click();

    // 둘 다 펼쳐진 상태로 공존
    await expect(review).toHaveAttribute("aria-expanded", "true");
    await expect(qna).toHaveAttribute("aria-expanded", "true");
  });

  test("controlled onValueChange 동작", async ({ page }) => {
    await page.goto("/iframe.html?id=data-display-accordion--controlled");

    const openValue = page.getByTestId("open-value");
    await expect(openValue).toHaveText("없음");

    await page.getByRole("button", { name: "결제 정보" }).click();
    await expect(openValue).toHaveText("payment");

    // single 타입이므로 다른 항목을 열면 값이 교체됨
    await page.getByRole("button", { name: "배송 정보" }).click();
    await expect(openValue).toHaveText("shipping");
  });

  test("disabled 섹션은 토글되지 않는다", async ({ page }) => {
    await page.goto("/iframe.html?id=data-display-accordion--disabled");

    // "활성 섹션"은 "비활성 섹션"의 부분 문자열이므로 exact 매칭 필수
    const disabledTrigger = page.getByRole("button", {
      name: "비활성 섹션",
      exact: true,
    });
    const activeTrigger = page.getByRole("button", {
      name: "활성 섹션",
      exact: true,
    });

    await expect(disabledTrigger).toBeDisabled();
    await expect(disabledTrigger).toHaveAttribute("aria-expanded", "false");

    // 활성 섹션은 정상 토글
    await activeTrigger.click();
    await expect(activeTrigger).toHaveAttribute("aria-expanded", "true");
  });

  test("키보드 내비게이션 (↑/↓/Home/End/Enter)", async ({ page }) => {
    await page.goto("/iframe.html?id=data-display-accordion--default");

    const payment = page.getByRole("button", { name: "결제 정보" });
    const shipping = page.getByRole("button", { name: "배송 정보" });
    const refund = page.getByRole("button", { name: "환불 정책" });

    await payment.focus();
    await expect(payment).toBeFocused();

    // ↓: 다음 트리거로 이동
    await page.keyboard.press("ArrowDown");
    await expect(shipping).toBeFocused();

    // End: 마지막 트리거
    await page.keyboard.press("End");
    await expect(refund).toBeFocused();

    // Home: 첫 트리거
    await page.keyboard.press("Home");
    await expect(payment).toBeFocused();

    // Enter: 펼침 토글
    await page.keyboard.press("Enter");
    await expect(payment).toHaveAttribute("aria-expanded", "true");
  });
});
