// Import testing tools
import { test, expect } from '@playwright/test';

// One test case - checks page title
test('has title', async ({ page }) => {
  // Open website
  await page.goto('https://playwright.dev/');

  // Check title contains "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});
// Another test case - checks get started link
test('get started link', async ({ page }) => {
  // Open website
  await page.goto('https://playwright.dev/');

  // Find and click the "Get started" link
  await page.getByRole('link', { name: 'Get started' }).click();

  // Check that "Installation" heading appears
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});