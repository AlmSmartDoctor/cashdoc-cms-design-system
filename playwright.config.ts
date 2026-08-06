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

  // CI에서 test.only 잔류 시 실패 처리
  forbidOnly: !!process.env.CI,

  // CI에서만 재시도 허용 (일시적 flaky 방어). flaky는 리포터에 표시된다.
  retries: process.env.CI ? 2 : 0,

  // 병렬 실행 워커 수. GitHub Actions ubuntu-latest는 2 vCPU라 2로 고정.
  workers: process.env.CI ? 2 : undefined,

  // list: CI 로그에 실패/flaky 상세, github: PR 어노테이션, html: 아티팩트
  reporter:
    process.env.CI ?
      [["list"], ["github"], ["html"]]
    : [["list"], ["html", { open: "never" }]],

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
