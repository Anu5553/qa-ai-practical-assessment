class productPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    this.quantityInput = page.locator('[data-test="quantity"], input[type="number"]').first();
  }

  async addToCart() {
    // Implemented in Step 6
    await this.addToCartButton.click();
  }

  async setQuantity(qty) {
    // Implemented in Step 6
    await this.quantityInput.fill(String(qty));
  }
}

module.exports = { productPage };
