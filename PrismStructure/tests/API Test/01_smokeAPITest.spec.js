const { test, expect } = require("@playwright/test");
const { commonMethods } = require("../../API/utilities/apiHelper");
const { createRegistrationUser, buildInvoicePayload } = require("../../API/utilities/createDynamicData");
const authApi = require("../../API/pageobjects/authApi");
const cartApi = require("../../API/pageobjects/cartApi");
const productsApi = require("../../API/pageobjects/productsApi");
const invoiceApi = require("../../API/pageobjects/invoiceApi");
const statusCodes = require("../../API/testdata/commonAPIResponse.json");

/**
 * API Smoke — Traceability: API AC1/AC2 → TC-API-01..06
 */
test.describe.configure({ mode: "serial" });

test.describe("Toolshop API Smoke", () => {
  const api = new commonMethods();
  const state = {
    user: null,
    token: null,
    cartId: null,
    productId: null,
    quantity: 2,
  };

  function authHeaders() {
    return {
      ...authApi.headers,
      Authorization: `Bearer ${state.token}`,
    };
  }

  test("TC-API-01 Register user via API @Smoke", async () => {
    state.user = createRegistrationUser();
    const response = await api.PostResponse(
      authApi.registerEndpoint,
      state.user,
      authApi.headers
    );
    expect(response.status()).toBe(statusCodes.createdStatus);
    const body = await response.json();
    expect(body.email).toBe(state.user.email);
    expect(body.id).toBeTruthy();
  });

  test("TC-API-02 Login obtain bearer token @Smoke", async () => {
    const response = await api.PostResponse(
      authApi.loginEndpoint,
      { email: state.user.email, password: state.user.password },
      authApi.headers
    );
    expect(response.status()).toBe(statusCodes.okStatus);
    const body = await response.json();
    expect(body.access_token).toBeTruthy();
    state.token = body.access_token;
  });

  test("TC-API-03 Create cart @Smoke", async () => {
    const response = await api.PostResponse(cartApi.createCartEndpoint, {}, authHeaders());
    expect(response.status()).toBe(statusCodes.createdStatus);
    const body = await response.json();
    expect(body.id).toBeTruthy();
    state.cartId = body.id;
  });

  test("TC-API-04 Get products and add to cart @Smoke", async () => {
    const productsResponse = await api.GetResponse(
      productsApi.productsEndpoint,
      productsApi.headers
    );
    expect(productsResponse.status()).toBe(statusCodes.okStatus);
    const productsBody = await productsResponse.json();
    const product = (productsBody.data || []).find((item) => item.in_stock);
    expect(product).toBeTruthy();
    state.productId = product.id;

    const addResponse = await api.PostResponse(
      cartApi.cartById(state.cartId),
      { product_id: state.productId, quantity: state.quantity },
      authHeaders()
    );
    expect(addResponse.status()).toBe(statusCodes.okStatus);
    const addBody = await addResponse.json();
    expect(addBody.result).toMatch(/item added or updated/i);
  });

  test("TC-API-05 Verify cart contents @Smoke", async () => {
    const response = await api.GetResponse(cartApi.cartById(state.cartId), authHeaders());
    expect(response.status()).toBe(statusCodes.okStatus);
    const body = await response.json();
    expect(body.id).toBe(state.cartId);
    expect(body.cart_items.length).toBeGreaterThan(0);
    const line = body.cart_items.find((item) => item.product_id === state.productId);
    expect(line).toBeTruthy();
    expect(line.quantity).toBe(state.quantity);
  });

  test("TC-API-06 Generate COD invoice @Smoke", async () => {
    const paymentResponse = await api.PostResponse(
      invoiceApi.paymentCheckEndpoint,
      { payment_method: "cash-on-delivery", payment_details: {} },
      authHeaders()
    );
    expect(paymentResponse.status()).toBe(statusCodes.okStatus);
    const paymentBody = await paymentResponse.json();
    expect(paymentBody.message).toMatch(/payment was successful/i);

    const invoicePayload = buildInvoicePayload(state.cartId);
    const invoiceResponse = await api.PostResponse(
      invoiceApi.invoiceEndpoint,
      invoicePayload,
      authHeaders()
    );
    expect(invoiceResponse.status()).toBe(statusCodes.createdStatus);
    const invoiceBody = await invoiceResponse.json();
    expect(invoiceBody.invoice_number).toBeTruthy();
    expect(invoiceBody.payment_method || invoicePayload.payment_method).toBeTruthy();
    expect(invoiceBody.billing_postal_code).toBe(invoicePayload.billing_postal_code);
  });
});
