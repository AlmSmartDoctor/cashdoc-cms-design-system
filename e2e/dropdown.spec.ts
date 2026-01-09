import { test, expect } from '@playwright/test';

test.describe('Dropdown 컴포넌트', () => {
  test('기본 드롭다운 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-dropdown--default');

    const trigger = page.getByRole('button', { name: /프레임워크를 선택하세요/ });
    await expect(trigger).toBeVisible();
  });

  test('드롭다운 열기 및 옵션 확인', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-dropdown--default');

    const trigger = page.getByRole('button').first();
    await trigger.click();

    // 옵션들이 표시되는지 확인
    await expect(page.getByText('React')).toBeVisible();
    await expect(page.getByText('Vue.js')).toBeVisible();
  });


  test('선택된 값으로 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-dropdown--with-value');

    await expect(page.getByText('React')).toBeVisible();
  });

  test('disabled 상태 확인', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-dropdown--disabled');

    const trigger = page.getByRole('button').first();
    await expect(trigger).toBeDisabled();
  });
});
