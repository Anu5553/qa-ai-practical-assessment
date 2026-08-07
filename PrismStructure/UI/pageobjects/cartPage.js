class cartPage {
  constructor(page) {
    this.page = page;
    this.cartNav = page.locator('[data-test="nav-cart"]');
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');
    this.quantityInputs = page.locator('input[type="number"]');
    this.proceedStep1 = page.locator('[data-test="proceed-1"]');
    this.proceedStep2 = page.locator('[data-test="proceed-2"]');
    this.proceedStep3 = page.locator('[data-test="proceed-3"]');
    this.productRows = page.locator("table tbody tr");
  }

  async openCart() {
    await this.cartNav.click();
    await this.page.waitForURL("**/checkout**", { timeout: 15000 });
    await this.proceedStep1.waitFor({ state: "visible", timeout: 20000 });
  }

  async updateFirstLineQuantity(qty) {
    const input = this.quantityInputs.first();
    await input.waitFor({ state: "visible", timeout: 10000 });
    await input.fill(String(qty));
    await this.page.waitForTimeout(1000);
  }

  async proceedFromCart() {
    await this.proceedStep1.click();
  }

  async proceedFromSignInStep() {
    await this.proceedStep2.waitFor({ state: "visible", timeout: 15000 });
    await this.proceedStep2.click();
  }

  async proceedFromBillingStep() {
    await this.proceedStep3.waitFor({ state: "visible", timeout: 15000 });
    await this.proceedStep3.click();
  }
}

module.exports = { cartPage };
