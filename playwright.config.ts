import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E 테스트 설정
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',

  // 테스트 타임아웃
  timeout: 30 * 1000,

  // 각 테스트가 독립적으로 실행
  fullyParallel: true,

  // CI에서 실패 시 재시도 안함
  forbidOnly: !!process.env.CI,

  // 재시도 설정
  retries: process.env.CI ? 2 : 0,

  // 병렬 실행 워커 수
  workers: process.env.CI ? 1 : undefined,

  // 리포터
  reporter: 'html',

  use: {
    // 모든 테스트에서 사용할 기본 URL
    baseURL: 'http://localhost:6006',

    // 실패 시 스크린샷
    screenshot: 'only-on-failure',

    // 실패 시 비디오 녹화
    video: 'retain-on-failure',

    // 추적 (trace)
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Storybook 서버 설정 (테스트 전 자동 실행)
  webServer: {
    command: 'pnpm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
