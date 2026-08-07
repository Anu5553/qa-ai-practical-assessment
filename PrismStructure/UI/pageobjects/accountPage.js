class accountPage {
  constructor(page) {
    this.page = page;
    this.navMenu = page.locator('[data-test="nav-menu"]');
    this.profileNav = page.locator('[data-test="nav-my-profile"]');
    this.invoicesNav = page.locator('[data-test="nav-my-invoices"]');
    this.invoiceRows = page.locator("table tbody tr");
  }

  async openProfile() {
    await this.navMenu.click();
    await this.profileNav.click();
  }

  async openMyInvoices() {
    await this.navMenu.click();
    await this.invoicesNav.click();
    await this.page.waitForURL("**/invoices**", { timeout: 15000 });
  }

  async expectAtLeastOneInvoice() {
    await this.invoiceRows.first().waitFor({ state: "visible", timeout: 20000 });
  }
}

module.exports = { accountPage };
