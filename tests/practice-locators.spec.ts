import { test, expect } from '@playwright/test';

test('Task 1 - validate login button locator', async ({ page }) => {

  await page.goto('/');

  const loginButton = page.locator('[data-test="login-button"]');

  await expect(loginButton).toBeVisible();

});