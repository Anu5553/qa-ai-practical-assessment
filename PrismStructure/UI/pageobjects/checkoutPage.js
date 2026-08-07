class checkoutPage {
  constructor(page) {
    this.page = page;
    this.paymentMethod = page.locator('[data-test="payment-method"]');
    this.confirmButton = page.locator('[data-test="finish"]');
    this.countrySelect = page.locator('[data-test="country"]');
    this.postalCodeInput = page.locator('[data-test="postal_code"]');
    this.houseNumberInput = page.locator('[data-test="house_number"]');
    this.streetInput = page.locator('[data-test="street"]');
    this.cityInput = page.locator('[data-test="city"]');
    this.stateInput = page.locator('[data-test="state"]');
    this.proceedStep3 = page.locator('[data-test="proceed-3"]');
    this.paymentSuccess = page.getByText(/payment was successful/i);
    this.orderThanks = page.getByText(/thanks for your order/i);
  }

  async ensureBillingAddress(user) {
    await this.postalCodeInput.waitFor({ state: "visible", timeout: 15000 });
    await this.countrySelect.selectOption({ label: user.country });
    await this.postalCodeInput.fill(user.postalCode);
    await this.houseNumberInput.fill(user.houseNumber);
    await this.page.waitForTimeout(2000);
    if (!(await this.streetInput.inputValue())) {
      await this.streetInput.fill(user.street);
    }
    if (!(await this.cityInput.inputValue())) {
      await this.cityInput.fill(user.city);
    }
    if (!(await this.stateInput.inputValue())) {
      await this.stateInput.fill(user.state);
    }
    await this.page.waitForFunction(
      () => {
        const button = document.querySelector('[data-test="proceed-3"]');
        return button && !button.disabled;
      },
      null,
      { timeout: 20000 }
    );
    await this.proceedStep3.click();
  }

  async selectCashOnDelivery() {
    await this.paymentMethod.waitFor({ state: "visible", timeout: 15000 });
    await this.paymentMethod.selectOption("cash-on-delivery");
    await this.page.waitForTimeout(500);
  }

  async confirmInvoiceTwice() {
    // Assignment rule: confirm twice — 1) payment success, 2) invoice creation
    await this.confirmButton.waitFor({ state: "visible", timeout: 15000 });
    await this.confirmButton.click();
    await this.paymentSuccess.waitFor({ state: "visible", timeout: 20000 });
    await this.confirmButton.click();
    await this.orderThanks.waitFor({ state: "visible", timeout: 20000 });
  }
}

module.exports = { checkoutPage };
