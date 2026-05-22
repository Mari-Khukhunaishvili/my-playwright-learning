import { test, expect } from "@playwright/test";

test.only("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});

// Root cause: placeholder text was incorrect. The test used "User Name" but the actual placeholder is "Username".
// Fix: changed to getByPlaceholder("Username").
// How I verified: ran npx playwright test tests/broken-tests.spec.ts --project=chromium and confirmed the test passes.

test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByTestId("error")).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

// Root cause: the expected error message text did not match the actual text displayed by the application.
// Fix: updated the expected text to "Epic sadface: Username and password do not match any user in this service".
// How I verified: ran npx playwright test tests/broken-tests.spec.ts --project=chromium and confirmed the test passes.

test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click(); 

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

// Root cause: missing await before click() on the "add to cart" button, causing the action not to be properly awaited.
// Fix: added await before page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click().
// How I verified: ran npx playwright test tests/broken-tests.spec.ts --project=chromium and confirmed the test passes.



// to check all tests pass reliably:
// npx playwright test tests/broken-tests.spec.ts --project=chromium --repeat-each=10
// npx playwright test --repeat-each=5