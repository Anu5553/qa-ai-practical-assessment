class homePage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('a[data-test^="product-"]');
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchSubmit = page.locator('[data-test="search-submit"]');
    this.productName = page.locator('[data-test="product-name"]');
  }

  async goto() {
    await this.page.goto("/");
    await this.productCards.first().waitFor({ state: "visible", timeout: 20000 });
  }

  async openNthInStockProduct(index = 1) {
    await this.goto();
    let seen = 0;
    const count = await this.productCards.count();
    for (let i = 0; i < count; i++) {
      const card = this.productCards.nth(i);
      const outOfStock = await card.locator('[data-test="out-of-stock"]').count();
      if (outOfStock === 0) {
        seen += 1;
        if (seen === index) {
          await card.click();
          return;
        }
      }
    }
    throw new Error(`Could not find in-stock product at index ${index}`);
  }

  async search(term) {
    await this.searchInput.fill(term);
    await this.searchSubmit.click();
  }
}

module.exports = { homePage };
