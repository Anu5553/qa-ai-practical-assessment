function createRegistrationUser() {
  const timestamp = Date.now();
  return {
    first_name: "Qa",
    last_name: "Api",
    email: `qa.toolshop.api.${timestamp}@example.com`,
    password: "Welcome@12345X",
    dob: "1990-01-15",
    phone: "5551234567",
    address: {
      street: "Verhoevenstraat",
      city: "Castelre",
      state: "Groningen",
      country: "NL",
      postal_code: "1111AA",
    },
  };
}

function buildInvoicePayload(cartId) {
  return {
    billing_street: "Verhoevenstraat",
    billing_city: "Castelre",
    billing_state: "Groningen",
    billing_country: "NL",
    billing_postal_code: "1111AA",
    payment_method: "cash-on-delivery",
    cart_id: cartId,
    payment_details: {},
  };
}

module.exports = { createRegistrationUser, buildInvoicePayload };
