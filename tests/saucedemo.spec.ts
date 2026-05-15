import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Login suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Task 1 - successful login redirects to inventory page', async ({ page }) => {

    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);
  });

  test('Task 2 - invalid login shows error message', async ({ page }) => {

    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('wrong_password');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(
      page.getByTestId('error'),
      'Error should appear for wrong credentials'
    ).toBeVisible();
  });

  test('Task 3 - add product to cart shows badge 1', async ({ page }) => {

  // Arrange: login
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Act: add product to cart
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  // Assert: cart badge shows 1
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should show 1 after adding a product'
  ).toHaveText('1');
});

test('Task 4 - remove product from cart hides badge', async ({ page }) => {

  // Arrange: login
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Act 1: add product
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  // Act 2: remove product
  await page.getByTestId('remove-sauce-labs-backpack').click();

  // Assert: cart badge disappears
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should not be visible after removing product'
  ).not.toBeVisible();
});

test('Task 5 - empty and partial form validation', async ({ page }) => {

  // Navigate is handled by beforeEach

  const loginButton = page.getByRole('button', { name: 'Login' });
  const error = page.getByTestId('error');

  // CASE 1: Empty form
  await loginButton.click();

  await expect(
    error,
    'Error should appear when form is empty'
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

test('Task 7 - rapid add remove cycles keep cart state consistent', async ({ page }) => {

  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  const addButton = page.getByTestId('add-to-cart-sauce-labs-backpack');

  await addButton.click();

  await page.getByTestId('remove-sauce-labs-backpack').click();

  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  // Observation: SauceDemo cart is designed as a single-instance model per product.
// Items toggle between 'Add to cart' and 'Remove' states; quantity control is not supported.
});

test('Bonus - cart badge updates correctly when adding and removing multiple products', async ({ page }) => {

  // Arrange: login
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Act: add 3 different products
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();
  await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();

  // Assert: badge shows 3
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should show 3 items after adding 3 products'
  ).toHaveText('3');

  // Act: remove 1 product
  await page.getByTestId('remove-sauce-labs-bike-light').click();

  // Assert: badge shows 2
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should show 2 items after removing one product'
  ).toHaveText('2');
});

test('Sorting - price low to high changes product order', async ({ page }) => {

  // Arrange: login
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

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
    'First product should change after sorting low to high'
  ).not.toBe(firstProductAfter);
});

test('Cart persistence after page refresh', async ({ page }) => {

  // Arrange: login
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Act: add product to cart
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  // Assert: cart shows 1 item
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Act: refresh page
  await page.reload();

  // Assert: cart still shows 1 item after refresh
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart should persist after page refresh'
  ).toHaveText('1');
});
});

