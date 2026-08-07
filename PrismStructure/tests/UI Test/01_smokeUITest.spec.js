const { test, expect } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
const { buildUniqueUser } = require("../../UI/utilities/testDataFactory");

/**
 * UI Smoke — Manual traceability: TC-M-01..04 → TC-UI-01..05
 * Serial so shared checkout state stays predictable on the demo app.
 */
test.describe.configure({ mode: "serial" });

test.describe("Toolshop UI Smoke", () => {
  /** @type {import('../../UI/pageobjects/POManager').POManager} */
  let poManager;
  let sharedUser;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
  });

  test("TC-UI-01 Register new user @Smoke", async ({ page }) => {
    sharedUser = buildUniqueUser();
    const registerPage = poManager.getRegisterPage();
    await registerPage.goto();
    await registerPage.register(sharedUser);
    await expect(page).toHaveURL(/auth\/login/);
  });

  test("TC-UI-02 Login success @Smoke", async ({ page }) => {
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.login(sharedUser.email, sharedUser.password);
    await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
    await expect(page.locator('[data-test="nav-menu"]')).toContainText(sharedUser.firstName);
  });

  test("TC-UI-03 Browse and open product @Smoke", async ({ page }) => {
    const homePage = poManager.getHomePage();
    const productPage = poManager.getProductPage();
    await homePage.openNthInStockProduct(1);
    await productPage.waitForLoaded();
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(page).toHaveURL(/product\//);
  });

  test("TC-UI-04 Add to cart and update quantity @Smoke", async ({ page }) => {
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.login(sharedUser.email, sharedUser.password);

    const homePage = poManager.getHomePage();
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage();

    await homePage.openNthInStockProduct(1);
    await productPage.waitForLoaded();
    await productPage.increaseQty();
    await productPage.addToCart();

    await homePage.openNthInStockProduct(2);
    await productPage.waitForLoaded();
    await productPage.addToCart();

    await cartPage.openCart();
    await cartPage.updateFirstLineQuantity(2);
    await expect(cartPage.proceedStep1).toBeVisible();
    await expect(page.locator("table tbody tr").first()).toBeVisible();
  });

  test("TC-UI-05 COD checkout double confirm invoice @Smoke", async ({ page }) => {
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.login(sharedUser.email, sharedUser.password);

    const homePage = poManager.getHomePage();
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const accountPage = poManager.getAccountPage();

    await homePage.openNthInStockProduct(1);
    await productPage.waitForLoaded();
    await productPage.increaseQty();
    await productPage.addToCart();
    await homePage.openNthInStockProduct(2);
    await productPage.waitForLoaded();
    await productPage.addToCart();

    await cartPage.openCart();
    await cartPage.updateFirstLineQuantity(2);
    await cartPage.proceedFromCart();
    await cartPage.proceedFromSignInStep();
    await checkoutPage.ensureBillingAddress(sharedUser);
    await checkoutPage.selectCashOnDelivery();
    await checkoutPage.confirmInvoiceTwice();

    await accountPage.openMyInvoices();
    await accountPage.expectAtLeastOneInvoice();
    await expect(page.locator("table tbody tr").first()).toBeVisible();
  });
});
