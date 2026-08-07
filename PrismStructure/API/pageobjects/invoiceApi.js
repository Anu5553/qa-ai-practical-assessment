const invoiceApi = {
  invoiceEndpoint: "/invoices",
  paymentCheckEndpoint: "/payment/check",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

module.exports = invoiceApi;
