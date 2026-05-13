//Task 1 - Full Validation Cycle
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});


test('Task 1 - validate login button locator', async ({ page }) => {

  const loginButton = page.getByRole('button', { name: 'Login' });

  await expect(loginButton).toBeVisible();

});


//Task 2 - Fix a bad locator
test('Task 2 - fix a bad locator', async ({ page }) => {

  // ❌ Original locator
  // page.locator("div:nth-child(3) > span")

  // Original locator relies on DOM structure and does not clearly identify the target element.
  // No unique match was found during inspection, indicating the locator is brittle or outdated.

  // ✅ Example of a more stable locator strategy
  const element = page.getByRole('button', { name: 'Login' });

  await expect(element).toBeVisible();

});

test('Task 3 - list handling', async ({ page }) => {

  // Login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Validate successful login
  await expect(page).toHaveURL(/inventory/);

  // Products list
  const products = page.locator('.inventory_item');

  // Validate number of products
  await expect(
    products,
    'Inventory should contain 6 products'
  ).toHaveCount(6);

  // Print count for learning/debugging purposes
  const count = await products.count();
  console.log('Number of products:', count);

  // Example using nth()
  // Use only when order is stable and important
  await products.nth(1).click();

  // Recommended approach:
  // Filter by visible text instead of relying on index
  const backpackItem = products.filter({
    hasText: 'Backpack'
  });

  await expect(
    backpackItem,
    'Backpack product should be visible'
  ).toBeVisible();

});


test('Task 4 - DevTools locator practice', async ({ page }) => {

  // Tested in DevTools console:
  // document.querySelector('[data-test="login-button"]')

  const loginButton = page.locator('[data-test="login-button"]');

  await expect(
    loginButton,
    'Login button should be visible'
  ).toBeVisible();

});

