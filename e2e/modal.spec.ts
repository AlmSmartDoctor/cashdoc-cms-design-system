import { test, expect } from '@playwright/test';

test.describe('Modal 컴포넌트', () => {
  test('기본 모달 열기 및 닫기', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-modal--basic');

    // 모달 열기 버튼 클릭
    await page.getByRole('button', { name: '모달 열기' }).click();

    // 모달이 표시되는지 확인
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: '기본 모달' })).toBeVisible();

    // 취소 버튼으로 닫기
    await page.getByRole('button', { name: '취소' }).click();

    // 모달이 사라지는지 확인
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('확인 모달', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-modal--confirm');

    // 모달 열기
    await page.getByRole('button', { name: '확인 모달 열기' }).click();

    // 모달 내용 확인
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('작업이 성공적으로 완료되었습니다.')).toBeVisible();

    // 확인 버튼 클릭
    await page.getByRole('button', { name: '확인' }).click();

    // 모달이 닫히는지 확인
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('성공 모달', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-modal--success');

    // 모달 열기
    await page.getByRole('button', { name: '성공 모달 열기' }).click();

    // 모달이 표시되는지 확인
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('데이터가 성공적으로 저장되었습니다.')).toBeVisible();
  });

  test('ESC 키로 모달 닫기', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-modal--basic');

    // 모달 열기
    await page.getByRole('button', { name: '모달 열기' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // ESC 키 누르기
    await page.keyboard.press('Escape');

    // 모달이 닫히는지 확인
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

});
