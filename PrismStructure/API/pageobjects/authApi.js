const authApi = {
  registerEndpoint: "/users/register",
  loginEndpoint: "/users/login",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

module.exports = authApi;
