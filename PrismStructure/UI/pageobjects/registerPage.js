class registerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="first-name"], #first_name, input[name="first_name"]').first();
    this.lastNameInput = page.locator('[data-test="last-name"], #last_name, input[name="last_name"]').first();
    this.emailInput = page.locator('[data-test="email"], #email, input[type="email"]').first();
    this.passwordInput = page.locator('[data-test="password"], #password, input[type="password"]').first();
    this.registerButton = page.locator('[data-test="register-submit"], button[type="submit"]').first();
  }

  async goto() {
    await this.page.goto("/auth/register");
  }

  async register(user) {
    // Implemented in Step 6 — fill required registration fields
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.registerButton.click();
  }
}

module.exports = { registerPage };
