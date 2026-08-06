import { test, expect } from "@playwright/test";

type IndexEntry = {
  id: string;
  type: "story" | "docs";
};

type StorybookIndex = {
  entries: Record<string, IndexEntry>;
};

// Storybook index.json의 모든 스토리를 순회하며 렌더 에러 없이
// 마운트되는지 검증한다. 신규 컴포넌트/스토리는 자동으로 커버되므로
// 스토리 개편(스토리 id 변경) 시에도 커버리지 공백이 생기지 않는다.
test.describe("Storybook 스모크", () => {
  test("모든 스토리가 에러 없이 렌더링된다", async ({ page }) => {
    // 스토리 수에 비례해 오래 걸리므로 테스트 단위로 타임아웃 확장.
    // 로컬 실측 ~20s. CI 재시도 2회를 감안해도 job timeout(30분)을
    // 넘지 않도록 5분으로 제한한다.
    test.setTimeout(5 * 60 * 1000);

    const response = await page.request.get("/index.json");
    expect(response.ok()).toBe(true);

    const index = (await response.json()) as StorybookIndex;
    const stories = Object.values(index.entries).filter(
      (entry) => entry.type === "story",
    );
    expect(stories.length).toBeGreaterThan(0);

    const failures: string[] = [];

    for (const story of stories) {
      const pageErrors: string[] = [];
      const onPageError = (error: Error) => pageErrors.push(error.message);
      page.on("pageerror", onPageError);

      try {
        await page.goto(`/iframe.html?id=${story.id}&viewMode=story`, {
          waitUntil: "domcontentloaded",
        });

        // 렌더 완료 대기: root가 채워지거나 에러 오버레이가 뜰 때까지
        await expect(page.locator("#storybook-root")).not.toBeEmpty({
          timeout: 15_000,
        });

        // Storybook 렌더 에러 오버레이 감지
        const hasErrorOverlay = await page
          .locator("body.sb-show-errordisplay")
          .count();
        if (hasErrorOverlay > 0 || pageErrors.length > 0) {
          const reason = pageErrors.join(" / ") || "render error overlay";
          failures.push(`${story.id}: ${reason}`);
        }
      } catch {
        failures.push(`${story.id}: 렌더 실패 (root 비어있음 또는 타임아웃)`);
      } finally {
        page.off("pageerror", onPageError);
      }
    }

    expect(failures, failures.join("\n")).toEqual([]);
  });
});
