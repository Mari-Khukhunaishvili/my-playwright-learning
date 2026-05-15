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
// Using getByTestId() with custom config (testIdAttribute: 'data-test' in playwright.config.ts).
// This ensures Playwright correctly maps data-test attributes as test IDs.

await page.getByTestId('username').fill('standard_user');
await page.getByTestId('password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();

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

  // Locator was first verified in DevTools Console using:
  // document.querySelector('[data-test="login-button"]')
  // Then reused in Playwright for validation.

  const loginButton = page.locator('[data-test="login-button"]');

  await expect(loginButton).toBeVisible();
});


// Task 5 — XPath vs CSS example

// Given HTML:
// <div class="products">
//   <div class="item" data-testid="item-1">Backpack</div>
//   <div class="item" data-testid="item-2">Bike</div>
//   <div class="item" data-testid="item-3">Hat</div>
// </div>


// XPath (not recommended — position-based, fragile)
 //div[@class='item'][2]

// Better XPath (more stable)
 //div[text()='Bike']

// CSS selector (recommended)
 '[data-testid="item-2"]'

// Playwright recommended locator
// page.locator('[data-testid="item-2"]')
// page.getByTestId('item-2')


test('Task 6 - stable locator example', async ({ page }) => {
  
  // Stable because:
  // - no id or data-testid available
  // - class is generic and not reliable, used only for styling (not test-safe)
  // - uses visible user-facing text, which is less likely to change than the DOM structure or CSS classes
  // getByRole is not used because this element is a plain div without a semantic role
  const logo = page.getByText('Swag Labs');

  await expect(logo).toBeVisible();
});
