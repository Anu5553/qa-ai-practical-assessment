class homePage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('[data-test="product-name"], .card, a[href*="product"]');
    this.searchInput = page.locator('[data-test="search-query"], input[type="search"], input[placeholder*="Search"]').first();
  }

  async goto() {
    await this.page.goto("/");
  }

  async openFirstProduct() {
    // Implemented in Step 6
    await this.productCards.first().click();
  }
}

module.exports = { homePage };
