const { test, expect } = require("@playwright/test");
const { commonMethods } = require("../../API/utilities/apiHelper");
const authApi = require("../../API/pageobjects/authApi");
const cartApi = require("../../API/pageobjects/cartApi");
const productsApi = require("../../API/pageobjects/productsApi");
const invoiceApi = require("../../API/pageobjects/invoiceApi");

/**
 * API Smoke skeleton — implementations in Step 8.
 * Traceability: API AC1/AC2 → TC-API-01..06
 */
test.describe("Toolshop API Smoke", () => {
  test.skip("TC-API-01 Register user via API @Smoke", async () => {
    const api = new commonMethods();
    expect(authApi.registerEndpoint).toBeTruthy();
    expect(api).toBeTruthy();
  });

  test.skip("TC-API-02 Login obtain bearer token @Smoke", async () => {
    expect(authApi.loginEndpoint).toBeTruthy();
  });

  test.skip("TC-API-03 Create cart @Smoke", async () => {
    expect(cartApi.createCartEndpoint).toBeTruthy();
  });

  test.skip("TC-API-04 Get products and add to cart @Smoke", async () => {
    expect(productsApi.productsEndpoint).toBeTruthy();
  });

  test.skip("TC-API-05 Verify cart contents @Smoke", async () => {
    expect(cartApi.createCartEndpoint).toBeTruthy();
  });

  test.skip("TC-API-06 Generate COD invoice @Smoke", async () => {
    expect(invoiceApi.cashOnDeliveryBody.payment_method).toBe("cash-on-delivery");
  });
});
