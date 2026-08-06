import { test, expect } from "@playwright/test";

test.describe("Cascader 컴포넌트", () => {
  test("error 상태가 소비자 border className보다 우선 (#73)", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?id=forms-cascader--error-class-name-priority",
    );

    // 접근성 이름은 연결된 label("지역")로 계산된다.
    const trigger = page.getByRole("button", { name: "지역" });
    await expect(trigger).toBeVisible();

    // cn 병합 순서 가드: error 스타일이 className 뒤에 병합되어
    // border-cms-gray-300 은 소거되고 border-cms-red-500 이 남아야 한다.
    await expect(trigger).toHaveClass(/border-cms-red-500/);
    const classes = await trigger.getAttribute("class");
    expect(classes).not.toContain("border-cms-gray-300");
  });
});
