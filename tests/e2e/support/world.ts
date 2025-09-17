import { setWorldConstructor, World } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import type { Browser, BrowserContext, Page, Video } from "@playwright/test";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  video?: Video;

  constructor(options: any) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({
      headless: false,
      slowMo: 300, // 👀 slows actions so you can see
    });

    this.context = await this.browser.newContext({
      recordVideo: { dir: "tests/reports/videos" }, // 🎥 save videos
    });

    this.page = await this.context.newPage();

    // 👇 this is valid — page.video() returns a Video | null
    const video = this.page.video();
    if (video) {
      this.video = video;
    }
  }

  async cleanup() {
    if (this.page) {
      await this.page.close();

      if (this.video) {
        // wait until video is finalized
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
