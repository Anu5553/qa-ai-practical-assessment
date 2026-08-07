const { test, expect } = require("@playwright/test");
const authApi = require("../../API/pageobjects/authApi");
const invoiceApi = require("../../API/pageobjects/invoiceApi");

/**
 * API Regression skeleton — implementations in Step 9.
 * Traceability: TC-API-07..08
 */
test.describe("Toolshop API Regression", () => {
  test.skip("TC-API-07 Login with invalid credentials returns error @Regression", async () => {
    expect(authApi.loginEndpoint).toBeTruthy();
  });

  test.skip("TC-API-08 Invoice without token or invalid cart returns error @Regression", async () => {
    expect(invoiceApi.invoiceEndpoint).toBeTruthy();
  });
});
