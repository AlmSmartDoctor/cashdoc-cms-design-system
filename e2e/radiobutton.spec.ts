import { test, expect } from '@playwright/test';

test.describe('RadioButton 컴포넌트', () => {
  test('기본 라디오 버튼 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-radiobutton--default');

    const radio = page.getByRole('radio');
    await expect(radio).toBeVisible();
  });

  test('라디오 버튼 선택', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-radiobutton--default');

    const radio = page.getByRole('radio');
    await radio.click();

    await expect(radio).toBeChecked();
  });

  test('disabled 상태 확인', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-radiobutton--disabled');

    const radio = page.getByRole('radio');
    await expect(radio).toBeDisabled();
  });

  test('다양한 크기 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-radiobutton--all-variants-and-sizes');

    // Small, Medium, Large 섹션이 있는지 확인
    await expect(page.getByText('Small')).toBeVisible();
    await expect(page.getByText('Medium')).toBeVisible();
    await expect(page.getByText('Large')).toBeVisible();
  });
});
