class loginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
    this.loginError = page.locator('[data-test="login-error"]');
    this.navMenu = page.locator('[data-test="nav-menu"]');
    this.navSignIn = page.locator('[data-test="nav-sign-in"]');
  }

  async goto() {
    await this.page.goto("/auth/login");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.navMenu.waitFor({ state: "visible", timeout: 20000 });
  }

  async loginExpectingError(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.loginError.waitFor({ state: "visible", timeout: 15000 });
  }
}

module.exports = { loginPage };
