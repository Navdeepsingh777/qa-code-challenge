import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

// Use this.page (provided by world.ts), no need to import world directly
Then("the page should match the baseline {string}", async function (name: string) {
  await expect(this.page).toHaveScreenshot(`${name}.png`, {
    fullPage: true,
    maxDiffPixels: 100, // allow small pixel differences
  });
});
