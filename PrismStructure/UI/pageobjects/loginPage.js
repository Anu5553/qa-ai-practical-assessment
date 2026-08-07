class loginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[data-test="email"], input[id="email"], input[type="email"]').first();
    this.passwordInput = page.locator('[data-test="password"], input[id="password"], input[type="password"]').first();
    this.loginButton = page.locator('[data-test="login-submit"], input[type="submit"], button[type="submit"]').first();
  }

  async goto() {
    await this.page.goto("/auth/login");
  }

  async login(email, password) {
    // Implemented in Step 6
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { loginPage };
