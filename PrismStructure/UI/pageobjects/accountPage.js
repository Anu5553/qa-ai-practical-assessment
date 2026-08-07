class accountPage {
  constructor(page) {
    this.page = page;
    this.profileNav = page.locator('[data-test="nav-menu"], [data-test="nav-my-account"], a[href*="account"]').first();
    this.invoicesNav = page.locator('[data-test="nav-my-invoices"], a[href*="invoices"]').first();
  }

  async openProfile() {
    // Implemented in Step 7
    await this.profileNav.click();
  }

  async openMyInvoices() {
    // Implemented in Step 6
    await this.invoicesNav.click();
  }
}

module.exports = { accountPage };
