// FEATURE BRANCH CHANGE.
import { test, expect } from '@playwright/test';

test.describe('SauceDemo', () => {

  // -----------------------------
  // LOGIN PAGE (NO AUTH)
  // -----------------------------
  test.describe('Login page validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login redirects to inventory page', async ({ page }) => {

    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(
  page,
  'User should be redirected to inventory page after successful login'
).toHaveURL(/inventory/);
  });

  test('invalid login shows error message', async ({ page }) => {

    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('wrong_password');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(
      page.getByTestId('error'),
      'Error should appear for wrong credentials'
    ).toBeVisible();
  });
  

  test('locked user shows locked out error message', async ({ page }) => {

  await page.getByTestId('username').fill('locked_out_user');

  await page.getByTestId('password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByTestId('error'),
    'Locked out user should see the correct error message'
  ).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );
});

  test('empty and partial form validation', async ({ page }) => {

  const loginButton = page.getByRole('button', { name: 'Login' });
  const error = page.getByTestId('error');

  // CASE 1: Empty form
  await loginButton.click();

  await expect(
    error,
    'Error should appear when form is submitted empty'
  ).toBeVisible();

  // Refresh state
  await page.reload();

  // CASE 2: Only username
  await page.getByTestId('username').fill('standard_user');
  await loginButton.click();

  await expect(
    error,
    'Error should appear when password is missing'
  ).toBeVisible();

  await page.reload();

  // CASE 3: Only password
  await page.getByTestId('password').fill('secret_sauce');
  await loginButton.click();

  await expect(
    error,
    'Error should appear when username is missing'
  ).toBeVisible();
});
});

// -----------------------------
  // AUTHENTICATED USER FLOW
  // -----------------------------
  test.describe('Authenticated user flow', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/');

      await page.getByTestId('username').fill('standard_user');
      await page.getByTestId('password').fill('secret_sauce');
      await page.getByRole('button', { name: 'Login' }).click();
    });

  test('add product to cart shows badge 1', async ({ page }) => {

  // Act: add product to cart
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  // Assert: cart badge shows 1
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should show 1 after adding a product to cart'
  ).toHaveText('1');
});

test('remove product from cart hides badge', async ({ page }) => {

  // Act 1: add product
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  // Act 2: remove product
  await page.getByTestId('remove-sauce-labs-backpack').click();

  // Assert: cart badge disappears
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should disappear after removing product from cart'
  ).not.toBeVisible();
});

test('rapid add remove cycles keep cart state consistent', async ({ page }) => {

  const addButton = page.getByTestId('add-to-cart-sauce-labs-backpack');

  await addButton.click();

  await page.getByTestId('remove-sauce-labs-backpack').click();

  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  await expect(
    page.locator('.shopping_cart_badge'),
'Cart badge should remain 1 after rapid add/remove cycles'
).toHaveText('1');
  // Observation: SauceDemo cart is designed as a single-instance model per product.
// Items toggle between 'Add to cart' and 'Remove' states; quantity control is not supported.
});

test('Bonus - cart badge updates correctly when adding and removing multiple products', async ({ page }) => {

  // Act: add 3 different products
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
  await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();

  // Assert: badge shows 3
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should show 3 items after adding 3 products to cart'
  ).toHaveText('3');

  // Act: remove 1 product
  await page.getByTestId('remove-sauce-labs-bike-light').click();

  // Assert: badge shows 2
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should show 2 items after removing one product from cart'
  ).toHaveText('2');
});

test('Sorting - price low to high changes product order', async ({ page }) => {

  // Capture first product BEFORE sorting
  const firstProductBefore = await page
    .locator('.inventory_item_name')
    .first()
    .textContent();

  // Act: apply sorting (Price low to high)
  await page.getByRole('combobox').selectOption('lohi');

  // Capture first product AFTER sorting
  const firstProductAfter = await page
    .locator('.inventory_item_name')
    .first()
    .textContent();

  // Assert: order has changed
  expect(
    firstProductBefore,
    'Product order should change after applying low-to-high price sorting'
  ).not.toBe(firstProductAfter);
});

test('Cart persistence after page refresh', async ({ page }) => {

  // Act: add product to cart
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  // Assert: cart shows 1 item
  await expect(page.locator('.shopping_cart_badge'),
'Cart badge should show 1 item after adding a product to cart'
).toHaveText('1');

  // Act: refresh page
  await page.reload();

  // Assert: cart still shows 1 item after refresh
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart should persist after page refresh'
  ).toHaveText('1');
});
});
});


