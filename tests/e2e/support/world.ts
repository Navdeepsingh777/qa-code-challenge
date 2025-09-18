import { setWorldConstructor, World } from "@cucumber/cucumber";
import { chromium, firefox, webkit } from "@playwright/test";
import type { Browser, BrowserContext, Page, Video } from "@playwright/test";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  video?: Video;
  parameters: any;

  constructor(options: any) {
    super(options);
    this.parameters = options.parameters || {}; // 👈 gets --world-parameters
  }

  async init() {
    const browserName = this.parameters.browser || "chromium";

    if (browserName === "firefox") {
      this.browser = await firefox.launch({
        headless: false,
        slowMo: 300,
      });
    } else if (browserName === "webkit") {
      this.browser = await webkit.launch({
        headless: false,
        slowMo: 300,
      });
    } else if (browserName === "chrome") {
      this.browser = await chromium.launch({
        channel: "chrome", // 👈 real Chrome, not just Chromium
        headless: false,
        slowMo: 300,
      });
    } else {
      this.browser = await chromium.launch({
        headless: false,
        slowMo: 300,
      });
    }

    this.context = await this.browser.newContext({
      recordVideo: { dir: "tests/reports/videos" },
    });

    this.page = await this.context.newPage();

    const video = this.page.video();
    if (video) {
      this.video = video;
    }
  }

  async cleanup() {
    if (this.page) {
      await this.page.close();

      if (this.video) {
        const videoPath = await this.video.path();
        console.log("🎥 Video saved to:", videoPath);
      }
    }

    if (this.context) {
      await this.context.close();
    }

    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
