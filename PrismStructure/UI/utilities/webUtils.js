class webUtils {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(path = "/") {
    await this.page.goto(path);
  }

  async waitForVisible(locator, timeout = 30000) {
    await locator.waitFor({ state: "visible", timeout });
  }
}

module.exports = { webUtils };
