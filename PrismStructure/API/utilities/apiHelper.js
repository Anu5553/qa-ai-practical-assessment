const { request } = require("@playwright/test");

class commonMethods {
  constructor() {}

  async getContext() {
    return request.newContext({
      baseURL: process.env.API_BASE_URL || "https://api.practicesoftwaretesting.com",
    });
  }

  GetResponse = async (endPoint, headers = {}) => {
    const context = await this.getContext();
    return context.get(endPoint, { headers });
  };

  PostResponse = async (endPoint, payload, headers = {}) => {
    const context = await this.getContext();
    return context.post(endPoint, { headers, data: payload });
  };

  PutResponse = async (endPoint, payload, headers = {}) => {
    const context = await this.getContext();
    return context.put(endPoint, { headers, data: payload });
  };

  DeleteResponse = async (endPoint, headers = {}, payload) => {
    const context = await this.getContext();
    return context.delete(endPoint, { headers, data: payload });
  };
}

module.exports = { commonMethods };
