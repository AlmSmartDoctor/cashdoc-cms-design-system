import { test, expect } from '@playwright/test';

test.describe('Checkbox 컴포넌트', () => {
  test('기본 체크박스 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-checkbox--default');

    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).toBeVisible();

    // 레이블도 렌더링되는지 확인
    await expect(page.getByText('체크박스')).toBeVisible();
  });

  test('레이블 없는 체크박스', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-checkbox--without-label');

    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).toBeVisible();
  });

  test('체크박스 토글', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-checkbox--default');

    const checkbox = page.getByRole('checkbox');

    // 초기 상태 확인 (unchecked)
    await expect(checkbox).not.toBeChecked();

    // 클릭해서 체크
    await checkbox.click();
    await expect(checkbox).toBeChecked();

    // 다시 클릭해서 체크 해제
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
  });

  test('체크된 상태로 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-checkbox--checked');

    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).toBeChecked();
  });

  test('disabled 상태 확인', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-checkbox--disabled');

    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).toBeDisabled();
  });

  test('레이블 클릭으로 토글', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-checkbox--default');

    const checkbox = page.getByRole('checkbox');
    const label = page.getByText('체크박스');

    // 레이블 클릭으로 체크
    await label.click();
    await expect(checkbox).toBeChecked();
  });
});
