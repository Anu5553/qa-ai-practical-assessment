const { test, expect } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
const { buildUniqueUser } = require("../../UI/utilities/testDataFactory");

/**
 * UI Regression — Manual traceability: TC-M-06..08 → TC-UI-06..08
 */
test.describe("Toolshop UI Regression", () => {
  let poManager;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
  });

  test("TC-UI-06 Invalid login shows error @Regression", async ({ page }) => {
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.loginExpectingError("invalid.user@example.com", "WrongPass123!");
    await expect(loginPage.loginError).toBeVisible();
    await expect(loginPage.loginError).toContainText(/invalid email or password/i);
    await expect(loginPage.navSignIn).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test("TC-UI-07 Empty cart cannot complete checkout @Regression", async ({ page }) => {
    const user = buildUniqueUser();
    await poManager.getRegisterPage().goto();
    await poManager.getRegisterPage().register(user);
    await poManager.getLoginPage().goto();
    await poManager.getLoginPage().login(user.email, user.password);
    await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();

    const cartPage = poManager.getCartPage();
    await cartPage.openCheckoutPage();
    await expect(page).toHaveURL(/checkout/);

    // Empty cart blocks checkout completion: no cart badge, no proceed, no payment confirm
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveCount(0);
    await expect(cartPage.proceedStep1).toBeHidden({ timeout: 15000 });
    await expect(page.locator('[data-test="finish"]')).toBeHidden();
    await expect(page.getByText(/payment was successful|thanks for your order|invoice number/i)).toHaveCount(0);
  });

  test("TC-UI-08 Profile reflects registered user @Regression", async ({ page }) => {
    const user = buildUniqueUser();
    await poManager.getRegisterPage().goto();
    await poManager.getRegisterPage().register(user);
    await poManager.getLoginPage().goto();
    await poManager.getLoginPage().login(user.email, user.password);

    const accountPage = poManager.getAccountPage();
    await accountPage.openProfile();
    await accountPage.waitForProfileLoaded();

    await expect(accountPage.firstNameInput).toHaveValue(user.firstName);
    await expect(accountPage.lastNameInput).toHaveValue(user.lastName);
    await expect(accountPage.emailInput).toHaveValue(user.email);
  });
});
