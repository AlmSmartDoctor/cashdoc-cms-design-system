import { test, expect } from "@playwright/test";

const SHOWCASE = "/iframe.html?id=forms-dropdown--showcase&viewMode=story";

test.describe("Dropdown 컴포넌트", () => {
  test("기본 드롭다운 렌더링", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(
      page.getByRole("button", { name: "선택하세요" }),
    ).toBeVisible();
  });

  test("드롭다운 열기 및 옵션 확인", async ({ page }) => {
    await page.goto(SHOWCASE);

    await page.getByRole("button", { name: "선택하세요" }).click();

    await expect(page.getByText("React")).toBeVisible();
    await expect(page.getByText("Vue.js")).toBeVisible();
  });

  test("옵션 선택 시 트리거에 값 표시", async ({ page }) => {
    await page.goto(SHOWCASE);

    await page.getByRole("button", { name: "선택하세요" }).click();
    await page.getByText("React", { exact: true }).click();

    await expect(page.getByRole("button", { name: "React" })).toBeVisible();
  });

  test("disabled 상태 확인", async ({ page }) => {
    await page.goto(SHOWCASE);

    await expect(page.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });
});

/**
 * PR #71 회귀 방지 시나리오.
 *
 * Radix Popover primitive 로 재구성한 Dropdown 이 Modal 안에서도
 * 정상 동작하는지, 그리고 rewrite 중 발생한 회귀 (검색어 잔존, selectAll
 * 버튼 클릭 시 닫힘 등) 가 재발하지 않는지 검증한다.
 *
 * 이 describe 는 존재하는 스토리 ID 만 사용한다. 위 4개 test 는
 * playwright.config.ts 주석대로 stale story id (#23) 를 참조하는
 * pre-existing 실패이며 이번 PR 범위 밖이다.
 */
test.describe("Dropdown PR #71 회귀 방지", () => {
  test("Modal 안 · 검색 인풋 autofocus + 필터링", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-dropdown--inside-modal");
    await page.getByRole("button", { name: "모달 열기" }).click();

    // Modal 안의 Dropdown 트리거를 열고 검색 필터 검증
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /옵션을 선택하세요/ }).click();

    const searchInput = page.getByPlaceholder("검색...");
    await expect(searchInput).toBeFocused();

    await searchInput.fill("옵션 03");
    await expect(page.getByRole("option", { name: /옵션 03/ })).toBeVisible();
    await expect(page.getByRole("option", { name: /옵션 05/ })).toHaveCount(0);
  });

  test("Modal 안 · 옵션 리스트 wheel 스크롤", async ({ page }) => {
    await page.goto("/iframe.html?id=forms-dropdown--inside-modal");
    await page.getByRole("button", { name: "모달 열기" }).click();

    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: /옵션을 선택하세요/ }).click();

    // 옵션 리스트 스크롤 컨테이너를 찾아 wheel 로 스크롤 이동
    const scrollContainer = page.locator('[role="listbox"] .overflow-y-auto');
    await expect(scrollContainer).toBeVisible();

    const before = await scrollContainer.evaluate((el) => el.scrollTop);
    await scrollContainer.hover();
    await page.mouse.wheel(0, 300);
    // scroll 이 실제로 적용되도록 rAF 여유
    await page.waitForTimeout(50);
    const after = await scrollContainer.evaluate((el) => el.scrollTop);

    expect(after).toBeGreaterThan(before);
  });

  test("Modal 안 · 빈 영역 클릭 시 Dropdown 만 닫히고 Modal 유지", async ({
    page,
  }) => {
    await page.goto("/iframe.html?id=forms-dropdown--inside-modal");
    await page.getByRole("button", { name: "모달 열기" }).click();

    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: /옵션을 선택하세요/ }).click();
    await expect(page.getByRole("listbox").first()).toBeVisible();

    // Modal 안, Dropdown 팝오버 바깥 영역을 클릭
    await dialog.getByText("Modal 내부 Dropdown").click();

    // Dropdown 만 닫히고 Modal 은 유지되어야 함
    await expect(page.getByRole("listbox")).toHaveCount(0);
    await expect(dialog).toBeVisible();
  });

  test("Modal 밖 · 옵션 선택 후 재오픈 시 검색어 초기화 (회귀 A)", async ({
    page,
  }) => {
    await page.goto("/iframe.html?id=forms-dropdown--showcase");

    // 트리거 accessible name 은 초기 placeholder ("검색하여 선택") →
    // 옵션 선택 후 "React" 로 바뀌므로 두 상태를 union 정규식으로 매칭.
    const trigger = page.getByRole("button", {
      name: /^(검색하여 선택|React)$/,
    });
    await trigger.click();

    const searchInput = page.getByPlaceholder("검색...");
    await searchInput.fill("Re");
    await page.getByRole("option", { name: /React/ }).click();

    // 재오픈: 검색창은 빈 상태, 옵션 7개가 다시 노출되어야 함
    await trigger.click();
    await expect(searchInput).toHaveValue("");
    await expect(page.getByRole("option")).toHaveCount(7);
  });

  test("Modal 밖 · selectAll 버튼 클릭 시 팝오버 유지 (회귀 B)", async ({
    page,
  }) => {
    await page.goto("/iframe.html?id=forms-dropdown--showcase");

    const trigger = page.getByRole("button", { name: /여러 개 선택/ });
    await trigger.click();
    await expect(page.getByRole("listbox").first()).toBeVisible();

    await page.getByRole("button", { name: "모두 선택" }).click();

    // 팝오버 (listbox) 가 여전히 열려있어야 함
    await expect(page.getByRole("listbox").first()).toBeVisible();
  });
});
