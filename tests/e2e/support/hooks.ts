import { After, Before, Status } from "@cucumber/cucumber";
import * as fs from "fs";
import * as path from "path";
import { CustomWorld } from "./world.ts";

Before(async function (this: CustomWorld) {
  await this.init(); // 🚀 launch browser/context/page before each scenario
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    // 📸 take screenshot
    const screenshotPath = path.join(
      "tests",
      "reports",
      "screenshots",
      `FAIL_${Date.now()}.png`
    );
    await this.page.screenshot({ path: screenshotPath, fullPage: true });

    // attach screenshot into cucumber JSON
    const imageBuffer = fs.readFileSync(screenshotPath);
    this.attach(imageBuffer, "image/png");
  }

  // 🎥 attach video if available
  if (this.video) {
    const videoPath = await this.video.path();
    if (fs.existsSync(videoPath)) {
      const videoBuffer = fs.readFileSync(videoPath);
      this.attach(videoBuffer, "video/webm");
    }
  }

  // cleanup browser
  await this.cleanup();
});
