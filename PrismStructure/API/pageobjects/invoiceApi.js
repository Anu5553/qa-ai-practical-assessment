const invoiceApi = {
  invoiceEndpoint: "/invoices",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // Static COD billing fields from assignment; cart_id injected at runtime
  cashOnDeliveryBody: {
    billing_street: "Zoey Shore",
    billing_city: "Hesselbury",
    billing_state: "Florida",
    billing_country: "TG",
    billing_postal_code: "1234AA",
    payment_method: "cash-on-delivery",
    payment_details: {},
  },
};

module.exports = invoiceApi;
