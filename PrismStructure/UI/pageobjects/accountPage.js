class accountPage {
  constructor(page) {
    this.page = page;
    this.navMenu = page.locator('[data-test="nav-menu"]');
    this.profileNav = page.locator('[data-test="nav-my-profile"]');
    this.invoicesNav = page.locator('[data-test="nav-my-invoices"]');
    this.invoiceRows = page.locator("table tbody tr");
    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.emailInput = page.locator('[data-test="email"]');
  }

  async openProfile() {
    await this.navMenu.click();
    await this.profileNav.click();
    await this.page.waitForURL("**/profile**", { timeout: 15000 });
    await this.firstNameInput.waitFor({ state: "visible", timeout: 15000 });
  }

  async openMyInvoices() {
    await this.navMenu.click();
    await this.invoicesNav.click();
    await this.page.waitForURL("**/invoices**", { timeout: 15000 });
  }

  async expectAtLeastOneInvoice() {
    await this.invoiceRows.first().waitFor({ state: "visible", timeout: 20000 });
  }

  async waitForProfileLoaded() {
    await this.page.waitForFunction(
      () => {
        const email = document.querySelector('[data-test="email"]');
        return email && email.value && email.value.length > 0;
      },
      null,
      { timeout: 20000 }
    );
  }
}

module.exports = { accountPage };
