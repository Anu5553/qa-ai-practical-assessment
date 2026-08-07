const cartApi = {
  createCartEndpoint: "/carts",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  cartById: (cartId) => `/carts/${cartId}`,
};

module.exports = cartApi;
