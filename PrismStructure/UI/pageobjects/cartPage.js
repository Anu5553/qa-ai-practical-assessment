class cartPage {
  constructor(page) {
    this.page = page;
    this.cartNav = page.locator('[data-test="nav-cart"], a[href*="cart"]').first();
    this.quantityInput = page.locator('[data-test="product-quantity"], input[type="number"]').first();
    this.proceedButton = page.locator('[data-test="proceed-1"], [data-test="proceed-2"], button:has-text("Proceed")').first();
  }

  async openCart() {
    await this.cartNav.click();
  }

  async updateQuantity(qty) {
    // Implemented in Step 6
    await this.quantityInput.fill(String(qty));
  }

  async proceedToCheckout() {
    // Implemented in Step 6
    await this.proceedButton.click();
  }
}

module.exports = { cartPage };
