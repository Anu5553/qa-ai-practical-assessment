// @ts-check
const { defineConfig } = require("@playwright/test");
require("dotenv").config();

module.exports = defineConfig({
  testDir: "./tests",
  retries: 0,
  workers: 2,
  timeout: 120 * 1000,
  expect: {
    timeout: 30000,
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "execution-reports/html-report", open: "never" }],
  ],
  outputDir: "execution-reports/test-output",
  use: {
    baseURL: process.env.UI_BASE_URL || "https://practicesoftwaretesting.com",
    browserName: "chromium",
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    ignoreHTTPSErrors: true,
    viewport: { width: 1400, height: 900 },
  },
  projects: [
    {
      name: "ui-chromium",
      testMatch: "**/UI Test/**/*.spec.js",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "api",
      testMatch: "**/API Test/**/*.spec.js",
      use: {
        baseURL: process.env.API_BASE_URL || "https://api.practicesoftwaretesting.com",
      },
    },
  ],
});
