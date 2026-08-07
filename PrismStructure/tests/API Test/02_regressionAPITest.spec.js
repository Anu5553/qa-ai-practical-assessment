const { test, expect } = require("@playwright/test");
const { commonMethods } = require("../../API/utilities/apiHelper");
const { createRegistrationUser, buildInvoicePayload } = require("../../API/utilities/createDynamicData");
const authApi = require("../../API/pageobjects/authApi");
const invoiceApi = require("../../API/pageobjects/invoiceApi");
const statusCodes = require("../../API/testdata/commonAPIResponse.json");

/**
 * API Regression — Traceability: TC-API-07..08
 */
test.describe("Toolshop API Regression", () => {
  const api = new commonMethods();

  test("TC-API-07 Login with invalid credentials returns error @Regression", async () => {
    const response = await api.PostResponse(
      authApi.loginEndpoint,
      { email: "invalid.user@example.com", password: "WrongPass123!" },
      authApi.headers
    );
    expect(response.status()).toBe(statusCodes.unauthorizedStatus);
    const body = await response.json();
    expect(body.error || body.message).toMatch(/unauthorized/i);
  });

  test("TC-API-08 Invoice without token or invalid cart returns error @Regression", async () => {
    const invoicePayload = buildInvoicePayload("01invalidcartid000000000000");

    // Without bearer token
    const noTokenResponse = await api.PostResponse(
      invoiceApi.invoiceEndpoint,
      invoicePayload,
      invoiceApi.headers
    );
    expect(noTokenResponse.status()).toBe(statusCodes.unauthorizedStatus);
    const noTokenBody = await noTokenResponse.json();
    expect(noTokenBody.message || noTokenBody.error).toMatch(/unauthorized/i);

    // With token but invalid cart_id
    const user = createRegistrationUser();
    const registerResponse = await api.PostResponse(
      authApi.registerEndpoint,
      user,
      authApi.headers
    );
    expect(registerResponse.status()).toBe(statusCodes.createdStatus);

    const loginResponse = await api.PostResponse(
      authApi.loginEndpoint,
      { email: user.email, password: user.password },
      authApi.headers
    );
    expect(loginResponse.status()).toBe(statusCodes.okStatus);
    const { access_token } = await loginResponse.json();

    const badCartResponse = await api.PostResponse(
      invoiceApi.invoiceEndpoint,
      invoicePayload,
      {
        ...invoiceApi.headers,
        Authorization: `Bearer ${access_token}`,
      }
    );
    expect(badCartResponse.status()).toBe(statusCodes.notFoundStatus);
    const badCartBody = await badCartResponse.json();
    expect(badCartBody.message).toMatch(/not found/i);
  });
});
