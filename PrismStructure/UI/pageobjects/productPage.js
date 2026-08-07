class productPage {
  constructor(page) {
    this.page = page;
    this.productName = page.locator('[data-test="product-name"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.quantityInput = page.locator('[data-test="quantity"]');
    this.increaseQuantity = page.locator('[data-test="increase-quantity"]');
    this.unitPrice = page.locator('[data-test="unit-price"]');
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');
  }

  async waitForLoaded() {
    await this.addToCartButton.waitFor({ state: "visible", timeout: 20000 });
  }

  async increaseQty() {
    await this.increaseQuantity.click();
  }

  async addToCart() {
    const cartResponse = this.page.waitForResponse(
      (response) =>
        response.url().includes("/carts") &&
        response.request().method() !== "GET" &&
        response.status() < 400,
      { timeout: 20000 }
    );
    await this.addToCartButton.click();
    await cartResponse;
    await this.page.getByText(/product added to shopping cart/i).waitFor({
      state: "visible",
      timeout: 15000,
    });
    await this.cartQuantity.waitFor({ state: "visible", timeout: 15000 });
  }
}

module.exports = { productPage };
