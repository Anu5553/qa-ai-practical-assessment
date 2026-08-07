const { loginPage } = require("./loginPage");
const { registerPage } = require("./registerPage");
const { homePage } = require("./homePage");
const { productPage } = require("./productPage");
const { cartPage } = require("./cartPage");
const { checkoutPage } = require("./checkoutPage");
const { accountPage } = require("./accountPage");
const { webUtils } = require("../utilities/webUtils");

/** Common class to create page object references for UI tests (Prism pattern). */
class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new loginPage(this.page);
    this.registerPage = new registerPage(this.page);
    this.homePage = new homePage(this.page);
    this.productPage = new productPage(this.page);
    this.cartPage = new cartPage(this.page);
    this.checkoutPage = new checkoutPage(this.page);
    this.accountPage = new accountPage(this.page);
    this.webUtils = new webUtils(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getRegisterPage() {
    return this.registerPage;
  }

  getHomePage() {
    return this.homePage;
  }

  getProductPage() {
    return this.productPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getAccountPage() {
    return this.accountPage;
  }

  getWebUtils() {
    return this.webUtils;
  }
}

module.exports = { POManager };
