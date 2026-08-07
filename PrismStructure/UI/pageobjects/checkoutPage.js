class checkoutPage {
  constructor(page) {
    this.page = page;
    this.cashOnDeliveryOption = page.locator('[data-test="payment-method-cash-on-delivery"], text=Cash on Delivery').first();
    this.confirmButton = page.locator('[data-test="finish"], button:has-text("Confirm"), button:has-text("Confirm")').first();
  }

  async selectCashOnDelivery() {
    // Implemented in Step 6/7
    await this.cashOnDeliveryOption.click();
  }

  async confirmInvoiceTwice() {
    // Assignment rule: press confirm twice to generate invoice
    await this.confirmButton.click();
    await this.confirmButton.click();
  }
}

module.exports = { checkoutPage };
