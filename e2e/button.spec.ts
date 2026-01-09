import { test, expect } from '@playwright/test';

test.describe('Button 컴포넌트', () => {
  test('기본 버튼 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-button--default');

    const button = page.getByRole('button', { name: 'Default' });
    await expect(button).toBeVisible();
  });

  test('버튼 클릭 이벤트', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-button--default');

    const button = page.getByRole('button', { name: 'Default' });

    // 클릭이 가능한지 확인
    await expect(button).toBeEnabled();
    await button.click();

    // 클릭 후에도 여전히 존재하는지 확인
    await expect(button).toBeVisible();
  });

  test('다양한 variant 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-button--all-variants');

    // 각 variant 버튼이 렌더링되는지 확인
    await expect(page.getByRole('button', { name: 'Default' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Secondary' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Outline' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ghost' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Link' })).toBeVisible();
  });

  test('disabled 상태 확인', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-button--disabled');

    const button = page.getByRole('button', { name: 'Disabled' });
    await expect(button).toBeDisabled();
  });
});
