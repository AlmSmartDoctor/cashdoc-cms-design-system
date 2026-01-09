import { test, expect } from '@playwright/test';

test.describe('TextInput 컴포넌트', () => {
  test('기본 입력 필드 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-textinput--default');

    const input = page.getByPlaceholder('텍스트를 입력하세요');
    await expect(input).toBeVisible();
  });

  test('레이블과 함께 렌더링', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-textinput--with-label');

    await expect(page.getByText('이름')).toBeVisible();
    const input = page.getByPlaceholder('이름을 입력하세요');
    await expect(input).toBeVisible();
  });

  test('텍스트 입력', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-textinput--default');

    const input = page.getByPlaceholder('텍스트를 입력하세요');
    await input.fill('테스트 입력');

    await expect(input).toHaveValue('테스트 입력');
  });

  test('필수 입력 표시', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-textinput--required');

    // 필수 표시(*)가 있는지 확인
    await expect(page.getByText('필수 입력 항목')).toBeVisible();
  });

  test('에러 상태 표시', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-textinput--error');

    // 에러 메시지 확인
    await expect(page.getByText('비밀번호는 8자 이상이어야 합니다')).toBeVisible();
  });

  test('헬퍼 텍스트 표시', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-textinput--with-helper-text');

    await expect(page.getByText('이메일 형식으로 입력해주세요')).toBeVisible();
  });

  test('disabled 상태 확인', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-textinput--disabled');

    const input = page.getByRole('textbox');
    await expect(input).toBeDisabled();
    await expect(input).toHaveValue('비활성화된 사용자');
  });

  test('비밀번호 타입', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-textinput--password');

    const input = page.getByPlaceholder('비밀번호를 입력하세요');
    await expect(input).toHaveAttribute('type', 'password');
  });

  test('이메일 타입', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-textinput--email');

    const input = page.getByPlaceholder('example@email.com');
    await expect(input).toHaveAttribute('type', 'email');
  });

  test('숫자 타입', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-textinput--number');

    const input = page.getByPlaceholder('나이를 입력하세요');
    await expect(input).toHaveAttribute('type', 'number');
  });
});
