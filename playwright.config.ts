import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E 테스트 설정
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./e2e",

  // 테스트 타임아웃
  timeout: 30 * 1000,

  // 각 테스트가 독립적으로 실행
  fullyParallel: true,

  // CI에서 실패 시 재시도 안함
  forbidOnly: !!process.env.CI,

  // 현재 실패는 flaky가 아니라 stale story id(#23)로 인한 확정 실패라
  // 재시도해도 통과하지 않음 — 재시도는 대기시간만 늘림.
  retries: 0,

  // 병렬 실행 워커 수. GitHub Actions ubuntu-latest는 2 vCPU라 2로 고정.
  workers: process.env.CI ? 2 : undefined,

  // 리포터
  reporter: "html",

  use: {
    // 모든 테스트에서 사용할 기본 URL
    baseURL: "http://localhost:6006",

    // 실패 시 스크린샷
    screenshot: "only-on-failure",

    // 실패 시 비디오 녹화
    video: "retain-on-failure",

    // 추적 (trace)
    trace: "on-first-retry",
  },

  // firefox/webkit은 CI 시간 절감을 위해 제외. 크로스 브라우저 검증이
  // 필요해지면 이 배열에 다시 추가.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Storybook 서버 설정 (테스트 전 자동 실행)
  webServer: {
    command: "pnpm run storybook",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
