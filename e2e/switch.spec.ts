import { test, expect } from '@playwright/test';

test.describe('Switch 컴포넌트', () => {
  test('기본 스위치 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-switch--default');

    const switchButton = page.getByRole('switch');
    await expect(switchButton).toBeVisible();
  });

  test('스위치 토글', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-switch--default');

    const switchButton = page.getByRole('switch');

    // 초기 상태 확인 (unchecked)
    await expect(switchButton).not.toBeChecked();

    // 클릭해서 체크
    await switchButton.click();
    await expect(switchButton).toBeChecked();

    // 다시 클릭해서 체크 해제
    await switchButton.click();
    await expect(switchButton).not.toBeChecked();
  });

  test('체크된 상태로 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-switch--green');

    const switchButton = page.getByRole('switch');
    await expect(switchButton).toBeChecked();
  });

  test('disabled 상태 확인', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-switch--disabled');

    const switchButton = page.getByRole('switch');
    await expect(switchButton).toBeDisabled();
  });

});
