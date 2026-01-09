import { test, expect } from '@playwright/test';

test.describe('Modal 컴포넌트', () => {
  test('기본 모달 열기 및 닫기', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-modal--basic');

    // 초기 상태: 모달이 이미 열려 있어야 함
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: '기본 모달' })).toBeVisible();

    // 취소 버튼으로 닫기
    await page.getByRole('button', { name: '취소' }).click();

    // 모달이 사라지는지 확인
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // 다시 열기
    await page.getByRole('button', { name: '모달 열기' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('확인 모달', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-modal--confirm');

    // 초기 상태: 모달이 이미 열려 있어야 함
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('작업이 성공적으로 완료되었습니다.')).toBeVisible();

    // 확인 버튼 클릭
    await page.getByRole('button', { name: '확인' }).click();

    // 모달이 닫히는지 확인
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // 다시 열기
    await page.getByRole('button', { name: '확인 모달 열기' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('성공 모달', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-modal--success');

    // 초기 상태: 모달이 이미 열려 있어야 함
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('데이터가 성공적으로 저장되었습니다.')).toBeVisible();

    // 닫기 (확인 버튼)
    await page.getByRole('button', { name: '확인' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('ESC 키로 모달 닫기', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-modal--basic');

    // 초기 상태: 모달이 열려 있음
    await expect(page.getByRole('dialog')).toBeVisible();

    // 모달 내부 요소에 포커스 (자동 포커스가 비활성화되어 있으므로 수동으로 포커스 이동 필요)
    await page.getByRole('button', { name: '확인' }).focus();

    // ESC 키 누르기
    await page.keyboard.press('Escape');

    // 모달이 닫히는지 확인
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});
