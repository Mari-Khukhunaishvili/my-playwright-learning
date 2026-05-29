# Final Project Plan — SauceDemo (Track A)

## Target Application
SauceDemo: https://www.saucedemo.com

This project contains end-to-end automated tests using Playwright for the SauceDemo application. The tests cover authentication, cart functionality, and checkout flow.

---

## Test Cases

### 1. Valid User Login
- User navigates to the login page
- User enters valid credentials:
  - Username: `standard_user`
  - Password: `secret_sauce`
- User clicks the login button
- Expected result: User is successfully redirected to the inventory page

---

### 2. Locked-Out User Login (Negative Case)
- User navigates to the login page
- User enters credentials:
  - Username: `locked_out_user`
  - Password: `secret_sauce`
- User clicks the login button
- Expected result:
  - Login is rejected
  - Error message is displayed:
    "Epic sadface: Sorry, this user has been locked out."

---

### 3. Empty Login Form Validation
- User navigates to the login page
- User clicks the login button without entering any credentials
- Expected result:
  - Error message is displayed indicating missing username and password

---

### 4. Add Two Products to Cart
- User logs in with valid credentials
- User adds two different products to the cart
- Expected result:
  - Cart badge displays count `2`
  - Selected products are added successfully

---

### 5. Remove One Product from Cart
- User logs in with valid credentials
- User adds two products to the cart
- User removes one product from the cart
- Expected result:
  - Cart badge updates to `1`
  - Removed product is no longer in the cart

---

### 6. Complete Checkout Flow (End-to-End)
- User logs in with valid credentials
- User adds products to the cart
- User navigates to the cart page
- User clicks "Checkout"
- User fills in checkout information:
  - First Name
  - Last Name
  - Zip Code
- User completes the purchase
- Expected result:
  - Order is completed successfully
  - Success message is displayed:
    "Thank you for your order!"

---

### 7. Product Sorting Validation
- User logs in with valid credentials
- User opens the product sorting dropdown
- User selects "Price (low to high)"
- Expected result:
  - Product order changes accordingly
  - Products are sorted from lowest to highest price