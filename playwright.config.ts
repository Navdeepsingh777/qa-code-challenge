import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30 * 1000,         // 30s per test
  retries: 1,                 // retry once for flaky
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    // ⚡ Better trace policy for demo/CI
    // "retain-on-failure" = keep for every failure (can fill disk)
    // "on-first-retry" = collect trace only when retry is triggered
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "WebKit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  reporter: [
    ["list"],                // console-friendly output
    ["allure-playwright"],   // keep Allure integration
  ],
});
